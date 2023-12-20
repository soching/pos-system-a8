// Load saved data from localStorage
let categories = JSON.parse(localStorage.getItem('categories'))||[];
const savedData = JSON.parse(localStorage.getItem('categoryData'))||{};

for (let indexCategory of categories) {
  createOption(indexCategory, indexCategory);
  // console.log(indexCategory);
}

function createOption(value, text) {
  let category = document.querySelector('#category');
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  category.appendChild(option); // Append the option to the category element
}

const productForm = document.querySelector('#productForm');


let allProducts = 0;

productForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const productName = document.querySelector('#productName').value;
  const productPrice = document.querySelector('#productPrice').value;
  const productQuantity = document.querySelector('#productQuantity').value;
  const category = document.querySelector('#category').value;
  const date = document.querySelector('#date').value;

  const product = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    date:date,
    category: category
  };

  // Retrieve existing products for the category or create an empty array
  savedData[category] = savedData[category] || [];
  savedData[category].push(product);
  localStorage.setItem('categoryData', JSON.stringify(savedData))||[];
  allProducts += 1;
  localStorage.setItem('allProducts',JSON.stringify(allProducts))||[];

  productForm.reset();
});