import axios from "axios";
import { selectors } from "../selectors";
import { getBeerName } from "../views/SearchView";
import { addBeers } from "./BeersViewController";

export function getBeers(page, pageSize) {
  return axios(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${pageSize}`
  );
}

async function getBeer(beerName = "random") {
  let endPoint = "";
  beerName == "random"
    ? (endPoint = "https://api.punkapi.com/v2/beers/random")
    : (endPoint = `https://api.punkapi.com/v2/beers?beer_name=${beerName}`);

  return axios(endPoint);
}

export function addSearchListeners() {
  selectors.searchBtn.onclick = () => {
    const beerName = getBeerName();
    let searchData = [];
    beerName == ""
      ? (searchData = getBeer())
      : (searchData = getBeer(beerName));
    addBeers(1, searchData.length, searchData);
  };
}
