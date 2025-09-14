document.addEventListener('DOMContentLoaded', () => {

    // --- Logic for index.html ---
    // Finds the "Get Started" button and makes it link to login.html
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // --- Logic for login.html ---
    // Finds the "Passenger" link/card and makes it link to passenger.html
    const passengerLink = document.getElementById('passenger-link');
    if (passengerLink) {
        passengerLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the link from navigating to "#"
            window.location.href = 'passenger.html';
        });
    }

     // Finds the "Conductor" link/card and makes it link to conductor.html
    const conductorLink = document.getElementById('conductor-link');
    if (conductorLink) {
        conductorLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents the link from navigating to "#"
            window.location.href = 'conductor.html';
        });
    }


});