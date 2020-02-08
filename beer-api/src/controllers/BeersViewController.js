import { getBeers } from "./SearchViewController";
import { addBeer } from "../views/BeersView";
import { hideModal, showModal, fillModal } from "../views/ModalView";
import { getBeersFromStorage, addBeersToStorage } from "./StorageController";
import { selectors } from "../selectors";
import { addToFavorites, checkIfInFavorites } from "./FavViewController";

export function addBeers(page = 1, pageSize = 27, data = []) {
  if (data.length == 0) {
    data = getBeersFromStorage();
    selectors.beersContainer.innerHTML = "";
    const startIndex = (page - 1) * pageSize;
    const totalItems = data.length;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    if (startIndex >= data.length) {
      getBeers(page, pageSize).then(beers => {
        beers.data.forEach(addBeer);
        addBeersToStorage(beers.data);
      });
    } else {
      data = data.slice(startIndex, endIndex + 1);
      data.forEach(addBeer);
    }
  } else if (data instanceof Promise) {
    data.then(beers => {
      selectors.beersContainer.innerHTML = "";
      beers.data.forEach(addBeer);
      selectors.nextBtn.style.display = "none";
    });
  }
}

export function prevNextBtnCtrl() {
  selectors.nextBtn.onclick = () => {
    selectors.prevBtn.value = parseInt(selectors.prevBtn.value) + 1;
    selectors.prevBtn.style.display = "initial";
    selectors.nextBtn.value = parseInt(selectors.nextBtn.value) + 1;
    addBeers(selectors.nextBtn.value);
  };

  selectors.prevBtn.onclick = () => {
    selectors.prevBtn.value = parseInt(selectors.prevBtn.value) - 1;
    if (selectors.prevBtn.value == 1) {
      selectors.prevBtn.style.display = "none";
    }
    selectors.nextBtn.value = parseInt(selectors.nextBtn.value) - 1;
    addBeers(selectors.prevBtn.value);
  };
}

export function openModal() {
  const beers = getBeersFromStorage();
  document.querySelector(".exit").onclick = hideModal;
  beerContainer.onclick = function(e) {
    const target = e.target;
    const beer = target.closest(".beer");
    if (!beer && target.tagName != "I") {
      return;
    }
    let id = beer
      ? beer.id.slice(5, 7)
      : target.parentElement.nextElementSibling.id.slice(5, 7);
    const data = beers.find(el => el.id == id);
    if (target.matches(".fa-star")) {
      addToFavorites(data, target);
      return;
    }
    showModal();
    fillModal(data);
    if (checkIfInFavorites(data)) {
      document.querySelector("#beer-modal .title i").classList.add("active");
    }
  };
}
