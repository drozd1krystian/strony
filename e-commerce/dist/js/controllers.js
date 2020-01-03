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
            {id: 1, name: 'Bluza Męska Trosso', size: 'M', price: 80, amout: 1, category: 'bluza', color: 'czerwony'},
            {id: 2, name: 'Kurtka Niebieska Męska', size: 'XL', price: 220, amout: 1, category: 'kurtka', color: 'niebieski'},
            {id: 3, name: 'Sweter Męski Niebieski', size: 'L', price: 50, amout: 2, category: 'sweter', color: 'czerwony'},
        ],
        currentItem: null,
        total: 0,
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
    }

    return {
        updatePriceRange: function() {
            selectors.priceRange.oninput = function () {
                selectors.maxPriceValue.value = this.value;
            }
            selectors.maxPriceValue.oninput = function() {
                selectors.priceRange.value = this.value;
            }
        },
        addItem: function(item) {
            selectors.itemsContainer.insertAdjacentHTML('beforeend', item);
        }
    }
})();

const App = (function(ItemCtrl, UICtrl) {
    const data = ItemCtrl.returnData();
    function addItemsToView() {
        data.items.forEach(el => {
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
                    <button class="btn" id="add">Dodaj Do Koszyka</button>
                </div>
            </div>`;
            UICtrl.addItem(item);
        })
    }

    return {
        init: function() {
            UICtrl.updatePriceRange();
            addItemsToView();
        }
    }
})(ItemCtrl, UICtrl);

App.init();