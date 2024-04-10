document.addEventListener('DOMContentLoaded', () => {
    const loadCarsBtn = document.getElementById('loadCarsBtn');
    const carList = document.getElementById('carList');
    cars = [];
    loadCarsBtn.addEventListener('click', () => {
        fetch('/cars')
            .then(response => response.json())
            .then(data => {
                cars = data;
                carList.innerHTML = '';
                data.forEach((car, index) => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');
                    carCard.innerHTML = `
                        <h2>${car.make} ${car.model}</h2>
                        <p><strong>Year:</strong> ${car.year}</p>
                        <p><strong>Make:</strong> ${car.make}</p>
                        <p><strong>Model:</strong> ${car.model}</p>
                        <p><strong>Price:</strong> R${car.price}</p>
                        <button class="btn btn-remove" data-index="${index}">Remove</button>
                    `;
                    carList.appendChild(carCard);
                });
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
            });
    });
});


//Get the form element
var carForm = document.getElementById('carForm');

// Add an event listener for the form submission
carForm.addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Create a new car object from the form data
    var newCar = {
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        price: document.getElementById('price').value
    };

    // Send the new car data to the server
    fetch('/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        //clear form fields
        document.getElementById('make').value = '';
        document.getElementById('model').value = '';
        document.getElementById('year').value = '';
        document.getElementById('price').value = '';
        
    })
    .catch((error) => {         
        console.error('Error:', error);
    });
});




// Function to remove a car
function removeCar(index) {
    const carId = index;
    fetch(`/cars/${carId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //reload cars
            // const loadCarsBtn = document.getElementById('loadCarsBtn');
            loadCarsBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Event delegation for remove buttons
carList.addEventListener('click', event => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.dataset.index;
        removeCar(index);
    }
});