const StorageCtrl = (function() {
  return {
    storeItem: function(item) {
      let data;
      if (localStorage.getItem("data") == null) {
        data = {
          items: [],
          total: 0,
          count: 0
        };
        data.items.push(item);
        data.total += item.price;
        data.count += 1;
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        data = JSON.parse(localStorage.getItem("data"));
        data.items.push(item);
        data.total += item.price;
        data.count += 1;
        localStorage.setItem("data", JSON.stringify(data));
      }
    },
    updateItem: function(item, id) {
      let data = JSON.parse(localStorage.getItem("data"));
      data.items[id] = item;
      data.total += item.price;
      data.count += 1;
      localStorage.setItem("data", JSON.stringify(data));
    },
    getItemsFromStorage: function() {
      let data;
      if (localStorage.getItem("data") == null) {
        data = {
          items: [],
          total: 0,
          count: 0
        };
      } else {
        data = JSON.parse(localStorage.getItem("data"));
      }
      return data;
    },
    storePickedItem: function(item) {
      localStorage.setItem(`${item.id}`, JSON.stringify(item));
    }
  };
})();

const ItemCtrl = (function() {
  const Item = function(
    id,
    productId,
    name,
    size,
    price,
    amount,
    category,
    color
  ) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.size = size;
    this.price = price;
    this.amount = amount;
    this.totalPrice = price;
    this.category = category;
    this.color = color;
  };

  const data = {
    items: [
      {
        id: "a1",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "L", "XL"],
        price: 80,
        amount: 1,
        category: "Jeansowa",
        color: "Czerwona"
      },
      {
        id: "a2",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "XL"],
        price: 82,
        amount: 1,
        category: "Skórzana",
        color: "Czarna"
      },
      {
        id: "a3",
        name: "Kurtka Męska Trosso",
        sizes: ["L", "XL"],
        price: 86,
        amount: 1,
        category: "Przejściowa",
        color: "Niebieska"
      },
      {
        id: "a4",
        name: "Kurtka Męska Trosso",
        sizes: ["L", "XL"],
        price: 190,
        amount: 1,
        category: "Jeansowa",
        color: "Niebieska"
      },
      {
        id: "a5",
        name: "Kurtka Męska Trosso",
        sizes: ["L", "XL"],
        price: 225,
        amount: 1,
        category: "Skórzana",
        color: "Czerwona"
      },
      {
        id: "a6",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "L", "XL"],
        price: 230,
        amount: 1,
        category: "Jeansowa",
        color: "Czarna"
      },
      {
        id: "a7",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "L"],
        price: 52,
        amount: 1,
        category: "Przejściowa",
        color: "Czarna"
      },
      {
        id: "a8",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "XL"],
        price: 55,
        amount: 1,
        category: "Przejściowa",
        color: "Czerwona"
      },
      {
        id: "a9",
        name: "Kurtka Męska Trosso",
        sizes: ["M", "L", "XL"],
        price: 51,
        amount: 1,
        category: "Skórzana",
        color: "Niebieska"
      }
    ]
  };

  return {
    returnData: function() {
      return data;
    },
    createId() {
      return (
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      );
    },
    checkId(c) {
      return c.toUpperCase() != c.toLowerCase();
    },

    createItem: function(el, size) {
      let id = this.createId();
      while (!this.checkId(id.charAt(0))) {
        id = this.createId();
      }
      return new Item(
        id,
        el.id,
        el.name,
        size,
        el.price,
        1,
        el.category,
        el.color
      );
    }
  };
})();

