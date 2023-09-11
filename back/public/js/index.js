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

const searchProducts = async (searchText) => {
    try {
        const find = {search: searchText};
        const response = await fetch('/api/searchProduct',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(find)
        });
        if(response.ok){
            const dataResponse = await response.json();
            return dataResponse;
        }else{
            console.error('No se puede obtener informacion de la api');
        }
    } catch (error) {
        console.log(`Error al realizar la solicitud: ${error}`);
    }
}

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

    const busquedaInput = document.getElementById("busquedaInput");
    const resultadosDiv = document.getElementById("resultados");

    async function mostrarResultados() {
        const busqueda = busquedaInput.value.toLowerCase();
        console.log(busqueda)
        // if(busqueda != '') {
            
        // }
        const resultadosFiltrados = await searchProducts(busqueda);
        if(resultadosFiltrados.length > 0) {
            const listaHTML = resultadosFiltrados.map(resultado => {
                const images = JSON.parse(resultado.image).map(imgName => `/images/productos/${imgName}`);
                return `<li>
                <a class="elementSearched" href="/products/${resultado.id}">
                    <img class="img-search" src="${images[0]}" alt="">
                    <span class="text-center" style="margin-left: 15px;">${resultado.name}</span>
                </a>
                </li>`
            });            
            resultadosDiv.innerHTML = `<ul> ${listaHTML} </ul>`;
            resultadosDiv.style.display = resultadosFiltrados.length ? "block" : "none";
        }
    }

    // Agrega un controlador de eventos para el input de búsqueda
    busquedaInput.addEventListener("input", mostrarResultados);

    // Cierra los resultados al hacer clic fuera del input
    document.addEventListener("click", function(event) {
        if (event.target !== busquedaInput) {
            resultadosDiv.style.display = "none";
        }
    });


});

function closeModal() {
    const modal = document.getElementById('modal');
    location.href = 'https://digitalhouse.com/';
    modal.style.display = 'none';
}

