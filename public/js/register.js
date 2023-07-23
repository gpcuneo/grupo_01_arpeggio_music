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

let citySelector = document.getElementById('city');

citySelector.addEventListener('change', () => {
    const citySelected = citySelector.value;
    console.log('Valor seleccionado:', citySelected);
    getTowns(citySelected);
});
