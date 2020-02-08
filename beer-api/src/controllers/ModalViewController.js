import { selectors } from "../selectors";

import { addFavorite, removeFavorite } from "../views/FavView";
import {
  addFavoriteToStorage,
  delFavoriteFromStorage,
  getBeersFromStorage
} from "./StorageController";
import { checkIfInFavorites } from "./FavViewController";

export function addToFavoritesFromModal() {
  const beers = getBeersFromStorage();
  const modal = document.querySelector("#beer-modal .beer-container");
  modal.onclick = function(e) {
    const target = e.target;
    if (target.tagName != "I") {
      return;
    }
    const id = target.id.split("-").slice(-1)[0];
    const containerItemIcon = document.querySelector(`#add-${id} i`);
    const beer = beers.find(el => el.id == id);
    if (checkIfInFavorites(beer)) {
      removeFavorite(`fav-${id}`);
      target.classList.remove("active");
      console.log(containerItemIcon);
      containerItemIcon.classList.remove("active");
      delFavoriteFromStorage(id);
      return;
    }
    addFavorite(beer);
    target.classList.add("active");
    addFavoriteToStorage(beer);
    containerItemIcon.classList.add("active");
  };
}
