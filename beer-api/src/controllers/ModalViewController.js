import { selectors } from "../selectors";
import { hideModal, showModal, fillModal } from "../views/ModalView";
import { addFavorite, removeFavorite } from "../views/FavView";
import {
  addFavoriteToStorage,
  delFavoriteFromStorage
} from "./StorageController";
import { delFavoriteListener, checkIfInFavorites } from "./FavViewController";

export function addModalListeners(beers) {
  selectors.items = Array.from(document.querySelectorAll("#beers .beer"));
  selectors.items.forEach((el, index) => {
    el.onclick = () => {
      showModal();
      fillModal(beers[index]);
      document.querySelector(".exit").onclick = hideModal;
      const favModal = document.getElementById(`modal-fav-${beers[index].id}`);
      if (checkIfInFavorites(beers[index])) {
        favModal.classList.add("active");
      }
      favModal.onclick = function() {
        if (checkIfInFavorites(beers[index])) {
          removeFavorite(`fav-${beers[index].id}`);
          this.classList.remove("active");
          document
            .querySelector(`#add-${beers[index].id}`)
            .childNodes[1].classList.remove("active");
          delFavoriteFromStorage(beers[index]);
          return;
        }
        addFavorite(beers[index]);
        this.classList.add("active");
        delFavoriteListener(beers[index]);
        addFavoriteToStorage(beers[index]);
      };
    };
  });
}
