document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const categorySelect = document.getElementById('category');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');
    const colorsCheck = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const imageInput = document.querySelector('input[type="file"]');
    const characterInput = document.getElementById('characteristics');
    const descriptionInput = document.getElementById('description');
    const storeInput = document.getElementById('store');
    const submitForm = document.querySelector('#submit-btn');

    const formFilesValidated = {
        name:false,
        category:false,
        price:false,
        stock:false,
        colors:false,
        image:false,
        character:false,
        description:false,
        store:true
    }
    nameInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('pName');
        if(length < 3 ){
            formFilesValidated.name = false
            nameInput.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe tener al menos 3 caracteres';
        }else if(length > 35){
            formFilesValidated.name = false
            nameInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El nombre no debe superar los 35 caracteres'
        }else{
            formFilesValidated.name = true
            nameInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    priceInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-price');
        if(length == 0 ){
            formFilesValidated.price = false
            priceInput.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe agregar un precio al producto'
        }else{
            formFilesValidated.price = true
            priceInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    stockInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-stock');
        if(length == 0 ){
            formFilesValidated.stock = false
            stockInput.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe agregar el stock del producto'
        }else{
            formFilesValidated.stock = true
            stockInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    categorySelect.onchange=(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-category')
        if(length == 0 ){
            formFilesValidated.category = false
            categorySelect.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Elija una categoria'
        }else{
            formFilesValidated.category = true
            categorySelect.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    const checkColorArr = [] 
    const showPcolor = document.getElementById('p-color');
    colorsCheck.forEach(color =>{
        color.onchange=(e)=>{
            const colorId = color.id;
            const value = e.target.value;
            if(colorId && value){
                if(e.target.checked){
                    formFilesValidated.colors = true
                    checkColorArr.push(value);
                    showPcolor.style.display= 'none';
                    showPcolor.innerHTML = ''
                }else{
                    const index = checkColorArr.indexOf(value);
                    if(index !== -1){
                        checkColorArr.splice(index, 1)
                    }
                    if(checkColorArr.length == 0){
                        formFilesValidated.colors = false
                        showPcolor.style.display = 'block';
                        showPcolor.innerHTML = 'Debe Eligir un color'               
                    }
                }
            }
            checkErrors();
        }
    })
    const loadedImages = [];
    imageInput.oninput = (e) => {
        const files = e.target.files; // Obtener los archivos seleccionados
        const showP = document.getElementById('p-image');
        loadedImages.length= 0; //vacia el array antes de cargar una imagen nueva
        if (files.length === 0) {
            formFilesValidated.image = false;
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'No ha seleccionado una imagen';
        } else {
            let ArrExtension = ['jpg', 'jpeg', 'png'];
            
            // Recorrer cada archivo seleccionado
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const extension = file.name.split('.').pop().toLowerCase();
                
                if (ArrExtension.includes(extension)) {
                    formFilesValidated.image = true;
                    showP.style.display = 'none';
                    e.target.nextElementSibling.innerHTML = '';
                    loadedImages.push(file.name); // Agregar el nombre del archivo al array
                } else {
                    formFilesValidated.image = false;
                    showP.style.display = 'block';
                    e.target.nextElementSibling.innerHTML = 'Solo se permite jpg, jpeg, png.';
                }
            }
            loadedImages.map(nameImg=>{
                //verifica si el nombre de la imagen es mayor a 26 caracteres
                if(nameImg.length > 26){
                    formFilesValidated.image = false;
                    showP.style.display = 'block';
                    e.target.nextElementSibling.innerHTML = 'El nombre de la imagen debe contener como máximo 26 caracteres';
                }
            })
            //Verifica si contiene más de 6 imagenes
            if(loadedImages.length > 6){
                formFilesValidated.image = false;
                showP.style.display = 'block';
                e.target.nextElementSibling.innerHTML = 'El máximo permitido es de 6 imagenes por producto';
            }
        }
        checkErrors();
    };
    characterInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-charater');
        if(length == 0 ){
            formFilesValidated.character = false
            characterInput.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Agregue una característica del producto'
        }else if(length > 150){
            formFilesValidated.character = false
            characterInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 150 caracteres'
        }else if(length < 40){
            formFilesValidated.character = false
            characterInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto debe tener como mínimo 40 caracteres'
        }else{
            formFilesValidated.character = true
            characterInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    descriptionInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-description');
        if(length == 0 ){
            formFilesValidated.description = false
            descriptionInput.classList.add('invalid')
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Agregue una descripción del producto'
        }else if(length > 490){
            formFilesValidated.description = false
            descriptionInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 490 caracteres'
        }else if(length < 100){
            formFilesValidated.description = false
            descriptionInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto debe tener como mínimo 100 caracteres'
        }else{
            formFilesValidated.description = true
            descriptionInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    storeInput.oninput =(e)=>{
        const length = e.target.value.length;
        const showP = document.getElementById('p-store');
        if(length > 490){
            formFilesValidated.store = false
            storeInput.classList.add('invalid')
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 490 caracteres'
        }else {
            formFilesValidated.store = true
            storeInput.classList.remove('invalid')
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    const checkErrors = ()=>{
        for(let key in formFilesValidated){
            if(!formFilesValidated.hasOwnProperty(key))continue;
            if(typeof formFilesValidated[key] !== 'boolean' || formFilesValidated[key] !== true){
                return false;
            }
        }
        return true;
    }
    form.addEventListener('change', function(event){
        if(checkErrors()){
            submitForm.disabled = false;
            submitForm.style.backgroundColor='black'
        }else{
            submitForm.disabled = true;
            event.preventDefault();
        }
    })
})