const UICtrl = (function() {
  const selectors = {
    priceRange: document.getElementById("priceRange"),
    maxPriceValue: document.getElementById("max-price"),
    itemsContainer: document.querySelector(".items-container"),
    cartContainer: document.querySelector(".cart-items-container"),
    priceTotal: document.querySelector(".price-disc .total"),
    totalAmount: document.getElementById("totalAmount"),
    cartItemsCounter: document.querySelector(".items-count span"),
    noSizeError: document.querySelector(".no-size-error"),
    filtersContainer: document.querySelector(".filters"),
    categoryFilter: document.getElementsByName("category"),
    colorFilter: document.getElementsByName("color"),
    sizeFilter: document.getElementsByName("size"),
    filterButton: document.getElementById("filter-btn"),
    noItemsError: document.querySelector(".no-items"),
    mobileFilterBtn: document.getElementById("mobile-filter")
  };

  return {
    getSelectors: function() {
      return selectors;
    },
    updatePriceRange: function() {
      selectors.priceRange.oninput = function() {
        selectors.maxPriceValue.value = this.value;
      };
      selectors.maxPriceValue.oninput = function() {
        if (this.value > 300) {
          this.value = 300;
        }
        selectors.priceRange.value = this.value;
      };
    },
    addItem: function(el) {
      let sizeMarkup = "";
      el.sizes.forEach(size => {
        sizeMarkup += `
                <li>
                    <input type="radio" name="${el.id}-size" id="${size}${el.id}" value="${size}">
                    <label for="${size}${el.id}"><span>${size}</span></label>
                </li>
                `;
      });
      const item = `<div class="item" id="${el.id}">
                <div class="photo">
                   <a href="item.html?id=${el.id}" name ="${el.id}-link"> <img src="img/jacket-2.jpg" alt="item"></a>
                </div>
                <div class="disc">
                    <div class="name">
                        <a href="item.html?id=${el.id}"<h3>${el.name} ${el.category} ${el.color}</h3></a>
                    </div>
                    <div class="price">
                        <h3>${el.price} zł</h3>
                    </div>
                </div>
                <div class="add-btn" id="${el.id}-add">
                    <ul class="size-list" id="list-${el.id}">
                        ${sizeMarkup}
                    </ul>
                    <button class="btn">Dodaj Do Koszyka</button>
                </div>
            </div>`;
      selectors.itemsContainer.insertAdjacentHTML("beforeend", item);
    },
    addToCartView: function(item) {
      const markup = `    
            <div class="cart-item" id="${item.id}">
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
                            <span><span id="${item.id}-price">${item.price}</span> zł</span>
                        </div>
                    </div>
                </div>
            </div>`;
      selectors.cartContainer.insertAdjacentHTML("beforeend", markup);
    },
    updateCartSummary: function(cartData) {
      selectors.priceTotal.innerHTML = `${cartData.total} zł`;
      selectors.totalAmount.innerHTML = `${cartData.total + 8.99} zł`;
      selectors.cartItemsCounter.innerHTML = cartData.count;
    },
    updateItem: function(item) {
      let itemAmount = document.getElementById(`${item.id}-amount`);
      let itemPrice = document.getElementById(`${item.id}-price`);

      itemAmount.innerHTML = item.amount;
      itemPrice.innerHTML = item.totalPrice;
    }
  };
})();

const CartCtrl = (function(StorageCtrl) {
  const data = StorageCtrl.getItemsFromStorage();

  return {
    addToCart: function(item) {
      data.items.push(item);
      data.total += item.price;
      data.count += 1;
      StorageCtrl.storeItem(item);
    },
    updateItem: function(id) {
      data.items[id].amount += 1;
      data.items[id].totalPrice = data.items[id].amount * data.items[id].price;
      data.total += data.items[id].price;
      data.count += 1;
      StorageCtrl.updateItem(data.items[id], id);
    },
    returnData: function() {
      return data;
    }
  };
})(StorageCtrl);

