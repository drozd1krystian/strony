import { selectors } from "../selectors";

export function addBeer(beer) {
  const markup = `
    <div class="wrapper p-1" id="beer-${beer.id}">
      <div class="fav-icon" id="add-${beer.id}">
        <i class="fas fa-star"></i>
      </div>
      <div class="beer" >
        <div class="photo p-1">
            <img src="${beer.image_url}" alt="beer">
        </div>
        <div class="disc p-1">
            <div class="title">
                <span>${beer.name}</span>  
            </div>
            <div class="about">
                <p class="pg py-1">${reduceDesc(beer.description)}</p>
            </div>
        </div>
      </div>
    </div>
  `;
  selectors.beersContainer.insertAdjacentHTML("beforeend", markup);
}

function reduceDesc(str, length, ending) {
  if (length == null) {
    length = 170;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
