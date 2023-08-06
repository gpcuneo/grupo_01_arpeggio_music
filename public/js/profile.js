const imageInput = document.getElementById('userimage');

imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('Por favor, seleccione una imagen.');
        return;
    }

    const maxSizeInBytes = 1024 * 1024; // 1 MB
    if (file.size > maxSizeInBytes) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es de 1 MB.');
        imageInput.value = '';
        return;
    }
}