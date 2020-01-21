import {
  getFavoritesFromStorage,
  addFavoriteToStorage,
  delFavoriteFromStorage,
  getBeersFromStorage
} from "./StorageController";
import { addFavorite, removeFavorite } from "../views/FavView";
import { selectors } from "../selectors";

export function addFavorites() {
  const favBeers = getFavoritesFromStorage();

  favBeers.forEach(el => {
    addFavorite(el);
    delFavoriteListener(el);
    const beer = document.getElementById(`beer-${el.id}`);
    if (selectors.beersContainer.contains(beer)) {
      document
        .querySelector(`#add-${el.id}`)
        .childNodes[1].classList.add("active");
    }
  });
}

export function addFavoritesListeners(beers) {
  beers.forEach(el => {
    if (checkIfInFavorites(el)) {
      document
        .getElementById(`add-${el.id}`)
        .childNodes[1].classList.add("active");
    }
    document.querySelector(`#add-${el.id}`).onclick = function() {
      if (checkIfInFavorites(el)) {
        delIfInFavorites(el);
        delFavoriteFromStorage(el);
        return;
      }
      addFavorite(el);
      delFavoriteListener(el);
      this.childNodes[1].classList.add("active");
      addFavoriteToStorage(el);
    };
  });
}

export function delFavoriteListener(beer) {
  document.querySelector(`#del-${beer.id}`).onclick = function() {
    document
      .querySelector(`#add-${beer.id}`)
      .childNodes[1].classList.remove("active");
    removeFavorite(`fav-${beer.id}`);
    delFavoriteFromStorage(beer);
  };
}
function delIfInFavorites(beer) {
  document
    .querySelector(`#add-${beer.id}`)
    .childNodes[1].classList.remove("active");
  removeFavorite(`fav-${beer.id}`);
}

export function checkIfInFavorites(beer) {
  const item = document.querySelector(`#fav-${beer.id}`);
  return selectors.favContainer.contains(item);
}
