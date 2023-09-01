document.addEventListener('DOMContentLoaded', function () {
    let urlBase = `http://localhost:3001/api/cart`;
    const getApiCart = async () => {
        try {
            const response = await fetch(urlBase, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('La respuesta de la api no llego')
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error al llamar a la api');
            throw error;
        }
    }
    getApiCart();
})