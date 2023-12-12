let snackDatas = [
    {name: "Mister potato", stock:10, price: 2, img:'Images/mister_potato.png'},
    {name: "Mister potato", stock:10, price: 2, img:'Images/mister_potato.png'},
    {name: "Mister potato", stock:10, price: 2, img:'Images/mister_potato.png'},
    {name: "Mister potato", stock:10, price: 2, img:'Images/mister_potato.png'},
]

let product_list = document.querySelector(".product-list");
function createProdut(){
    let productcontainer = document.createElement('div');
    productcontainer.classList.add('product');
    let productImg = document.createElement('img');
    productImg.classList.add('product-img');
    productImg.src = product.img;
    let productName = document.createElement('p');
    productName.classList.add('product-name');
    productName.textContent = product.name;
    let productStock = document.createElement('p');
    productStock.classList.add('product-stock');
    productStock.textContent = "Total in stock: "
    let stockSpan = document.createElement('span');
    stockSpan.textContent = product.stock;
    let productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = "Price: ";
    let priceSpan = document.createElement('span');
    priceSpan.textContent = product.price;
    let productBtn = document.createElement('button');
    productBtn.classList.add('add-btn');
    productBtn.textContent = "Add!"

    productStock.appendChild(stockSpan);
    productPrice.appendChild(priceSpan);

    productcontainer.appendChild(productImg);
    productcontainer.appendChild(productName);
    productcontainer.appendChild(productStock);
    productcontainer.appendChild(productPrice);
    productcontainer.appendChild(productBtn);

    product_list.appendChild(productcontainer);
    

}

for (product of snackDatas){
    createProdut()
}