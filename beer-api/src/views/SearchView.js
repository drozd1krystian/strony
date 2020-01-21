import { selectors } from "../selectors";

export function getBeerName() {
  return selectors.searchValue.value;
}
