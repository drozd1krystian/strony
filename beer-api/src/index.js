import { searchForBear } from "./controllers/SearchViewController";
import {
  addBeers,
  prevNextBtnCtrl,
  openModal
} from "./controllers/BeersViewController";
import { addFavorites, delFavorite } from "./controllers/FavViewController";
import { addToFavoritesFromModal } from "./controllers/ModalViewController";
const AppCtrl = (function() {
  return {
    init: function() {
      searchForBear();
      addBeers();
      prevNextBtnCtrl();
      addFavorites();
      openModal(); // Event delegation on beer container
      delFavorite(); // Event delegation on favorites container
      addToFavoritesFromModal(); // Event delegation Modal
    }
  };
})();

AppCtrl.init();
