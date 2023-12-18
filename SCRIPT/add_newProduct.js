let categories = JSON.parse(localStorage.getItem('categories')) || [];

for (let indexCategory of categories) {
    createOption(indexCategory, indexCategory);
}

function createOption(value, text) {
    let category = document.querySelector('#category');
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    category.appendChild(option); // Append the option to the category element
}


const productForm = document.querySelector('#productForm');

// Load saved data from localStorage
const savedData = JSON.parse(localStorage.getItem('categoryData')) || {};

productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.querySelector('#productName').value;
    const productPrice = document.querySelector('#productPrice').value;
    const productQuantity = document.querySelector('#productQuantity').value;
    const category = document.querySelector('#category').value;

    const product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        category: category
    };

    // Save product to localStorage
    savedData[category] = savedData[category] || [];
    savedData[category].push(product);
    localStorage.setItem('categoryData', JSON.stringify(savedData));

    productForm.reset();
});
