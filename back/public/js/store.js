function getValuesAndLoad(page) {
    const categories = document.querySelectorAll('input[name="categories"]:checked');
    const brands = document.querySelectorAll('input[name="brands"]:checked');
    const categoriesSelecteds = Array.from(categories).map(checkbox => checkbox.value);
    const brandsSelecteds = Array.from(brands).map(checkbox => checkbox.value);
    const params = new URLSearchParams();
    categoriesSelecteds.forEach(valor => {
        params.append('category', valor);
    });
    brandsSelecteds.forEach(valor => {
        params.append('brands', valor);
    });
    if(page){
        params.append('page', page);
    }
    const url = `/store?${params.toString()}`;
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            getValuesAndLoad()
        });
    });
    const btnPages = document.getElementsByClassName("btn-page");
    const btnPagesArray = Array.from(btnPages);
    
    btnPagesArray.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const page = e.target.text;
            getValuesAndLoad(page)
            e.preventDefault();
        });
    });
});