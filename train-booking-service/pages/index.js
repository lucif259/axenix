// pages/index.js

import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import OrderForm from '../components/OrderForm';

const HomePage = () => {
    return (
        <div>
            <h1>Сервис бронирования билетов на поезда</h1>
            <h2>Регистрация</h2>
            <RegisterForm />
            
            <h2>Вход</h2>
            <LoginForm />

            <h2>Заказ билетов</h2>
            <OrderForm />
        </div>
    );
};

export default HomePage;