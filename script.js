const getStartedBtn = document.getElementById('getStartedBtn');
const messageModal = document.getElementById('messageModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');

// Show the modal when "Get Started" is clicked
getStartedBtn.addEventListener('click', () => {
    messageModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
    }, 10);
});

function hideModal() {
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        messageModal.classList.add('hidden');
    }, 300);
}

// Hide the modal when the close button is clicked
closeModalBtn.addEventListener('click', hideModal);

// Hide the modal when clicking outside of it
messageModal.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        hideModal();
    }
});
