function submitForm() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return false; // Останавливаем отправку формы
    }

    // Создание объекта с данными
    const data = {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    // Отправка данных на сервер
    fetch('your-server-endpoint', { // Замените 'your-server-endpoint' на URL вашего сервера
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успех:', data);
        alert('Регистрация прошла успешно!');
    })
    .catch((error) => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при регистрации.');
    });

    return false; // Останавливаем отправку формы, если вы не хотите, чтобы она перезагружала страницу
}