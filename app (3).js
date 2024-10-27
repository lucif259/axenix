// Получаем элементы
const loginBtn = document.getElementById('loginBtn');
const modal = document.querySelector('.modal');

// Добавляем обработчик события на кнопку "Войти"
loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    modal.style.display = 'block'; // отображаем модальное окно
});
function showAvailableTickets() {
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const date = document.getElementById('date').value;

    if (!from || !to || !date) {
        alert('Пожалуйста, заполните все поля!');
        return; 
    }

    const ticketsDiv = document.getElementById('availableTickets');
    
    ticketsDiv.innerHTML = `<h3>Доступные билеты из ${from} в ${to} на ${date}:</h3>`;
    
    // Пример данных о билетах
    const tickets = [
        { wagonType: 'Плацкарт', price: '500₽' },
        { wagonType: 'Купе', price: '1000₽' },
        { wagonType: 'СВ', price: '1500₽' }
    ];
    
    tickets.forEach(ticket => {
        ticketsDiv.innerHTML += `<p>${ticket.wagonType}: ${ticket.price}</p>`;
    });

    showWagonMap();
}

function showWagonMap() {
    const wagonMapDiv = document.getElementById('wagonMap');
    
   // Пример схемы вагона
   wagonMapDiv.innerHTML = `
       <div class='wagon-map'>
           ${Array.from({ length: 20 }, (_, i) => `<div class='seat'>${i + 1}</div>`).join('')}
       </div>`;
}
function filterCities() {
    var input = document.getElementById('cityInput');
    var filter = input.value.toLowerCase();
    var cityList = document.getElementById('cityList');
    var cities = cityList.getElementsByClassName('city-item');

    // Показать список, если введён текст
    if (filter) {
        cityList.style.display = 'block';
    } else {
        cityList.style.display = 'none';
        return;
    }

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i].textContent.toLowerCase();
        if (city.includes(filter)) {
            cities[i].style.display = ""; // Показать город
        } else {
            cities[i].style.display = "none"; // Скрыть город
        }
    }
}

// Закрытие списка при клике вне его
document.addEventListener('click', function(event) {
    const cityList = document.getElementById('cityList');
    const cityInput = document.getElementById('cityInput');
    if (!cityList.contains(event.target) && event.target !== cityInput) {
        cityList.style.display = 'none';
    }
});

// Выбор города
document.querySelectorAll('.city-item').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('cityInput').value = this.textContent; // Устанавливаем выбранный город
        document.getElementById('cityList').style.display = 'none'; // Скрываем список
    });
});
function showCityList(type) {
    if (type === 'from') {
        document.getElementById('cityList').style.display = 'block';
        document.getElementById('citysList').style.display = 'none'; // Скрываемсписок "Куда"
    } else if (type === 'to') {
        document.getElementById('citysList').style.display = 'block';
        document.getElementById('cityList').style.display = 'none'; // Скрываем список "Откуда"
    }
}

function selectCity(city, type) {
    if (type === 'from') {
        document.getElementById('from').value = city; // Устанавливаем выбранный город в поле "Откуда"
        document.getElementById('cityList').style.display = 'none'; // Скрываем список "Откуда"
    } else {
        document.getElementById('to').value = city; // Устанавливаем выбранный город в поле "Куда"
        document.getElementById('citysList').style.display = 'none'; // Скрываем список "Куда"
    }
}

// Закрытие списка при клике вне его
document.addEventListener('click', function(event) {
    const cityListFrom = document.getElementById('cityList');
    const cityListTo = document.getElementById('citysList');
    const cityInputFrom = document.getElementById('from');
    const cityInputTo = document.getElementById('to');

    if (!cityListFrom.contains(event.target) && event.target !== cityInputFrom) {
        cityListFrom.style.display = 'none'; // Скрываем список "Откуда"
    }
    if (!cityListTo.contains(event.target) && event.target !== cityInputTo) {
        cityListTo.style.display = 'none'; // Скрываем список "Куда"
    }
});
function openLogin() {
    window.location.href = 'Изображения/Страницы/index1.html'; // Замените на путь к вашей странице регистрации
}
