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
    const beer = document.getElementById(`beer-${el.id}`);
    if (selectors.beersContainer.contains(beer)) {
      document
        .querySelector(`#add-${el.id}`)
        .childNodes[1].classList.add("active");
    }
  });
}

export function addToFavorites(beer, target) {
  if (checkIfInFavorites(beer)) {
    removeFavorite(`fav-${beer.id}`);
    delFavoriteFromStorage(beer.id);
    target.classList.remove("active");
    return;
  }
  addFavorite(beer);
  target.classList.add("active");
  addFavoriteToStorage(beer);
}

export function delFavorite() {
  const favContainer = document.querySelector("#favorites .beer-container");
  favContainer.onclick = function(e) {
    const target = e.target;
    if (target.tagName == "I") {
      const beer = target.closest(".beer");
      const id = beer.id.slice(4);
      removeFavorite(`fav-${id}`);
      delFavoriteFromStorage(id);
      const beerInView = document.getElementById(`beer-${id}`);
      if (selectors.beersContainer.contains(beerInView)) {
        document
          .querySelector(`#add-${id}`)
          .childNodes[1].classList.remove("active");
      }
    }
  };
}

export function checkIfInFavorites(beer) {
  const item = document.querySelector(`#fav-${beer.id}`);
  return selectors.favContainer.contains(item);
}
