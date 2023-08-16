function getTowns(id) {
    const url = 'http://localhost:3000/api/town/' + id;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let townOptions = document.getElementById('town');
        let options = '<option value="0">Seleccione una localidad</option>'
        data.forEach(town => {
            options += "<option value='"+town.id+"'>"+town.name+"</option>"
        });
        townOptions.innerHTML = options;
    })
    .catch(error => console.error('Error al obtener los usuarios:', error));
}

const formFieldsValidated = {
    userName: false,
    firstName: false,
    lastName: false,
    dni: false,
    email: false,
    address: false,
    town: false,
    password: false,
    confirmPassword: false
}

const regexTypes = {
    alphabetic: /^[a-zA-Z\s]+$/,
    numeric: /^[\d.]{1,10}$/,
    alphanumeric: /^[a-zA-Z0-9\s]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    address: /^[a-zA-Z0-9]+\s\d{0,5}$/,
    phone: /^(?:\d|-){10,12}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

const validateCharacters = (e, type) => {
    const regex = regexTypes[type]
    const value = e.target.value.trim();
    if (regex.test(value)) {
        return true;
    } else {
        return false;
    }
}

const checkFieldsTrue = () => {
    console.log(formFieldsValidated)
    for (const key in formFieldsValidated) {
        if (!formFieldsValidated.hasOwnProperty(key)) continue;
        if (typeof formFieldsValidated[key] !== 'boolean' || formFieldsValidated[key] !== true) {
            return false;
        } 
    }
    return true;
}

const passwordMatch = () => {
    if (document.getElementById('password').value === document.getElementById('confirmPassword').value) {
        return true;
    } else {
        return false;
    }
}

const enableSendBtn = (btn) => {
    if(checkFieldsTrue() & passwordMatch()) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

const inputsValidate = [
    {id: 'firstName', type: 'alphabetic', msg: 'Algo'},
    {id: 'lastName', type: 'alphabetic', msg: 'Algo'},
    {id: 'userName', type: 'alphabetic', msg: 'Algo'},
    {id: 'dni', type: 'numeric', msg: 'Algo'},
    {id: 'email', type: 'email', msg: 'Algo'},
    {id: 'address', type: 'address', msg: 'Algo'},
    {id: 'city', type: 'numeric', msg: 'Algo'},
    {id: 'town', type: 'numeric', msg: 'Algo'},
    {id: 'phone', type: 'phone', msg: 'Algo'},
    {id: 'password', type: 'password', msg: 'Algo'},
    {id: 'confirmPassword', type: 'password', msg: 'Algo'},
]

document.addEventListener('DOMContentLoaded', () => { 
    let btnSend = document.getElementById("btn-send");
    btnSend.disabled = true;
    let citySelector = document.getElementById('city');
    citySelector.addEventListener('change', () => {
        const citySelected = citySelector.value;
        getTowns(citySelected);
    });

    inputsValidate.forEach( (input) => {
        const id = input.id;
        const type = input.type;
        const inputElement = document.getElementById(id);
        inputElement.addEventListener('change', (e) => {
            const fieldValidated = validateCharacters(e, type);
            fieldValidated ? formFieldsValidated[id] = true : formFieldsValidated[id] = false;
            enableSendBtn(btnSend);
        });
    })
});