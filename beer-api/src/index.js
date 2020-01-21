import { addSearchListeners } from "./controllers/SearchViewController";
import { addBeers, prevNextBtnCtrl } from "./controllers/BeersViewController";
import { addFavorites } from "./controllers/FavViewController";
const AppCtrl = (function() {
  return {
    init: function() {
      addSearchListeners();
      addBeers();
      prevNextBtnCtrl();
      addFavorites();
    }
  };
})();

AppCtrl.init();
