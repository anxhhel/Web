// We add event listener for the submission
document.getElementById('reservationForm').addEventListener('submit', function(event) {

    event.preventDefault();   // to prevent the default behavior (page reload)
    
    // Creating an object to store the reservation data
    let reservation = {
        // Get the values from the form
        name: document.getElementById('name').value,  
        phone: document.getElementById('phone').value,   
        email: document.getElementById('email').value,  
        date: document.getElementById('date').value,   
        time: document.getElementById('time').value  
    };

    // If there are existing reservations retrieve them or initialize an empty array if not 
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Add the new reservation to the array
    reservations.push(reservation);

    // Save the updated reservations array back to local storage
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Display a message to the user confirming the reservation has been saved
    alert('Reservation saved!');

    console.log('Form submitted!');  

});
