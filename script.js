// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: "AIzaSyBe4DK5UFvax2iWnXDzw2H9d6-Bs03J-ns",
  authDomain: "trackngo-c145b.firebaseapp.com",
  projectId: "trackngo-c145b",
  storageBucket: "trackngo-c145b.appspot.com", // Corrected the URL
  messagingSenderId: "807204484538",
  appId: "1:807204484538:web:2323924afd9ce2e9779983",
  measurementId: "G-1773Y9KEDT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const authenticate = async () => {
    try {
        await signInAnonymously(auth);
        console.log("Authentication successful.");
    } catch (error) {
        console.error("Firebase Auth Error:", error);
    }
};

authenticate();


// --- MAP INITIALIZATION LOGIC (SOLUTION IMPLEMENTED) ---
// Make map variables global so they can be accessed by both initMap and the button click handler.
let map = null;
let busMarkers = {};
let unsubscribe = null;

// Define initMap in the global scope so the Google Maps script can always find it.
window.initMap = function() {
    const mapEl = document.getElementById('map');
    if (mapEl) {
        map = new google.maps.Map(mapEl, {
            center: { lat: 22.5726, lng: 88.3639 }, // Kolkata
            zoom: 12,
        });
        console.log('Google Map initialized successfully.');
    } else {
        // This case handles if track.html isn't the current page.
        console.log('Map element not found on this page.');
    }
};


