const StorageCtrl = (function(){
  return {
      getItemFromStorage: function(itemId) {
          let item;
          if(localStorage.getItem(`${itemId}`) == null){
            window.location.replace("../dist/index.html");
            window.location.reload();
          } else {
              item = JSON.parse(localStorage.getItem(`${itemId}`));
          }
          return item;
      },
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
      updateStorage(data) {
          localStorage.setItem('data', JSON.stringify(data));
      }
  }
})()
const ItemCtrl = (function () {

  const Item = function(id, productId, name, size, price, amount, category, color) {
      this.id = id;
      this.productId = productId;
      this.name = name;
      this.size = size;
      this.price = price;
      this.amount = amount;
      this.totalPrice = price;
      this.category = category;
      this.color = color;
  }
  function createId() {
    return Math.random().toString(36).substring(2, 15) 
              + Math.random().toString(36).substring(2, 15);
  }
  function checkId(c) {
    return c.toUpperCase() != c.toLowerCase()
  }
  return {
      createItem: function(el, amount, size) {
          let id = createId();
          while(!checkId(id.charAt(0))) {
              id = createId();
          }
          return new Item(id, el.id, el.name, size, el.price, amount, el.category, el.color);
      }
  }
})();
const UICtrl = (function() {
  const selectors = {
    cartContainer: document.querySelector('.cart-items-container'),
    cartItemsCounter: document.querySelector('.items-count span'),
    priceTotal: document.querySelectorAll('.price-disc .order-total'),
    totalAmount: document.querySelectorAll('#totalAmount'),
    itemContainer: document.querySelector("#single-item .container"),
    noSizeError: document.querySelector('.no-size-error'),
  }

  return {
    fillItemData(item) {
      let sizesMarkup = '';
      item.sizes.forEach(el => {
        sizesMarkup += `
        <li>
          <div class="label" id ="${el}-label">
            <input type="radio" name="${item.id}-size" value ="${el}" id="${el}">
            <label for="${el}">${el}</label>
          </div>
        </li>`
      })
      const markup = `
      <div class="single-item" id ="${item.id}"> 
        <div class="gallery">
          <img src="img/jacket-2.jpg" alt="item">
          <img src="img/jacket-1.jpg" alt="item">
          <img src="img/jacket-3.jpg" alt="item">
          <img src="img/jacket-2.jpg" alt="item">
          <img src="img/jacket-1.jpg" alt="item">
        </div>
        <div class="slider">
          <div class="arrow-left">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="photo" id = "main-photo">
            <img src="img/jacket-2.jpg" alt="item">
          </div>
          <div class="arrow-right">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        <div class="disc">
            <h1>${item.name} ${item.category} ${item.color}</h1>
            <div class="rating-price">
                <div class="stars">
                  <div class="star">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="star">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="star">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="star">
                    <i class="fas fa-star"></i>
                  </div>
                  <div class="star">
                    <i class="fas fa-star"></i>
                  </div>
                </div>
                <div class="price">
                    <h1 id = "${item.id}-item-price">${item.price} zł</h1>
                </div>
            </div>
            <div class="sizes">
                <ul class="size-list">
                  ${sizesMarkup}
                </ul>
            </div>
            <div class="amount">
              <div class="reduce">-</div>
              <input type="text" value="1" id="${item.id}-amount">
              <div class="add">+</div>
            </div>
            <div class="btn-add">
                <button class ="btn">DODAJ DO KOSZYKA</button>
            </div>
        </div>
      </div>
      <div class="item-disc">
        <h3>Opis produktu:</h3>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, incidunt? Eos, nisi mollitia? Voluptatem illo nisi dolor praesentium voluptas autem.
      </div>`;
      selectors.itemContainer.insertAdjacentHTML('afterbegin', markup);
    },
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
    updateAmountAndPrice: function(amount, price, selector) {
      price = `${price * amount} zł`;
      selector.itemAmount.value = amount;
      selector.itemPrice.innerHTML = price;
    },
    getSelectors: function() {
      return selectors;
    }
  }
})()

const CartCtrl = (function(StorageCtrl) {
  const data = StorageCtrl.getItemsFromStorage();

  return {
      addToCart: function(item, amount) {
              data.items.push(item);
              data.total += item.price * amount;
              data.count += amount;
              StorageCtrl.updateStorage(data);
      },
      updateItem: function(id, amount) {
          data.items[id].amount += amount;
          data.items[id].totalPrice = data.items[id].amount * data.items[id].price;
          data.total += data.items[id].price * amount;
          data.count += amount;
          StorageCtrl.updateStorage(data);
      },
      returnData: function() {
          return data;
      }
  }
})(StorageCtrl);

