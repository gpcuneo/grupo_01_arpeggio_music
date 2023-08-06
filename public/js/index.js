document.addEventListener('DOMContentLoaded', () => {
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    function checkCookieConsent() {
        const consentKey = 'arpegiomusic_cookie_consent';
        const consentValue = localStorage.getItem(consentKey);
        // Si ya se ha dado el consentimiento, devolver true
        if (consentValue === 'true') {
            return true;
        }
        // Si no se ha dado el consentimiento, mostrar el modal y guardar el consentimiento en el Local Storage
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        
        const acceptBtn = document.getElementById('acceptBtn');
        acceptBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            localStorage.setItem(consentKey, 'true');
        });  
        // Devolver false ya que el consentimiento aún no se ha dado
        return false;
    }
    
    // Función para mostrar el modal
    function openModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    }
    
    // Función para ocultar el modal
    
        
    if (!checkCookieConsent()) {
        openModal();
    }

});

function closeModal() {
    const modal = document.getElementById('modal');
    location.href = 'https://digitalhouse.com/';
    modal.style.display = 'none';
}