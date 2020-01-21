import { selectors } from "../selectors";

export function addFavorite(beer) {
  const markup = `
  <div class="wrapper p-1">
    <div class="beer" id ="fav-${beer.id}">
        <div class="photo">
            <img src="${beer.image_url}" alt="beer">
        </div>
        <div class="disc p-1">
            <div class="title">
                <span>${beer.name}</span>
                <i class="fas fa-trash" id ="del-${beer.id}"></i>
            </div>
        </div>
    </div>
  </div>`;
  selectors.favContainer.insertAdjacentHTML("beforeend", markup);
}

export function removeFavorite(id) {
  document.getElementById(id).parentElement.remove();
}
