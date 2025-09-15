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
        const statusText = document.getElementById('status-text');
        const statusDiv = document.getElementById('status');

        powerButton.addEventListener('click', (e) => {
            const isActive = powerButton.classList.toggle('active');

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = powerButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            powerButton.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            if (isActive) {
                statusText.textContent = 'Tap to Stop Tracking';
                statusDiv.innerHTML = `Status: <span class="text-2xl font-bold text-green-500">ACTIVE</span>`;
                console.log('Tracking started...');
            } else {
                statusText.textContent = 'Tap to Start Tracking';
                statusDiv.innerHTML = `Status: <span class="text-2xl font-bold text-red-500">INACTIVE</span>`;
                console.log('Tracking stopped.');
            }
        });
    }

    // --- Passenger Track Page Logic ---
    const trackRouteBtn = document.getElementById('trackRouteBtn');
    if(trackRouteBtn) {
        let map;
        let busMarkers = {};
        let unsubscribe = null;

        window.initMap = () => {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 22.5726, lng: 88.3639 },
                zoom: 12,
            });
        };
        
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