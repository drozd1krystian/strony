const StorageCtrl = (function(){
    return {
        getItemsFromStorage: function() {
            let data;
            if(localStorage.getItem('data') == null){
                data = {
                    items: [],
                    total: 0,
                    count: 0,
                }
            } else {
                data = JSON.parse(localStorage.getItem('data'));
            }
            return data;
        },
        updateItem: function(item, id) {
            let data = JSON.parse(localStorage.getItem('data'));
            data.items[id] = item;
            localStorage.setItem('data', JSON.stringify(data));
        },
        updateCartTotal: function(price) {
            let data = JSON.parse(localStorage.getItem('data'));
            data.total += price;
            if(price < 0) {
                data.count -= 1;
            } else {
                data.count += 1;
            }
            localStorage.setItem('data', JSON.stringify(data));
        },
        deleteItem: function(data) {
            localStorage.setItem('data', JSON.stringify(data));
        }
    }

})()

const CartUICtrl = (function() {
    const selectors = {
        cartContainer: document.querySelector('.cart-items-container'),
        cartItemsCounter: document.querySelector('.items-count span'),
        priceTotal: document.querySelectorAll('.price-disc .order-total'),
        totalAmount: document.querySelectorAll('#totalAmount'),
        mainCartContainer: document.querySelector('.cart-items'),
    }
    return {
        addToCartView: function(item) {
            const markup = `    
            <div class="cart-item" name="item-${item.id}">
                <div class="photo">
                    <img src="img/jacket-2.jpg" alt="item">
                </div>
                <div class="disc">
                    <p>${item.name} ${item.category} ${item.color}</p>
                    <div class="details">
                        <div class="order-details">
                            <span>Ilosc: <span id="${item.id}-amount">${item.amount}</span></span>
                            <span>Kolor: ${item.color}</span>
                            <span>Rozmiar: ${item.size}</span>
                        </div>
                        <div class="price">
                            <span><span id="${item.id}-price">${item.totalPrice}</span> zł</span>
                        </div>
                    </div>
                </div>
            </div>`
            selectors.cartContainer.insertAdjacentHTML('beforeend', markup);
        },
        updateItem: function(item) {
            let itemAmount = document.getElementById(`${item.id}-amount`);
            let itemPrice = document.getElementById(`${item.id}-price`);

            itemAmount.innerHTML = item.amount;
            itemPrice.innerHTML = item.totalPrice;
        },
        updateCartSummary: function(cartData) {
            selectors.priceTotal.forEach(el => el.innerHTML = `${cartData.total} zł`);
            selectors.totalAmount.forEach(el => el.innerHTML = `${cartData.total + 8.99} zł`);
            selectors.cartItemsCounter.innerHTML = cartData.count;
        },
        addItemToMainCart: function(item) {
            const markup = `
            <div class="cart-item" name="item-${item.id}">
                <div class="photo">
                    <img src="img/jacket-2.jpg" alt="item">
                </div>
                <div class="disc">
                    <p>${item.name}</p>
                    <div class="details">
                        <span>Kolor: ${item.color}</span>
                        <span>Rozmiar: ${item.size}</span>
                    </div>
                </div>
                <div class="price">
                    <span id="${item.id}-price">${item.price}</span><span> zł</span>
                </div>
                <div class="amount">
                    <button id="${item.id}-reduce" class="reduce">-</button>
                    <input type="text" value ="${item.amount}" id="input-${item.id}-amount" min ="1">
                    <button id="${item.id}-add" class="add">+</button>
                </div>
                <div class="item-total">
                    <span>Suma: </span><span id="${item.id}-total">${item.totalPrice} zł</span>
                </div>
                <div class="delete-icon">
                    <button class="btn"id="${item.id}-delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>`
            selectors.mainCartContainer.insertAdjacentHTML('beforeend', markup);
        },
        updateMainCartItem: function(item) {
            document.getElementById(`${item.id}-total`).innerHTML = `${item.totalPrice} zł`;
        },
    }
})();

const CartCtrl = (function(CartUICtrl, StorageCtrl){
    const data = StorageCtrl.getItemsFromStorage();

    function populateCarts(data) {
        data.items.forEach((el, index) => {
            CartUICtrl.addToCartView(el);
            CartUICtrl.addItemToMainCart(el);

            const elAddBtn = document.querySelector(`#${el.id}-add`);
            const elInputAmount = document.getElementById(`input-${el.id}-amount`);
            elAddBtn.onclick = () => {
                el.amount += 1;
                el.totalPrice += el.price;
                data.count += 1;
                data.total += el.price;
                CartUICtrl.updateItem(el);
                CartUICtrl.updateCartSummary(data);
                elInputAmount.value = el.amount;
                CartUICtrl.updateMainCartItem(el);
                StorageCtrl.updateItem(el, index);
                StorageCtrl.updateCartTotal(el.price);
            }

            const elReduceBtn = document.getElementById(`${el.id}-reduce`);
            elReduceBtn.onclick = () => {
                if(el.amount == 1) {
                    return;
                } else {
                    el.amount -= 1;
                    el.totalPrice -= el.price;
                    data.count -= 1;
                    data.total -= el.price;
                    CartUICtrl.updateItem(el);
                    CartUICtrl.updateCartSummary(data);
                    elInputAmount.value = el.amount;
                    CartUICtrl.updateMainCartItem(el);
                    StorageCtrl.updateItem(el, index);
                    StorageCtrl.updateCartTotal(-el.price);
                }
            }

            const deleteBtn = document.getElementById(`${el.id}-delete`);
            deleteBtn.onclick = () => {
                Array.from(document.getElementsByName(`item-${el.id}`)).forEach(item => item.remove());
                const id = data.items.findIndex(item => item.id == el.id);
                data.items.splice(id, 1);
                data.count -= el.amount;
                data.total -= el.price * el.amount;
                CartUICtrl.updateCartSummary(data);
                StorageCtrl.deleteItem(data);       
            }
        });
        CartUICtrl.updateCartSummary(data);
    }
    return {
        init: function(){
            populateCarts(data);
        }
    }
})(CartUICtrl, StorageCtrl)

CartCtrl.init();