document.addEventListener('DOMContentLoaded', () => {

    // --- Logic for index.html ---
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // --- Logic for login.html ---
    const passengerLink = document.getElementById('passenger-link');
    if (passengerLink) {
        passengerLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'passenger.html';
        });
    }

    const conductorLink = document.getElementById('conductor-link');
    if (conductorLink) {
        conductorLink.addEventListener('click', (e) => {
            e.preventDefault();
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
            console.log("Finding nearby bus stops...");
            alert("Feature coming soon!");
        });
    }

      // --- Logic for conductor.html ---
    const powerButton = document.getElementById('power-button');
    if (powerButton) {
        let isTracking = false;
        let locationWatcher = null; // This will hold our GPS watcher
        const busNumberInput = document.getElementById('busNumber');
        const routeNumberInput = document.getElementById('routeNumber');
        const statusText = document.getElementById('status-text');
        const statusDiv = document.getElementById('status');



        //Check for a saved tracking session when the page loads
        const checkPersistedSession = () => {
            const persistedIsTracking = localStorage.getItem('isTrackingActive');
            if (persistedIsTracking === 'true') {
                const busNumber = localStorage.getItem('busNumber');
                const routeNumber = localStorage.getItem('routeNumber');
                if (busNumber && routeNumber) {
                    busNumberInput.value = busNumber;
                    routeNumberInput.value = routeNumber;
                    // Automatically restart the tracking
                    startTracking(busNumber, routeNumber);
                }
            }
        };

        checkPersistedSession(); // Run the check as soon as the page is ready

        powerButton.addEventListener('click', async (e) => {
            if (isTracking) {
                // If we are already tracking, this button press means STOP.
                stopTracking(busNumberInput.value.trim().toUpperCase());
                return;
            }

            const busNumber = busNumberInput.value.trim().toUpperCase();
            const routeNumber = routeNumberInput.value.trim().toUpperCase();

            if (!busNumber || !routeNumber) {
                alert("Please enter both Bus Number and Route Number.");
                return;
            }

            // --- DATABASE VALIDATION ---
            const busRouteRef = doc(db, "bus_routes", busNumber);
            try {
                const docSnap = await getDoc(busRouteRef);
                if (!docSnap.exists() || docSnap.data().routeNumber !== routeNumber) {
                    alert("Invalid Bus or Route Number combination. Please re-check the details.");
                    return;
                }
            } catch (error) {
                console.error("Error validating bus route:", error);
                alert("Could not verify details. Please check your internet connection.");
                return;
            }

            // If validation is successful, start the tracking process
            startTracking(busNumber, routeNumber, e);
        });

        function startTracking(busNumber, routeNumber, e) {
            if (isTracking) return; // Prevent multiple watchers
            isTracking = true;
            powerButton.classList.add('active');
            statusText.textContent = 'Tap to Stop Tracking';
            statusDiv.innerHTML = `Status: <span class="text-2xl font-bold text-green-500">ACTIVE</span>`;

            // ** NEW: Save session state to localStorage **
            localStorage.setItem('isTrackingActive', 'true');
            localStorage.setItem('busNumber', busNumber);
            localStorage.setItem('routeNumber', routeNumber);

            // --- STEP 1.1: ACTIVATE GPS TRACKING ---
            if (navigator.geolocation) {
                locationWatcher = navigator.geolocation.watchPosition(
                    // SUCCESS CALLBACK (This runs every time a new location is found)
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log(`New location found for ${busNumber}:`, { latitude, longitude });
                        
                        // --- STEP 1.2: WRITE TO FIRESTORE ---
                        const busDocRef = doc(db, "live_buses", busNumber);
                        setDoc(busDocRef, {
                            routeNumber: routeNumber,
                            location: { latitude, longitude },
                            timestamp: new Date() // Good practice to store a timestamp
                        });
                    }, 
                    // ERROR CALLBACK
                    (error) => {
                        console.error("Geolocation Error:", error);
                        alert("Could not get your location. Please ensure location services are enabled and permissions are granted. Tracking will be stopped.");
                        stopTracking(busNumber); 
                    },
                    // OPTIONS
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                alert("Geolocation is not supported by your browser. Tracking cannot start.");
                stopTracking(busNumber);
            }

            // Ripple animation
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = powerButton.getBoundingClientRect();
            ripple.style.width = ripple.style.height = `${rect.width}px`;
            ripple.style.left = `${e.clientX - rect.left - rect.width / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - rect.height / 2}px`;
            powerButton.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }

        function stopTracking(busNumber) {
            if (!busNumber) {
                busNumber = localStorage.getItem('busNumber');
            }
            isTracking = false;
            powerButton.classList.remove('active');
            statusText.textContent = 'Tap to Start Tracking';
            statusDiv.innerHTML = `Status: <span class="text-2xl font-bold text-red-500">INACTIVE</span>`;
            
           // ** NEW: Clear the saved session state **
            localStorage.removeItem('isTrackingActive');
            localStorage.removeItem('busNumber');
            localStorage.removeItem('routeNumber');
          
            // Stop watching the GPS
            if (locationWatcher) {
                navigator.geolocation.clearWatch(locationWatcher);
                locationWatcher = null;
            }

            // --- STEP 1.3: DELETE DOCUMENT FROM FIRESTORE ---
            if (busNumber) {
                const busDocRef = doc(db, "live_buses", busNumber);
                deleteDoc(busDocRef);
                console.log(`Tracking stopped for ${busNumber}. Document deleted.`);
            }
        }
    }


    // --- Passenger Track Page Logic ---
    const trackRouteBtn = document.getElementById('trackRouteBtn');
    if(trackRouteBtn) {
        
        trackRouteBtn.addEventListener('click', () => {
            const routeNumber = document.getElementById('routeNumberInput').value.trim().toUpperCase();
            if (!routeNumber) {
                alert("Please enter a Route Number.");
                return;
            }

            if (unsubscribe) unsubscribe();
            Object.values(busMarkers).forEach(marker => marker.setMap(null));
            busMarkers = {};

            const q = query(collection(db, "live_buses"), where("routeNumber", "==", routeNumber));

            unsubscribe = onSnapshot(q, (snapshot) => {
                document.getElementById('eta-info').textContent = snapshot.empty 
                    ? `No active buses found for route ${routeNumber}.`
                    : `Tracking ${snapshot.size} bus(es) on route ${routeNumber}.`;
                
                snapshot.docChanges().forEach((change) => {
                    const busData = change.doc.data();
                    const busId = change.doc.id;
                    const position = { lat: busData.location.latitude, lng: busData.location.longitude };

                    if (change.type === "added" || change.type === "modified") {
                        if (!busMarkers[busId]) {
                            busMarkers[busId] = new google.maps.Marker({ position, map, title: busId });
                        } else {
                            busMarkers[busId].setPosition(position);
                        }
                    } else if (change.type === "removed") {
                        if (busMarkers[busId]) {
                            busMarkers[busId].setMap(null);
                            delete busMarkers[busId];
                        }
                    }
                });
            });
        });
    }
}); 
