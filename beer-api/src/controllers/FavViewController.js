import {
  getFavoritesFromStorage,
  addFavoriteToStorage,
  delFavoriteFromStorage
} from "./StorageController";
import { addFavorite, removeFavorite } from "../views/FavView";
import { selectors } from "../selectors";

export function addFavorites() {
  const favBeers = getFavoritesFromStorage();
  favBeers.forEach(el => {
    addFavorite(el);
    delFavoriteListener(el);
    document
      .querySelector(`#add-${el.id}`)
      .childNodes[1].classList.add("active");
  });
}

export function addFavoritesListeners(beers) {
  beers.forEach(el => {
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

function delFavoriteListener(beer) {
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

function checkIfInFavorites(beer) {
  const item = document.querySelector(`#fav-${beer.id}`);
  return selectors.favContainer.contains(item);
}
