if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

let loginIcon = document.getElementById('login-icon');
let loginContainer = document.getElementById('login-container');
let modalOverlay = document.getElementById('modal-overlay');
let sessionResetModal = document.getElementById('session-reset-modal');
let closeModalBtn = document.getElementById('close-modal');
let confirmResetBtn = document.getElementById('confirm-reset');
let bottleContainer = document.getElementById('bottle-container');
let longPressTimer;

// Function to show the modal
function showModal() {
    modalOverlay.classList.remove('hidden');
    sessionResetModal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    modalOverlay.classList.add('hidden');
    sessionResetModal.classList.add('hidden');
}

// Long press on login icon to show the session reset modal
loginIcon.addEventListener('mousedown', function() {
    longPressTimer = setTimeout(function() {
        showModal();
    }, 1000); // 1 second long press
});

loginIcon.addEventListener('mouseup', function() {
    clearTimeout(longPressTimer);
});

loginIcon.addEventListener('mouseleave', function() {
    clearTimeout(longPressTimer);
});

// Touch events for mobile devices
loginIcon.addEventListener('touchstart', function() {
    longPressTimer = setTimeout(function() {
        showModal();
    }, 1000); // 1 second long press
});

loginIcon.addEventListener('touchend', function() {
    clearTimeout(longPressTimer);
});

loginIcon.addEventListener('touchcancel', function() {
    clearTimeout(longPressTimer);
});

// Close modal when clicking the close button
closeModalBtn.addEventListener('click', hideModal);

// Close modal when clicking the confirm button
confirmResetBtn.addEventListener('click', hideModal);

// Close modal when clicking outside the modal content
modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
        hideModal();
    }
});

bottleContainer.addEventListener('dblclick', function() {
    loginContainer.classList.toggle('hidden');
});

document.getElementById('add-water-button').addEventListener('click', function() {
    const waterIntakeElement = document.getElementById('water-intake');
    const waterElement = document.getElementById('water');
    let currentIntake = parseInt(waterIntakeElement.textContent);
    currentIntake += 250;
    waterIntakeElement.textContent = currentIntake;
    
    const bottleHeight = 300; // Height of the bottle in pixels
    const maxIntake = 3000; // Maximum water intake in ml
    const newHeight = Math.min((currentIntake / maxIntake) * bottleHeight, bottleHeight);
    waterElement.style.height = newHeight + 'px';
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckbox = document.getElementById("theme-toggle");
    const body = document.body;

    // Set initial theme based on local storage or default to light mode
    const savedTheme = localStorage.getItem("theme") || "light-mode";
    body.classList.add(savedTheme);
    toggleCheckbox.checked = savedTheme === "dark-mode";

    toggleCheckbox.addEventListener("change", () => {
        if (toggleCheckbox.checked) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("theme", "light-mode");
        }
    });
});