const SingleItemCtrl = (function(UICtrl, StorageCtrl, CartCtrl, ItemCtrl) {
  let itemId;
  let itemData;
  let cartData;
  const selectors = UICtrl.getSelectors();
  cartData = CartCtrl.returnData();

  function getItemId() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    return id;
  }
  function getDataFromStorage(){
    itemId = getItemId();
    itemData = StorageCtrl.getItemFromStorage(itemId);
  }

  function setSelectors() {
    selectors.itemSizeButtons = Array.from(document.getElementsByName(`${itemId}-size`));
    selectors.itemAmount = document.getElementById(`${itemId}-amount`);
    selectors.itemPrice = document.querySelector(`#${itemId}-item-price`);
    selectors.sidePanel = document.querySelector('.single-item .disc');
  }

  function sizeButtonListener() {  
     selectors.itemSizeButtons.forEach(el => {
      el.onclick = () => {
        selectors.itemSizeButtons.forEach(btn => {
          document.querySelector(`#${btn.value}-label`).classList.remove('active');
        })
        const label = document.querySelector(`#${el.value}-label`)
        label.classList.add('active');
      }
    })
  }
  function checkIfPickedSize() {
    let value = selectors.itemSizeButtons.find(el => el.checked);
    return value != undefined ? value.value : false;
  }
  
  function increaseAmount() {
    const inc = document.querySelector('.add');
    inc.onclick = () => {   
      let amount = parseInt(selectors.itemAmount.value); 
      amount += 1;
      UICtrl.updateAmountAndPrice(amount, itemData.price, selectors);
    }
  }

  function reduceAmount() {
    const dec = document.querySelector('.reduce');
    dec.onclick = () => {
      let amount = parseInt(selectors.itemAmount.value);
      if(amount > 1) {
        amount -= 1;
        UICtrl.updateAmountAndPrice(amount, itemData.price, selectors);
      }
    }
  }


  function addButtonListener() {
    const itemAddButton = document.querySelector('.btn-add button');
    itemAddButton.onclick = () => {
      const sizeSelected = checkIfPickedSize();
      if(!sizeSelected) {
        selectors.noSizeError.style.display = 'block';
        selectors.noSizeError.classList.add('error');
        setTimeout(() => selectors.noSizeError.style.display = 'none', 3000);
      }else {
        const amountToAdd = parseInt(selectors.itemAmount.value);
        const itemExistId = cartData.items.find(el => {
          if(el.id == itemId && sizeSelected == el.size){
            return el.id;
          } 
          return false;
        })
        if(itemExistId) {
          CartCtrl.updateItem(itemExistId, amountToAdd);
          UICtrl.updateItem(cartData.items[itemExistId]);
        } else {
          const item = ItemCtrl.createItem(itemData, amountToAdd, sizeSelected);
          UICtrl.addToCartView(item);
          CartCtrl.addToCart(item, amountToAdd);
      }
      UICtrl.updateCartSummary(cartData);
      }
    }
  }

  function appendChild(item, selector) {
    selector.innerHTML = '';
    let node = item.cloneNode(true);
    selector.appendChild(node);
  }
  function addSlaiderListener() {
    const prev = document.querySelector('.arrow-left i');
    const next = document.querySelector('.arrow-right i');
    const photo = document.querySelector('#main-photo');
    const imgList = document.querySelectorAll('.gallery img');
    let current = 0;

    prev.onclick = () => {
      if(current > 0) {
        current -= 1;
        appendChild(imgList[current], photo);  
      }
    }
    next.onclick = () => {
      if(current == imgList.length -1) {
        current = 0;
      }else {
        current += 1;
      }
      appendChild(imgList[current], photo);  
    }

    Array.from(imgList).forEach((el, index) => {
      el.onclick = () => {
        current = index;
        appendChild(imgList[current], photo);  
      }
    })
  }

  function windowListener() {
    const sidePanelOffset = selectors.sidePanel.offsetTop;
    window.addEventListener('scroll', () => {
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {      
      } else {
        makeSidePanellSticky(selectors.sidePanel, sidePanelOffset);
      } 
    })
  }
  function addListeners() {
    addButtonListener();
    sizeButtonListener();
    increaseAmount();
    reduceAmount();
    addSlaiderListener();
    windowListener();
  }

  function populateCart(cartData){
    cartData.items.forEach(el => UICtrl.addToCartView(el));
    UICtrl.updateCartSummary(cartData);
  }

  function makeSidePanellSticky(sidePanel, sidePanelOffset) {
    if (window.pageYOffset > sidePanelOffset - 35) {
        sidePanel.classList.add("sticky-right");
    } else {
        sidePanel.classList.remove("sticky-right");
    }
  }

  return {
    init: function() {
      getDataFromStorage();
      UICtrl.fillItemData(itemData);
      populateCart(cartData);
      setSelectors();
      addListeners();
    }
  }

})(UICtrl, StorageCtrl, CartCtrl, ItemCtrl)

SingleItemCtrl.init();