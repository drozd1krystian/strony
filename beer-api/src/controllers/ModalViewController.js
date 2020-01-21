import { selectors } from "../selectors";
import { hideModal, showModal, fillModal } from "../views/ModalView";

export function addModalListeners(beers) {
  selectors.items = Array.from(document.querySelectorAll("#beers .beer"));
  selectors.items.forEach((el, index) => {
    // document.getElementById(`${beers[index].id}-add`).onclick =

    el.onclick = () => {
      showModal();
      fillModal(beers[index]);
      document.querySelector(".exit").onclick = hideModal;
    };
  });
}
