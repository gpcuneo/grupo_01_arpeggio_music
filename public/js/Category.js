document.addEventListener('DOMContentLoaded', function () {
    const text = document.querySelector('.text')
    const img = document.querySelector('#img')
    const button = document.querySelector('.btn-black')
    text.oninput = (e) => {
        const value = e.target.value
        const lenght = e.target.value.length
        const showP = document.getElementById('p-name')
      if(lenght===0){
        showP.style.display='block'
        e.target.nextElementSibling.innerHTML = 'El texto debe contener 5 caracteres'
      } else if (lenght<4){
        showP.style.display='block'
        e.target.nextElementSibling.innerHTML = 'El texto debe contener 5 caracteres'
      } else if (lenght >25){
        showP.style.display='block'
        e.target.nextElementSibling.innerHTML = 'El texto debe contener 5 caracteres'
    } else {
showP.style.display = 'none'
e.target.nextElementSibling.innerHTML = ''
    }
    checkErrors ()
}
img.oninput = (e)=>{
    const value = e.target.value
    const lenght = e.target.value.length
    const showP = document.getElementById('p-img')
if (value == ''){
    showP.style.display='block'
    e.target.nextElementSibling.innerHTML = 'Debe cargar una imagen'
}
checkErrors()
}

const checkErrors = () =>{
let errorsHTML =Array.from (document.querySelectorAll('.error'))
let errors = []

console.log(errorsHTML);
errorsHTML.forEach (error =>{
    if (error.innerHTML !== ''){
        errors.push (error.innerHTML)
    }
})
if (errors.length > 0) {
    button.disabled = true
} else{
    button.removeAttribute('disabled')
}





}

})


