// data from local=========
const savedData = JSON.parse(localStorage.getItem('categoryData')) || {};

let card = document.querySelector('.categoriesAll');
for (let index in savedData) {
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

        let price = document.createElement('td');
        price.textContent = product.price + ' $ ';

        let action = document.createElement('td');
        action.className = 'action';

        let btnDelete = document.createElement('span');
        btnDelete.classList.add('material-icons')
        btnDelete.textContent = 'delete';

        let btnOrder = document.createElement('span');
        btnOrder.classList.add('material-icons');
        btnOrder.textContent = 'add';

        action.appendChild(btnOrder);

        action.appendChild(btnDelete);
        btnOrder.addEventListener('click', createCardPay);

        productContainer.appendChild(id);
        productContainer.appendChild(name);
        productContainer.appendChild(category);
        productContainer.appendChild(stock);
        productContainer.appendChild(price);
        // productContainer.appendChild(btnOrder);
        productContainer.appendChild(action);

        product_list.appendChild(productContainer);

        btnDelete.addEventListener('click', deletProduct);
    }
}


//Delete product
function deletProduct(event) {
    if (confirm('Do you want to delet ?')) {
        event.target.parentElement.remove();
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
const nameProduct = document.querySelector('.nameProduct');
const numberProduct = document.querySelector('.numer');

let cardpay = document.querySelector('.cart-container');
let soldout = 0;
const allSoldOut = [];

localStorage.setItem('allSoldOut', JSON.stringify(allSoldOut));
function createCardPay(event) {

    let allSoldOut = JSON.parse(localStorage.getItem('allSoldOut'));
    let isNotExit = true;
    // ===================================================================
    let tr = event.target.closest("tr").children;

    let cardContent = document.querySelector(".product-incart");
    let productName = tr[1].textContent;
    let productStock = tr[3];
    let productPrice = parseInt(tr[4].textContent);

    for (let Quantitys of cardContent.children) {
        let a = Quantitys.children[0].textContent;
        if (a === productName) {
            isNotExit = false;
        }
    }


    if (isNotExit && productStock.textContent > 0) {
        let cardPay = document.createElement("div");
        cardPay.className = "cardpay";
        let cardNamePay = document.createElement("p");
        cardNamePay.textContent = productName;
        // add name product to card pay

        let namePay = productName;
        if (nameProduct.textContent !== namePay) {
            nameProduct.textContent += namePay + " ";
        }

        let cardQuality = document.createElement("p");
        cardQuality.textContent = "Quantity: ";

        let quantitySpan = document.createElement("span");
        quantitySpan.textContent = 0;
        cardQuality.appendChild(quantitySpan);

        let cardPricePay = document.createElement("p");
        cardPricePay.textContent = "Price: ";

        let priceSpan = document.createElement("span");
        priceSpan.textContent = productPrice + "$";
        cardPricePay.appendChild(priceSpan);
        let bntDeleteCard = document.createElement("button");
        bntDeleteCard.className = "bntdelet";
        bntDeleteCard.textContent = "delete";
        cardPay.appendChild(cardNamePay);
        cardPay.appendChild(cardQuality);
        cardPay.appendChild(cardPricePay);
        cardPay.appendChild(bntDeleteCard);
        cardContent.appendChild(cardPay);

        bntDeleteCard.addEventListener("click", delet);
        soldout = 1;
        allSoldOut.push(soldout);
    }
    localStorage.setItem('allSoldOut',JSON.stringify(allSoldOut));
    // ===================== code stock price ========================
    let total = 0;
    
    const cp = document.querySelector(".product-incart").children;
    for (let Quantitys of cardContent.children) {

        let a = Quantitys.children[0].textContent;
        if (a === productName) {
            if (
                productStock.textContent > 0 ||
                productStock.textContent > Quantitys.children[1].children[0].textContent
            ) {
                tr[3].textContent = productStock.textContent - 1;
                


                Quantitys.children[1].children[0].textContent =
                    parseInt(Quantitys.children[1].children[0].textContent) + 1;
                let b = (Quantitys.children[2].children[0].textContent =
                    parseInt(productPrice) *
                    parseInt(Quantitys.children[1].children[0].textContent) +
                    "$");
                // // Extract number from string using regex \d
                let c = document.querySelector(".prices");
                // // Add to total value based on the available incart
                for (let j = 0; j < cp.length; j++) {
                    total += parseInt(cp[j].children[2].textContent.match(/\d+/)[0]);
                }
                c.textContent = total + "$";
            }
        }
        
        
    }

    cardpay.style.display = 'block';

}


// =====================================================================

//calculate total
let total = 0;

document.querySelector('.prices').textContent = '';
for (const card of document.querySelectorAll(".cardpay")) {
    let quantity = card.firstElementChild.nextElementSibling.firstElementChild.textContent;
    let price = card.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent.replace("$", "");
    if (quantity.length > 1) {
        for (let i = 0; i < quantity.length; i++) {
            total += price;
        }
    } else {
        total += parseInt(price);
    }
}
document.querySelector(".prices").textContent = "total " + total + "$";


function delet(event) {
    if (confirm('Are you sure you want to remove the order?')) {
        event.target.parentElement.remove();
    }
}
searchName.addEventListener('keyup', searchPro);

// button hiden and show
let cardContent = document.querySelector(".product-incart");
let formIvioce = document.querySelector('.invoiceForm');
let btn_show = document.querySelector('.pay-btn');
btn_show.addEventListener('click', function () {
    formIvioce.style.display = 'block';
});
let btn_hiden = document.querySelector('.cancel-btn');
btn_hiden.addEventListener('click', function () {
    cardpay.style.display = 'none';
})



// card pay get values----------------------------------------
let dataStory = JSON.parse(localStorage.getItem('storysole')) || [];

const customerNameInput = document.getElementById('customer-name');
const invoiceDateInput = document.getElementById('invoice-date');

const nameProductElement = document.querySelector('.nameProduct');
const totalPriceElement = document.querySelector('.prices');


const payNowButton = document.querySelector('#submit');
const cancelButton = document.querySelector('#cancel');
cancelButton.addEventListener('click',function(){
    formIvioce.style.display = 'none';
})

payNowButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (window.confirm('Do you want to pay?')) {
        const customerName = customerNameInput.value;
        const invoiceDate = invoiceDateInput.value;
        const nameProduct = nameProductElement.textContent;
        const totalPrice = totalPriceElement.textContent;

        const product = {
            name: customerName,
            data: invoiceDate,
            nameProduct: nameProduct,
            total: totalPrice,
        };
        dataStory.push(product);
        localStorage.setItem('storysole', JSON.stringify(dataStory));
        document.innerHTML = '';
        formIvioce.style.display = 'none';
        cardpay.style.display = 'none';
    }


    const product = {
        name: customerName,
        data: invoiceDate,
        nameProduct: nameProduct,
        total: totalPrice,
    };
    dataStory.push(product);
    localStorage.setItem('storysole', JSON.stringify(dataStory));
    document.innerHTML='';
    
});


