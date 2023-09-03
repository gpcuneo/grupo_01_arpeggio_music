function getTowns(id) {
    const url = '/api/town/' + id;
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

const inputsValidate = [
    {id: 'userName', type: 'alphabetic', msg: 'Nombre de usuario no valido', eventType: 'keyup'},
    {id: 'firstName', type: 'alphabeticSpace', msg: 'Verificar el/los nombres', eventType: 'keyup'},
    {id: 'lastName', type: 'alphabeticSpace', msg: 'Veriicar el/los apellidos', eventType: 'keyup'},
    {id: 'dni', type: 'numeric', msg: 'DNI no valido', eventType: 'keyup'},
    {id: 'email', type: 'email', msg: 'email no valido o en uso', eventType: 'keyup'},
    {id: 'address', type: 'address', msg: 'Direccion invalida', eventType: 'keyup'},
    {id: 'city', type: 'numeric', msg: 'Verificar provincia', eventType: 'change'},
    {id: 'town', type: 'numeric', msg: 'verificar localidad/municipio', eventType: 'change'},
    {id: 'phone', type: 'phone', msg: 'Formato de telefono no valido', eventType: 'keyup'},
    {id: 'password', type: 'password', msg: 'Debe tener 8 caracteres, 1 Mayuscula y 1 simbolo', eventType: 'keyup'},
    {id: 'confirmPassword', type: 'password', msg: 'Revise la contraseña indicada', eventType: 'keyup'},
]

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
    alphabetic: /^[a-zA-Z]+$/,
    alphabeticSpace: /^[a-zA-Z\s]+$/,
    numeric: /^[\d.]{1,10}$/,
    alphanumeric: /^[a-zA-Z0-9\s]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    address: /^[a-zA-Z0-9]+\s\d{0,5}$/,
    phone: /^(?:\d|-){10,12}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
}

const validateCharacters = (value, type) => {
    const regex = regexTypes[type]
    if (regex.test(value)) {
        return true;
    } else {
        return false;
    }
}

const validateInput = (input, inputElement) => {
    const id = input.id;
    const type = input.type;
    const value = inputElement.value;
    const fieldValidated = validateCharacters(value, type);
    if (fieldValidated) {
        formFieldsValidated[id] = true;
        inputElement.classList.remove('error-info');
        if(inputElement.nextElementSibling.textContent !== '') {
            inputElement.nextElementSibling.textContent = '';
        }
    } else {
        formFieldsValidated[id] = false;
        inputElement.classList.add('error-info');
        if(inputElement.nextElementSibling.textContent === '') {
            inputElement.nextElementSibling.textContent = input.msg;
        }
    }
}

const checkFieldsOnReloadPage = () => {
    inputsValidate.forEach( (input) => {
        const inputElement = document.getElementById(input.id);
        if(inputElement.value) {
            validateInput(input, inputElement);
        }
    }
)};

const checkFieldsTrue = () => {
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

const upInputListener = (btnSend) => {
    inputsValidate.forEach( (input) => {
        const inputElement = document.getElementById(input.id);
        inputElement.addEventListener(input.eventType, () => {
            validateInput(input, inputElement);
            enableSendBtn(btnSend);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => { 
    let citySelector = document.getElementById('city');
    citySelector.addEventListener('change', () => {
        const citySelected = citySelector.value;
        getTowns(citySelected);
    });

    checkFieldsOnReloadPage();

    const btnSend = document.getElementById("btn-send");
    btnSend.disabled = true;
    upInputListener(btnSend);
});