const App = (function(ItemCtrl, UICtrl, CartCtrl) {
  const data = ItemCtrl.returnData();
  const selectors = UICtrl.getSelectors();
  const cartData = CartCtrl.returnData();

  function checkRadio(id) {
    let radioButtons = Array.from(
      document.querySelectorAll(`#list-${id} input[type="radio"]`)
    );
    let value = radioButtons.find(el => el.checked);
    return value != undefined ? value.value : false;
  }
  function addItemsToView(items) {
    selectors.itemsContainer.innerHTML = "";
    if (items.length == 0) {
      selectors.itemsContainer.appendChild(selectors.noItemsError);
      return;
    }
    selectors.itemsContainer.addEventListener("click", function(e) {
      target = e.target;
      let itemId;
      if (!target.matches("button")) {
        return;
      }
      itemId = target.closest(".item").id;
      const pickedSize = checkRadio(itemId);
      if (!pickedSize) {
        selectors.noSizeError.style.display = "block";
        selectors.noSizeError.classList.add("error");
        setTimeout(() => (selectors.noSizeError.style.display = "none"), 3000);
      } else {
        let itemExistId = cartData.items.findIndex(el => {
          if (el.productId == itemId && el.size == pickedSize) {
            return true;
          }
          return false;
        });
        if (itemExistId != -1) {
          CartCtrl.updateItem(itemExistId);
          UICtrl.updateItem(cartData.items[itemExistId]);
        } else {
          const itemData = data.items.find(el => el.id == itemId);
          const newItem = ItemCtrl.createItem(itemData, pickedSize);
          UICtrl.addToCartView(newItem);
          CartCtrl.addToCart(newItem);
        }
        UICtrl.updateCartSummary(cartData);
      }
      const links = document.getElementsByName(`${itemId}-link`);
      links.forEach(link => {
        link.onclick = () => {
          StorageCtrl.storePickedItem(el);
        };
      });
    });
    items.forEach(el => {
      UICtrl.addItem(el);
    });
  }
  function filterItems() {
    let categoryFilter = Array.from(selectors.categoryFilter)
      .map(el => {
        return el.checked ? el.value : false;
      })
      .filter(el => el != false);
    let colorFIlter = Array.from(selectors.colorFilter)
      .map(el => {
        return el.checked ? el.value : false;
      })
      .filter(el => el != false);
    let sizeFilter = Array.from(selectors.sizeFilter)
      .map(el => {
        return el.checked ? el.value : false;
      })
      .filter(el => el != false);
    let priceFilter = selectors.priceRange.value;
    let filteredItems = [];
    if (
      sizeFilter.length == 0 &&
      categoryFilter.length == 0 &&
      colorFIlter.length == 0 &&
      priceFilter == 300
    ) {
      filteredItems = data.items;
      addItemsToView(filteredItems);
      return;
    }

    if (categoryFilter.length > 0) {
      filteredItems = data.items.filter(el =>
        categoryFilter.some(cat => el.category == cat)
      );
    }

    if (sizeFilter.length > 0 && filteredItems.length == 0) {
      filteredItems = data.items.filter(el =>
        sizeFilter.some(size => el.sizes.some(s => s == size))
      );
    } else if (sizeFilter.length > 0) {
      filteredItems = filteredItems.filter(el =>
        sizeFilter.some(size => el.sizes.some(s => s == size))
      );
    }

    if (colorFIlter.length > 0 && filteredItems.length == 0) {
      filteredItems = data.items.filter(el =>
        colorFIlter.some(col => el.color == col)
      );
    } else if (colorFIlter.length > 0) {
      filteredItems = filteredItems.filter(el =>
        colorFIlter.some(col => el.color == col)
      );
    }

    if (filteredItems.length > 0 && priceFilter != 300) {
      filteredItems = filteredItems.filter(el => el.price <= priceFilter);
    } else if (priceFilter != 300 && filteredItems.length == 0) {
      filteredItems = data.items.filter(el => el.price <= priceFilter);
    }
    addItemsToView(filteredItems);
  }
  function addListeners() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      selectors.filterButton.onclick = () => {
        filterItems();
        selectors.filtersContainer.classList.toggle("height-auto");
      };
    } else {
      selectors.filterButton.onclick = filterItems;
      selectors.colorFilter.forEach(el => (el.onchange = filterItems));
      selectors.sizeFilter.forEach(el => (el.onchange = filterItems));
      selectors.categoryFilter.forEach(el => (el.onchange = filterItems));
    }
    selectors.mobileFilterBtn.onclick = () => {
      selectors.filtersContainer.classList.toggle("height-auto");
    };
  }

  function populateCart() {
    cartData.items.forEach(el => {
      UICtrl.addToCartView(el);
      UICtrl.updateCartSummary(cartData);
    });
  }

  return {
    init: function() {
      UICtrl.updatePriceRange();
      addItemsToView(data.items);
      addListeners();
      populateCart();
    }
  };
})(ItemCtrl, UICtrl, CartCtrl);

App.init();
