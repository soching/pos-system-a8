let dataStory = JSON.parse(localStorage.getItem('storysole')) || [];

let tbody = document.querySelector('tbody');

for (let index of dataStory) {
    console.log(index.date);

    let tr = document.createElement('tr');

    let nameCustomer = document.createElement('td');
    nameCustomer.textContent = index.name;

    let nameProduct = document.createElement('td');
    nameProduct.textContent = index.nameProduct;

    let date = document.createElement('td');
    date.textContent = index.data;

    let total = document.createElement('td');
    total.textContent = index.total;

    tr.appendChild(nameCustomer);
    tr.appendChild(nameProduct);
    tr.appendChild(date);
    tr.appendChild(total);
    tbody.appendChild(tr);
}

let prin = document.querySelector('#prin');
prin.addEventListener('click', () => {
    window.print();
});