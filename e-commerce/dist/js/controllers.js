const ItemCtrl = (function () {

    const Item = function(id, name, size, price, amount, category) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.price = price;
        this.amout = amount;
        this.category = category;
    }

    const data = {
        items: [
            {id: 'a1', name: 'Bluza Męska Trosso', size: 'M', price: 80, amout: 1, category: 'bluza', color: 'czerwony'},
            {id: 'a2', name: 'Kurtka Niebieska Męska', size: 'XL', price: 220, amout: 1, category: 'kurtka', color: 'niebieski'},
            {id: 'a3', name: 'Sweter Męski Niebieski', size: 'L', price: 50, amout: 2, category: 'sweter', color: 'czerwony'},
        ]
    }

    return {
        returnData: function() {
            return data;
        }
    }
})();

const UICtrl = (function () {
    const selectors = {
        priceRange: document.getElementById('priceRange'),
        maxPriceValue: document.getElementById('max-price'),
        itemsContainer: document.querySelector('.items-container'),
        cartContainer: document.querySelector('.cart-items-container'),
        priceTotal: document.querySelector('.price-disc .total'),
        totalAmount: document.getElementById('totalAmount'),
    }

    return {
        getSelectors: function() {
            return selectors;
        },
        updatePriceRange: function() {
            selectors.priceRange.oninput = function () {
                selectors.maxPriceValue.value = this.value;
            }
            selectors.maxPriceValue.oninput = function() {
                selectors.priceRange.value = this.value;
            }
        },
        addItem: function(el) {
            const item = 
            `<div class="item">
                <div class="photo">
                    <img src="img/jacket-2.jpg" alt="item">
                </div>
                <div class="disc">
                    <div class="name">
                        <h3>${el.name}</h3>
                    </div>
                    <div class="price">
                        <h3>${el.price} zł</h3>
                    </div>
                </div>
                <div class="add-btn">
                    <ul class="size-list">
                        <li>
                            <input type="checkbox" name="add-M" id="add-M">
                            <label for="add-M"><span>M</span></label>
                        </li>
                        <li>
                            <input type="checkbox" name="add-L" id="add-L">
                            <label for="add-L"><span>L</span></label>
                        </li>
                        <li>
                            <input type="checkbox" name="add-XL" id="add-XL">
                            <label for="add-XL"><span>XL</span></label>
                        </li>
                     </ul>
                    <button class="btn" id="${el.id}">Dodaj Do Koszyka</button>
                </div>
            </div>`;
            selectors.itemsContainer.insertAdjacentHTML('beforeend', item);
        },
        addToCartView: function(item) {
            const markup = `    
            <div class="cart-item">
                <div class="photo">
                    <img src="img/jacket-2.jpg" alt="item">
                </div>
                <div class="disc">
                    <p>Lorem, ipsum.</p>
                    <div class="details">
                        <div class="order-details">
                            <span>Ilosc: 1</span>
                            <span>Kolor: ${item.color}</span>
                            <span>Rozmiar: ${item.size}</span>
                        </div>
                        <div class="price">
                            <span>${item.price} zł</span>
                        </div>
                    </div>
                </div>
            </div>`
            selectors.cartContainer.insertAdjacentHTML('beforeend', markup);
        },
        updateCart: function(cartData) {
            selectors.priceTotal.innerHTML = `${cartData.total} zł`;
            selectors.totalAmount.innerHTML = `${cartData.total + 8.99} zł`;
        }
    }
})();

const CartCtrl = (function() {
    const data = {
        items: [],
        total: 0,
    }

    return {
        addToCart: function(item) {
            data.items.push(item);
            data.total += item.price;
        },
        returnData: function() {
            return data;
        }
    }
})();

const App = (function(ItemCtrl, UICtrl, CartCtrl) {
    const data = ItemCtrl.returnData();
    //const selectors = UICtrl.getSelectors();
    const cartData = CartCtrl.returnData();

    function addItemsToView() {
        data.items.forEach(el => {
            UICtrl.addItem(el);
            const addBtn = document.querySelector(`#${el.id}`);
            addBtn.onclick = () => {
                UICtrl.addToCartView(el);
                CartCtrl.addToCart(el);
                UICtrl.updateCart(cartData);
            };
        })
    }
    return {
        init: function() {
            UICtrl.updatePriceRange();
            addItemsToView();
        }
    }
})(ItemCtrl, UICtrl, CartCtrl);

App.init();