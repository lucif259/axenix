function submitLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Пример простой проверки логина (замените это на вашу логику)
    if (email === '' || password === '') {
        alert('Пожалуйста, заполните все поля.'); // Проверка на пустые поля
        return;
    }

    // Отправка данных на сервер
    const data = {
        email: email,
        password: password
    };

    fetch('your-server-endpoint', { // Замените 'your-server-endpoint' на ваш URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Вход успешен!'); // Успешный вход
            // Перенаправление на главную страницу или другую страницу
            window.location.href = 'main.html';
        } else {
            alert('Ошибка входа: ' + data.message); // Сообщение об ошибке
        }
    })
    .catch((error) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при входе.');
    });
}