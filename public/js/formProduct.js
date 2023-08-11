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

    nameInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('pName');
        if(length < 3 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe tener al menos 3 caracteres';
        }else if(length > 35){
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El nombre no debe superar los 35 caracteres'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    priceInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-price');
        if(length == 0 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe agregar un precio al producto'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    stockInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-stock');
        if(length == 0 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Debe agregar el stock del producto'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    categorySelect.onchange=(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-category')
        if(length == 0 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Elija una category'
        }else{
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
                    checkColorArr.push(value);
                    showPcolor.style.display= 'none';
                    showPcolor.innerHTML = ''
                }else{
                    const index = checkColorArr.indexOf(value);
                    if(index !== -1){
                        checkColorArr.splice(index, 1)
                    }
                    if(checkColorArr.length == 0){
                        showPcolor.style.display = 'block';
                        showPcolor.innerHTML = 'Debe Eligir un color'               
                    }
                }
            }
            checkErrors();
        }
    })
    imageInput.oninput=(e)=>{
        const value = e.target.value;
        const length= e.target.value.length;
        const showP = document.getElementById('p-image');
        if(value == ''){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML='No ha seleccionado una imagen'
        }else{
            let ArrExtension = ['jpg','jpeg', 'png'];
            let extension = value.replace(/^.*\./, '');
            extension= extension.toLowerCase();
            if(ArrExtension.includes(extension)){
                showP.style.display= 'none';
                e.target.nextElementSibling.innerHTML = '';
            }else{
                showP.style.display= 'block';
                e.target.nextElementSibling.innerHTML = 'Solo se permite jpg, jpeg, png.'
            }
        }
        checkErrors();
    }
    characterInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-charater');
        if(length == 0 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Agregue una característica del producto'
        }else if(length > 150){
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 150 caracteres'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    descriptionInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-description');
        if(length == 0 ){
            showP.style.display = 'block';
            e.target.nextElementSibling.innerHTML = 'Agregue una descripción del producto'
        }else if(length > 490){
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 490 caracteres'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }
    storeInput.oninput =(e)=>{
        const value = e.target.value;
        const length = e.target.value.length;
        const showP = document.getElementById('p-store');
        if(length > 490){
            showP.style.display='block';
            e.target.nextElementSibling.innerHTML = 'El texto no debe superar los 490 caracteres'
        }else{
            showP.style.display='none';
            e.target.nextElementSibling.innerHTML= '';
        }
        checkErrors();
    }

    const checkErrors = ()=>{
        let errorsHTML= Array.from(document.querySelectorAll('.errors'))
        let errors = [];
        errorsHTML.forEach(error =>{
            if(error.innerHTML !== ''){
                errors.push(error.innerHTML);
            }
        })
        if(errors.length > 0 ){
            submitForm.disabled= true;
        }else{
            submitForm.removeAttribute('disabled')
            submitForm.style.backgroundColor='black'
        }
    }
    form.addEventListener('submit', function(event){
        if(!checkErrors){
            event.preventDefault();
        }
    })
})