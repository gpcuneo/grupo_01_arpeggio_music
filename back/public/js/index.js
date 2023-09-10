let slideIndex = 1;
const slides = document.getElementsByClassName("slide");

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

setInterval(function () {
plusSlides(1);
}, 5000);

showSlides(slideIndex);

document.addEventListener('DOMContentLoaded', () => {
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

    homeCarrousel()
});

function closeModal() {
    const modal = document.getElementById('modal');
    location.href = 'https://digitalhouse.com/';
    modal.style.display = 'none';
}

function homeCarrousel() {
    

    

}