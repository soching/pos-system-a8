// Get total of product and display it in dashboard page

let allProducts = JSON.parse(localStorage.getItem('allProducts')) || {};
let h1Instock = document.querySelector('.h1-instock');
h1Instock.textContent = allProducts;

// Get total of category and display it in dashboard page
const savedData = JSON.parse(localStorage.getItem('categoryData')) || {};
totalCategory = 0;
for (index in savedData){
    totalCategory += 1;
}
let h1Category = document.querySelector('.h1-category');
h1Category.textContent = totalCategory;

// Get total of soldout and display it in dashboard page
let saveSoldOut = JSON.parse(localStorage.getItem('allSoldOut')) || {};
soldtotal = 0;
for (i = 0; i<saveSoldOut.length; i++){
    soldtotal += 1;
}
let h1SoldOut = document.querySelector('.h1-sold');
h1SoldOut.textContent = soldtotal;

// Get total of income and display it in dashboard page
let totalAmount = 0;
let storysole = JSON.parse(localStorage.getItem('storysole')) || [];
for ( sold of storysole){
    totalAmount += parseInt(sold.total);
}
let h1Income = document.querySelector('.h1-income');
h1Income.textContent = totalAmount + "$";