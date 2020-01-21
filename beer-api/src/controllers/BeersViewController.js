import { getBeers } from "./SearchViewController";
import { addBeer } from "../views/BeersView";
import { addModalListeners } from "../controllers/ModalViewController";
import { getBeersFromStorage, addBeersToStorage } from "./StorageController";
import { selectors } from "../selectors";
import { addFavoritesListeners } from "./FavViewController";

export function addBeers(page = 1, pageSize = 27, data = []) {
  if (data.length == 0) {
    data = getBeersFromStorage();
    selectors.beersContainer.innerHTML = "";
    const startIndex = (page - 1) * pageSize;
    const totalItems = data.length;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    console.log(data);
    if (startIndex >= data.length) {
      getBeers(page, pageSize).then(beers => {
        beers.data.forEach(addBeer);
        addBeersToStorage(beers.data);
        addModalListeners(beers.data);
        addFavoritesListeners(beers.data);
      });
    } else {
      data = data.slice(startIndex, endIndex + 1);
      data.forEach(addBeer);
      addModalListeners(data);
      addFavoritesListeners(data);
    }
  } else if (data instanceof Promise) {
    data.then(beers => {
      console.log(beers.data);
      selectors.beersContainer.innerHTML = "";
      beers.data.forEach(addBeer);
      addModalListeners(beers.data);
      addFavoritesListeners(beers.data);
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
