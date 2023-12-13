let snackDatas = [
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
];
// new data

/*Data save to localstorag */
function saveSnackData() {
    localStorage.setItem('snackDatas', JSON.stringify(snackDatas));
}
// saveSnackData();

/*laod data from localstorag */
function loadSnackData() {
    const snackDataString = localStorage.getItem('snackDatas');
    if (snackDataString) {
        snackDatas = JSON.parse(snackDataString);
    }
}

function createProduct(data) {
    let product_list = document.querySelector(".product-list");
    product_list.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        console.log(product);
        let productContainer = document.createElement('div');
        productContainer.classList.add('product');

        let productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.src = product.img;

        let productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        let productStock = document.createElement('p');
        productStock.classList.add('product-stock');
        productStock.textContent = "Total in stock: ";

        let stockSpan = document.createElement('span');
        stockSpan.textContent = product.stock;

        let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = "Price: ";

        let priceSpan = document.createElement('span');
        priceSpan.textContent = product.price;

        let productBtn = document.createElement('button');
        productBtn.classList.add('add-btn');
        productBtn.textContent = "Order";
        productBtn.id = i;

        productBtn.addEventListener('click', createCardPay);

        productStock.appendChild(stockSpan);
        productPrice.appendChild(priceSpan);

        productContainer.appendChild(productImg);
        productContainer.appendChild(productName);
        productContainer.appendChild(productStock);
        productContainer.appendChild(productPrice);
        productContainer.appendChild(productBtn);

        product_list.appendChild(productContainer);
    }
}

function createCardPay(event) {
    let cardContent = document.querySelector('.product-incart');

    let button = event.currentTarget;
    let buttonId = button.id;
    let indexCard = snackDatas[buttonId];
    let cardPay = document.createElement('div');
    cardPay.className = 'cardpay';

    let cardNamePay = document.createElement('p');
    cardNamePay.textContent = "Name: " + indexCard.name;

    let cardQuality = document.createElement('p');
    cardQuality.textContent = "Quantity: " + 1;

    let cardPricePay = document.createElement('p');
    cardPricePay.textContent = "Price: " + indexCard.price + '$';

    let bntDeleteCard = document.createElement('button');
    bntDeleteCard.className = 'bntdelet';
    bntDeleteCard.textContent = 'delete';

    cardPay.appendChild(cardNamePay);
    cardPay.appendChild(cardQuality);
    cardPay.appendChild(cardPricePay);
    cardPay.appendChild(bntDeleteCard);
    cardContent.appendChild(cardPay);
}



loadSnackData();
createProduct(snackDatas);