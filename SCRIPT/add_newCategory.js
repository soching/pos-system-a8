// Retrieve categories from local storage or create an empty array
let categories = JSON.parse(localStorage.getItem('categories'))||[];
const savedData = JSON.parse(localStorage.getItem('categoryData'))||{};
const categoryList = document.getElementById('categoryList');
const cardDetailsContainer = document.getElementById('cardDetailsContainer');

for (let i in savedData) {
  const data = savedData[i];
  const listItem = document.createElement('li');
  listItem.className = 'listItem';
  listItem.textContent = i;

  // Create a remove button
  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', (event) => removeCategory(data, event));
  listItem.appendChild(removeButton);

  const details = document.createElement('button');
  details.textContent = 'Detail';
  details.addEventListener('click', (event) => showCardDetails(data, event));
  listItem.appendChild(details);

  categoryList.appendChild(listItem);
}

function showCardDetails(dataProduct, event) {
  // Clear existing card details
  cardDetailsContainer.style.display = 'block';
  cardDetailsContainer.innerHTML = '';

  for (let dete of dataProduct) {
    const cardDetailItem = document.createElement('p');
    cardDetailItem.className = 'productShow';
    cardDetailItem.textContent = dete.name + " In stock: " + dete.quantity + "  Total Price: " + dete.quantity * dete.price + '$';
    cardDetailsContainer.appendChild(cardDetailItem);
  }

  let btnCancel = document.createElement('button');
  btnCancel.className = 'btnCancel';
  btnCancel.textContent = 'Cancel';
  btnCancel.addEventListener('click', function () {
    cardDetailsContainer.style.display = 'none';
  });

  cardDetailsContainer.appendChild(btnCancel);
}

// Add category to the list and local storage
function addCategory(category) {
  categories.push(category);
  localStorage.setItem('categories', JSON.stringify(categories))||[];
  savedData[category] = [];
  localStorage.setItem('categoryData', JSON.stringify(savedData))||{};
}

// Remove category from the list and local storage
function removeCategory(dataProduct, event) {
  if (window.confirm('Do you want to delete?')) {
    // Access the index of the clicked button
    const index = Array.from(categoryList.children).indexOf(event.currentTarget.parentNode);

    // Delete the card from local storage
    const categoryKey = Object.keys(savedData)[index];

    delete savedData[categoryKey];
    localStorage.setItem('categoryData', JSON.stringify(savedData))|| {};

    // Remove the list item from the DOM
    event.currentTarget.parentNode.remove();
  }

}

// Submit form event listener
const form = document.getElementById('categoryForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const categoryNameInput = document.getElementById('categoryName');
  const categoryName = categoryNameInput.value.trim();

  if (categoryName !== '') {
    addCategory(categoryName);
    categoryNameInput.value = '';
  }
});