const nameInput = document.getElementById('name');
const categorySelect = document.getElementById('category');
const priceInput = document.getElementById('price');
/* const discountSelect = document.getElementById('discount'); */
/* const trademarkSelect = document.getElementById('trademark'); */
const stockInput = document.getElementById('stock');
const colorsCheck = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const imageInput = document.getElementById('image');
const characterInput = document.getElementById('characteristics');
const descriptionInput = document.getElementById('description');
const storeInput = document.getElementById('store');


const checkErrors = ()=>{

}
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
    }
})
imageInput.onchange=(e)=>{
    const value = e.target.value;
    const length= e.target.value.length
    console.log(`el valor: ${value} y largo:${length}`);
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
}