import { useState } from 'react';
import { registerUser } from '../lib/api';

const RegisterForm = () => {
    const [fio, setFio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [team, setTeam] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { fio, email, password, team };
            await registerUser(userData);
            setMessage('Регистрация прошла успешно!');
        } catch (error) {
            setMessage('Ошибка при регистрации: ' + error.message); // Используем message вместо error.response.data.error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="ФИО" value={fio} onChange={(e) => setFio(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="Название команды" value={team} onChange={(e) => setTeam(e.target.value)} required />
            <button type="submit">Зарегистрироваться</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;