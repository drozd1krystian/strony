import { selectors } from "../selectors";

export function showModal() {
  selectors.modal.classList.add("fadein");
  selectors.beer.classList.add("fadein");
}

export function hideModal() {
  selectors.beer.classList.remove("fadein");
  selectors.beer.classList.add("fadeout");

  selectors.modal.classList.remove("fadein");
  selectors.modal.classList.add("fadeout");

  setTimeout(() => {
    selectors.beer.classList.remove("fadeout");
    selectors.modal.classList.remove("fadeout");
  }, 400);
}

export function fillModal(beer) {
  selectors.beer.innerHTML = "";
  const markup = `
  <div class="wrapper p-1">
    <div class="beer">
      <div class="photo p-1">
          <img src="${beer.image_url}" alt="beer">
      </div>
      <div class="disc p-1">
          <div class="title">
              <span>${beer.name}</span>
              <i class="fas fa-star" id="modal-fav-${beer.id}"></i>   
          </div>
          <div class="about">
              <p class="pg py-1">${beer.description}</p c>
          </div>
          <div class="ingredients py-1">
              <h3>Ingredients: </h3>
                <h4>Malt: </h4>
                  ${makeIngredientsMarkup(beer.ingredients.malt)}
                <h4>Hops: </h4>
                ${makeIngredientsMarkup(beer.ingredients.hops)}
                <h4>Yeast: </h4>
                <p>${beer.ingredients.yeast} </p>
          </div>
          <div class="tips py-1">
              <h3>Brewing Tips:</h3>
              <p>${beer.brewers_tips}</p>
          </div>
          <div class="food-pairing py-1">
              <h3>Food Pairing:</h3>
              ${makeFoodPairingMarkup(beer.food_pairing)}
          </div>
      </div>
    </div>
  </div>
  <div class="exit">
    <i class="fas fa-times"></i>
  </div>
  `;
  selectors.beer.insertAdjacentHTML("beforeend", markup);
}

function makeIngredientsMarkup(data) {
  let markup = ``;
  data.forEach(el => {
    markup += `
    <ul>
      <li>- ${el.name}: ${el.amount.value} ${el.amount.unit}</li>               
    </ul>
    `;
  });
  return markup;
}

function makeFoodPairingMarkup(data) {
  let markup = ``;
  data.forEach(el => {
    markup += `
    <ul>
      <li>- ${el}</li>               
    </ul>
    `;
  });
  return markup;
}
