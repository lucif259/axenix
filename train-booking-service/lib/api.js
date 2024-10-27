import axios from 'axios';

const API_URL = 'http://84.252.135.231'; // Базовый URL API
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Функция для регистрации пользователя
export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/api/auth/register', userData);
        return response.data; // Возвращаем данные при успешном ответе
    } catch (error) {
        // Проверяем наличие response перед доступом к data
        if (error.response) {
            throw new Error(error.response.data.error || 'Ошибка при регистрации');
        } else {
            throw new Error('Сетевая ошибка: ' + error.message);
        }
    }
};

// Функция для входа в систему
export const loginUser = async (credentials) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
};

// Функция для заказа билетов
export const createOrder = async (orderData, token) => {
    const response = await apiClient.post('/api/order', orderData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Функция для получения информации о поездах
export const getTrainsInfo = async (params) => {
    const response = await apiClient.get('/api/info/trains', { params });
    return response.data;
};

// Функция для получения информации о вагонах
export const getWagonsInfo = async (trainId) => {
    const response = await apiClient.get('/api/info/wagons', { params: { trainId } });
    return response.data;
};