function showAvailableTicketss() {
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
fetch('api-docs.yaml', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Ошибка:', error));
