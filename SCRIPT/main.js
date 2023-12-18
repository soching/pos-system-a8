
// data from local=========
const savedData = JSON.parse(localStorage.getItem('categoryData')) || {};
let card = document.querySelector('.categoriesAll');
// console.log(savedData);

for (let index in savedData) {
    // console.log(index);
    const cardForm = document.createElement('div');
    cardForm.classList.add('card-form');

    let cardShow = document.createElement('button');
    cardShow.textContent = index;
    cardShow.className = 'card-show';

    // Attach data index to cardShow button
    cardShow.dataset.index = index;

    cardShow.addEventListener('click', createProduct);

    cardForm.appendChild(cardShow);
    card.appendChild(cardForm);
}

let product_list;
function createProduct(event) {
    const index = event.target.dataset.index;
    const data = savedData[index];
    product_list = document.querySelector('.tbody');
    product_list.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        let productContainer = document.createElement('tr');
        productContainer.className = 'trProduct';

        let id = document.createElement('td');
        id.textContent = i + 1;

        let name = document.createElement('td');
        name.textContent = product.name;

        let category = document.createElement('td');
        category.textContent = product.category;

        let stock = document.createElement('td');
        stock.textContent = product.quantity;
        console.log(stock);

        let price = document.createElement('td');
        price.textContent = product.price + ' $ ';

        let btnDelete = document.createElement('td');
        btnDelete.textContent = 'delete';

        let btnOrder = document.createElement('td');
        btnOrder.textContent = 'Order';

        btnOrder.addEventListener('click', createCardPay);

        productContainer.appendChild(id);
        productContainer.appendChild(name);
        productContainer.appendChild(category);
        productContainer.appendChild(stock);
        productContainer.appendChild(price);
        productContainer.appendChild(btnOrder);
        productContainer.appendChild(btnDelete);


        product_list.appendChild(productContainer);
    }
}

function searchPro() {
    for (pName of product_list.children) {
        if (pName.children[1].textContent.toLocaleLowerCase().includes(searchName.value.toLocaleLowerCase())) {
            pName.style.display = "table-row";
        }
        else {
            pName.style.display = "none";
        }
    }

}
let searchName = document.querySelector("#search-input");

function createCardPay(event) {
    let isNotExit = true;
    let cardContent = document.querySelector('.product-incart');
    let productName = event.target.parentElement.children[1].textContent;
    let productStock = parseInt(event.target.parentElement.children[3].textContent);
    let productPrice = parseInt(event.target.parentElement.children[4].textContent);

    for (let Quantitys of cardContent.children) {
        let a = Quantitys.children[0].textContent;
        if (a === productName) {
            isNotExit = false;
            if (productStock > (Quantitys.children[1].children[0].textContent)) {
                Quantitys.children[1].children[0].textContent = parseInt(Quantitys.children[1].children[0].textContent) + 1;
                Quantitys.children[2].children[0].textContent = parseInt(productPrice) * parseInt(Quantitys.children[1].children[0].textContent) + "$";
            }
        }
    }
    if (isNotExit) {
        let cardPay = document.createElement('div');
        cardPay.className = 'cardpay';

        let cardNamePay = document.createElement('p');
        cardNamePay.textContent = productName;

        let cardQuality = document.createElement('p');
        cardQuality.textContent = "Quantity: ";

        let quantitySpan = document.createElement('span');
        quantitySpan.textContent = 1;
        cardQuality.appendChild(quantitySpan);

        let cardPricePay = document.createElement('p');
        cardPricePay.textContent = "Price: ";

        let priceSpan = document.createElement('span');
        priceSpan.textContent = productPrice + "$";
        cardPricePay.appendChild(priceSpan);

        let bntDeleteCard = document.createElement('button');
        bntDeleteCard.className = 'bntdelet';
        bntDeleteCard.textContent = 'delete';
        cardPay.appendChild(cardNamePay);
        cardPay.appendChild(cardQuality);
        cardPay.appendChild(cardPricePay);
        cardPay.appendChild(bntDeleteCard);
        cardContent.appendChild(cardPay);

        bntDeleteCard.addEventListener('click', delet);
    }
    //calculate total
    let total = 0;
    document.querySelector('.final-amount').textContent = '';
    for (const card of document.querySelectorAll(".cardpay")) {
        let quantity = card.firstElementChild.nextElementSibling.firstElementChild.textContent;
        let price = card.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent.replace("$", "");
        if (quantity.length > 1){
            for (let i = 0; i < quantity.length; i++){
                total += price;
            }
        }else {
            total += parseInt(price);
        }
    }
    document.querySelector(".final-amount").textContent = "total " + total + "$";
}

function delet(event) {
    if (confirm('Are you sure you want to remove the order?')) {
        event.target.parentElement.remove();
    }
}

searchName.addEventListener('keyup', searchPro);