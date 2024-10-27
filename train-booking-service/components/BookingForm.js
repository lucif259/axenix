import { useState } from 'react';
import { checkAvailability, bookTickets } from '../lib/api';

const BookingForm = () => {
    const [date, setDate] = useState('');
    const [direction, setDirection] = useState('');
    const [wagonType, setWagonType] = useState('');
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Проверка доступности билетов...');

        try {
            const availableTickets = await checkAvailability(date, direction, wagonType, seats);
            if (availableTickets.length > 0) {
                // Если есть доступные билеты, бронируем их
                const bookingResponse = await bookTickets({ date, direction, wagonType, seats });
                setMessage(`Бронирование успешно! Код: ${bookingResponse.code}`);
            } else {
                setMessage('Билеты отсутствуют. Вы можете встать в очередь.');
                // Здесь можно добавить логику для добавления в очередь
            }
        } catch (error) {
            setMessage('Ошибка при проверке доступности билетов.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" placeholder="Направление" value={direction} onChange={(e) => setDirection(e.target.value)} required />
            <select value={wagonType} onChange={(e) => setWagonType(e.target.value)} required>
                <option value="">Тип вагона</option>
                <option value="купе">Купе</option>
                <option value="плацкарт">Плацкарт</option>
            </select>
            <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} min="1" required />
            <button type="submit">Проверить наличие</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default BookingForm;      