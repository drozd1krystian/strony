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
        updateCartSummary: function(cartData) {
            selectors.priceTotal.forEach(el => el.innerHTML = `${cartData.total} zł`);
            selectors.totalAmount.forEach(el => el.innerHTML = `${cartData.total + 8.99} zł`);
            selectors.cartItemsCounter.innerHTML = cartData.count;
        },
    }
})();

const CartCtrl = (function(CartUICtrl, StorageCtrl){
    const data = StorageCtrl.getItemsFromStorage();

    function populateCarts(data) {
        data.items.forEach(el => {
            CartUICtrl.addToCartView(el);
        })
        CartUICtrl.updateCartSummary(data);
    }
    return {
        init: function(){
            populateCarts(data);
        }
    }
})(CartUICtrl, StorageCtrl)

CartCtrl.init();