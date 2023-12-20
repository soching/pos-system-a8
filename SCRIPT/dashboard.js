// Get total of product and display it in dashboard page
const savedData = JSON.parse(localStorage.getItem('categoryData')) || {};

let h1Instock = document.querySelector('.h1-instock');
// h1Instock.textContent = allProducts;

// Get total of category and display it in dashboard page
totalCategory = 0;
for (index in savedData) {
    totalCategory += 1;
}
let h1Category = document.querySelector('.h1-category');
h1Category.textContent = totalCategory;

// Get total of soldout and display it in dashboard page
let saveSoldOut = JSON.parse(localStorage.getItem('allSoldOut')) || {};
let allsole = saveSoldOut.length
let h1SoldOut = document.querySelector('.h1-sold');
h1SoldOut.textContent = allsole;

// Get total of income and display it in dashboard page
let totalAmount = 0;
let storysole = JSON.parse(localStorage.getItem('storysole')) || [];
for (sold of storysole) {
    totalAmount += parseInt(sold.total);
}
let h1Income = document.querySelector('.h1-income');
h1Income.textContent = totalAmount + "$";