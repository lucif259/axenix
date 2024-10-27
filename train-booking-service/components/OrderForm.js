// components/OrderForm.js
import { useState, useEffect } from 'react';
import { createOrder } from '../lib/api';
import { getTravelData } from '../lib/data'; // Импортируем функцию для получения данных

const OrderForm = () => {
    const [trainOptions, setTrainOptions] = useState([]);
    const [selectedTrainId, setSelectedTrainId] = useState('');
    const [wagonId, setWagonId] = useState('');
    const [seatIds, setSeatIds] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const data = getTravelData(); // Получаем данные о поездах
        setTrainOptions(data); // Устанавливаем их в состояние
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Поиск нужного поезда
            const selectedTrain = trainOptions.find(train => train.id === parseInt(selectedTrainId));
            if (!selectedTrain) {
                setMessage('Поезд не найден.');
                return;
            }

            // Проверка наличия мест
            if (selectedTrain.ticket_count <= 0) {
                setMessage('Нет доступных мест для бронирования.');
                return;
            }

            // Создание данных для заказа
            const orderData = {
                train_id: parseInt(selectedTrainId),
                wagon_id: parseInt(wagonId),
                seat_ids: seatIds.split(',').map(id => parseInt(id.trim())),
            };

            // Отправка заказа на сервер
            await createOrder(orderData, localStorage.getItem('token'));

            // Обновление количества доступных мест
            selectedTrain.ticket_count -= 1; // Уменьшаем количество мест на 1

            setMessage('Заказ успешно оформлен!');
        } catch (error) {
            setMessage('Ошибка при оформлении заказа: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedTrainId} onChange={(e) => setSelectedTrainId(e.target.value)} required>
                <option value="">Выберите поезд</option>
                {trainOptions.map(train => (
                    <option key={train.id} value={train.id}>
                        {train.startpoint} - {train.endpoint} ({train.wagon_type}, {train.ticket_count} мест)
                    </option>
                ))}
            </select>
            <input type="number" placeholder="ID вагона" value={wagonId} onChange={(e) => setWagonId(e.target.value)} required />
            <input type="text" placeholder="ID мест (через запятую)" value={seatIds} onChange={(e) => setSeatIds(e.target.value)} required />
            <button type="submit">Заказать билеты</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default OrderForm;