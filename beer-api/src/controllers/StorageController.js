export function getBeersFromStorage() {
  let beers = [];

  if (localStorage.getItem("beers") == null) {
    return beers;
  } else {
    beers = JSON.parse(localStorage.getItem("beers"));
    return beers;
  }
}

export function addBeersToStorage(beers) {
  if (localStorage.getItem("beers") == null) {
    localStorage.setItem("beers", JSON.stringify(beers));
  } else {
    let data = JSON.parse(localStorage.getItem("beers"));
    data.push(...beers);
    localStorage.setItem("beers", JSON.stringify(data));
  }
}

export function addFavoriteToStorage(beer) {
  let favBeers = [];
  if (localStorage.getItem("favBeers") == null) {
    favBeers.push(beer);
    localStorage.setItem("favBeers", JSON.stringify(favBeers));
  } else {
    favBeers = JSON.parse(localStorage.getItem("favBeers"));
    favBeers.push(beer);
    localStorage.setItem("favBeers", JSON.stringify(favBeers));
  }
}

export function delFavoriteFromStorage(id) {
  let favBeers = [];
  favBeers = JSON.parse(localStorage.getItem("favBeers"));
  let el = favBeers.findIndex(el => el.id == id);
  favBeers.splice(el, 1);
  localStorage.setItem("favBeers", JSON.stringify(favBeers));
}

export function getFavoritesFromStorage() {
  let favBeers = [];

  if (localStorage.getItem("favBeers") == null) {
    return favBeers;
  } else {
    favBeers = JSON.parse(localStorage.getItem("favBeers"));
    return favBeers;
  }
}
