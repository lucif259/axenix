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
