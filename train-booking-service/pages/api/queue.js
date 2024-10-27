import cron from 'node-cron';
import { checkAvailability } from '../../lib/api';

// Пример хранения очередей (можно использовать базу данных)
let queues = [];

const checkQueuesForAvailability = async () => {
    for (const queueItem of queues) {
        const availableTickets = await checkAvailability(queueItem.date, queueItem.direction, queueItem.wagonType, queueItem.seats);
        if (availableTickets.length > 0) {
            // Логика бронирования для пользователя из очереди
            // bookTickets() и уведомление пользователя
        }
    }
};

// Запускаем фоновую задачу каждые 5 минут
cron.schedule('*/5 * * * *', () => {
    console.log('Проверка наличия мест в очереди...');
    checkQueuesForAvailability();
});

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Добавляем пользователя в очередь
        queues.push(req.body);
        res.status(200).json({ message: 'Вы добавлены в очередь.' });
    } else {
        res.status(405).json({ message: 'Метод не поддерживается.' });
    }
}