
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

function createCardPay(event) {
    let isNotExit = true;
    // ===================================================================
    let tr = event.target.closest("tr").children;
    console.log(tr);
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
    }
    // =====================code stock price ========================
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
                let c = document.querySelector(".final-amount");
                console.log(c)
                // // Add to total value based on the available incart
                for (let j = 0; j < cp.length; j++) {
                    total += parseInt(cp[j].children[2].textContent.match(/\d+/)[0]);
                }
                c.textContent = "Price: " + total + "$";
            }
        }
    }

}
// =====================================================================

//calculate total
let total = 0;
document.querySelector('.final-amount').textContent = '';
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
document.querySelector(".final-amount").textContent = "total " + total + "$";


function delet(event) {
    if (confirm('Are you sure you want to remove the order?')) {
        event.target.parentElement.remove();
    }
}

searchName.addEventListener('keyup', searchPro);