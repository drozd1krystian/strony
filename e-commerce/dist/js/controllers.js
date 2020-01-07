const ItemCtrl = (function () {

    const Item = function(id, name, size, price, amount, category, color) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.price = price;
        this.amout = amount;
        this.category = category;
        this.color = color;
    }

    const data = {
        items: [
            {id: 'a1', name: 'Kurtka Męska Trosso', sizes: ['M', 'L', 'XL'], price: 80, amout: 1, category: 'Jeansowa', color: 'Czerwona'},
            {id: 'a2', name: 'Kurtka Męska Trosso', sizes: ['M', 'XL'], price: 82, amout: 1, category: 'Skórzana', color: 'Czarna'},
            {id: 'a3', name: 'Kurtka Męska Trosso', sizes: ['L', 'XL'], price: 86, amout: 1, category: 'Przejściowa', color: 'Niebieska'},
            {id: 'a4', name: 'Kurtka Męska Trosso', sizes: ['L', 'XL'], price: 190, amout: 1, category: 'Jeansowa', color: 'Niebieska'},
            {id: 'a5', name: 'Kurtka Męska Trosso', sizes: ['L', 'XL'], price: 225, amout: 1, category: 'Skórzana', color: 'Czerwona'},
            {id: 'a6', name: 'Kurtka Męska Trosso', sizes: ['M', 'L', 'XL'], price: 230, amout: 1, category: 'Jeansowa', color: 'Czarna'},
            {id: 'a7', name: 'Kurtka Męska Trosso', sizes: ['M', 'L'], price: 52, amout: 2, category: 'Przejściowa', color: 'Czarna'},
            {id: 'a8', name: 'Kurtka Męska Trosso', sizes: ['M', 'XL'], price: 55, amout: 2, category: 'Przejściowa', color: 'Czerwona'},
            {id: 'a9', name: 'Kurtka Męska Trosso', sizes: ['M', 'L', 'XL'], price: 51, amout: 2, category: 'Skórzana', color: 'Niebieska'},
        ]
    }

    return {
        returnData: function() {
            return data;
        },
        createItem: function(el, selRadio) {
            const item = new Item(el.id, el.name, selRadio, el.price, 1, el.category, el.color);
            return item;
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
        cartItemsCounter: document.querySelector('.items-count span'),
        noSizeError: document.querySelector('.no-size-error'),
        categoryFilter: document.getElementsByName('category'),
        colorFilter: document.getElementsByName('color'),
        sizeFilter: document.getElementsByName('size'),
        filterButton: document.querySelectorAll('.filter-btn'),
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
                if(this.value > 300) {
                    this.value = 300;
                }
                selectors.priceRange.value = this.value;
            }
        },
        addItem: function(el) {
            let sizeMarkup = '';
            el.sizes.forEach(size => {
                sizeMarkup += `
                <li>
                    <input type="radio" name="size" id="${size}${el.id}" value="${size}">
                    <label for="${size}${el.id}"><span>${size}</span></label>
                </li>
                `
            })
            const item = 
            `<div class="item">
                <div class="photo">
                    <img src="img/jacket-2.jpg" alt="item">
                </div>
                <div class="disc">
                    <div class="name">
                        <h3>${el.name} ${el.category} ${el.color}</h3>
                    </div>
                    <div class="price">
                        <h3>${el.price} zł</h3>
                    </div>
                </div>
                <div class="add-btn">
                    <ul class="size-list" id="list-${el.id}">
                        ${sizeMarkup}
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
                    <p>${item.name} ${item.category} ${item.color}</p>
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
        updateCartSummary: function(cartData) {
            selectors.priceTotal.innerHTML = `${cartData.total} zł`;
            selectors.totalAmount.innerHTML = `${cartData.total + 8.99} zł`;
            selectors.cartItemsCounter.innerHTML = cartData.count;
        }
    }
})();

const CartCtrl = (function() {
    const data = {
        items: [],
        total: 0,
        count: 0,
    }

    return {
        addToCart: function(item) {
            data.items.push(item);
            data.total += item.price;
            data.count += 1;
        },
        returnData: function() {
            return data;
        }
    }
})();

const App = (function(ItemCtrl, UICtrl, CartCtrl) {
    const data = ItemCtrl.returnData();
    const selectors = UICtrl.getSelectors();
    const cartData = CartCtrl.returnData();

    function checkRadio(el) {
        let radioButtons = Array.from(document.querySelectorAll(`#list-${el} input[type="radio"]`));
        let value = radioButtons.find(el => el.checked);
        return value != undefined ? value.value : false;
    }
    function addItemsToView(items) {
        selectors.itemsContainer.innerHTML = '';
        items.forEach(el => {
            UICtrl.addItem(el);
            const addBtn = document.querySelector(`#${el.id}`);
            addBtn.onclick = () => {       
                const radioValue = checkRadio(el.id);  
                console.log(radioValue); 
                if(!radioValue) {
                    selectors.noSizeError.style.display = 'block';
                    selectors.noSizeError.classList.add('error');
                    setTimeout(() => selectors.noSizeError.style.display = 'none', 3000);
                }else {
                    const item = ItemCtrl.createItem(el, radioValue);
                    UICtrl.addToCartView(item);
                    CartCtrl.addToCart(item);
                    UICtrl.updateCartSummary(cartData);
                }
            };
        })
    }
    function filterItems() {
        let categoryFilter = Array.from(selectors.categoryFilter).map(el => {return el.checked ? el.value : false}).filter(el => el != false);
        let colorFIlter = Array.from(selectors.colorFilter).map(el => {return el.checked ? el.value : false}).filter(el => el != false);
        let sizeFilter = Array.from(selectors.sizeFilter).map(el => {return el.checked ? el.value : false}).filter(el => el != false);
        let priceFilter = selectors.priceRange.value;
        let filteredItems = [];

        if(sizeFilter.length == 0 && categoryFilter.length == 0 && colorFIlter.length == 0){
            filteredItems = data.items;
            addItemsToView(filteredItems);
            return;
        }

        if(categoryFilter.length > 0) {        
            filteredItems = data.items.filter(el => categoryFilter.some(cat => el.category == cat));
        }

        if(sizeFilter.length > 0 && filteredItems.length == 0) {
            filteredItems = data.items.filter(el => sizeFilter.some(size => el.sizes.some(s => s == size)));
        }else if(sizeFilter > 0){
            filteredItems = filteredItems.filter(el => sizeFilter.some(size => el.sizes.some(s => s == size)));
        }

        if(colorFIlter.length > 0 && filteredItems.length == 0) {
            filteredItems = data.items.filter(el => colorFIlter.some(col => el.color == col));
        }else if(colorFIlter.length > 0) {
            filteredItems = filteredItems.filter(el => colorFIlter.some(col => el.color == col));
        }

        if(filteredItems.length > 0 && priceFilter != 300) {
            filteredItems = filteredItems.filter(el => el.price <= priceFilter);
        }else if(priceFilter != 300 && filteredItems.length == 0) {
            filteredItems = data.items.filter(el => el.price <= priceFilter);
        }
        addItemsToView(filteredItems);
    }

    return {
        init: function() {
            UICtrl.updatePriceRange();
            addItemsToView(data.items);
            selectors.filterButton.forEach(el => el.onclick = filterItems);
        }
    }
})(ItemCtrl, UICtrl, CartCtrl);

App.init();