import { useState } from 'react';
import { loginUser } from '../lib/api';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = { email, password };
            const data = await loginUser(credentials);
            localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
            setMessage('Вход успешен!');
        } catch (error) {
            setMessage('Ошибка при входе: ' + error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Войти</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoginForm;