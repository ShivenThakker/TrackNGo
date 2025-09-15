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

    // --- Logic for passenger.html ---
    const trackBusLink = document.getElementById('track-bus-link');
    if (trackBusLink) {
        trackBusLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'track.html';
        });
    }
    
    const findNearbyBtn = document.getElementById('find-nearby-btn');
    if(findNearbyBtn) {
        findNearbyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Placeholder for "Bus Stops Near Me" functionality
            console.log("Finding nearby bus stops...");
            alert("Feature coming soon!");
        });
    }

      // --- Logic for conductor.html ---
    const powerButton = document.getElementById('power-button');
    const statusText = document.getElementById('status-text');
    const statusDiv = document.getElementById('status');

    if (powerButton) {
        powerButton.addEventListener('click', (e) => {
            const isActive = powerButton.classList.toggle('active');

            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = powerButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            // The ripple color is white for both states for contrast
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

            powerButton.appendChild(ripple);

            // Remove the ripple element after the animation is done
            setTimeout(() => {
                ripple.remove();
            }, 600);


            // Update status text and colors based on the new state
            if (isActive) {
                statusText.textContent = 'Tap to Stop Tracking';
                statusDiv.innerHTML = `Status: <span class="font-bold text-green-400">Active</span>`;
                console.log('Tracking started...');
                // TODO: Add logic to start sending location data to Firebase
            } else {
                statusText.textContent = 'Tap to Start Tracking';
                statusDiv.innerHTML = `Status: <span class.="font-bold text-red-400">Inactive</span>`;
                console.log('Tracking stopped.');
                // TODO: Add logic to stop sending location data
            }
        });
    }

});