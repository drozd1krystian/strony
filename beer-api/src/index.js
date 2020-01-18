const item = Array.from(document.querySelectorAll("#beers .beer"));
item.forEach(el => (el.onclick = showModal));
const modal = document.getElementById("beer-modal");
const beer = document.querySelector("#beer-modal .beer-container");
const exit = document.querySelector(".exit");

function showModal() {
  modal.classList.add("fadein");
  modal.style.opacity = "1";
  modal.style.zIndex = "10";
  modal.onclick = hideModal;

  beer.classList.add("fadein");

  exit.onclick = hideModal;
}

function hideModal() {
  beer.classList.remove("fadein");
  beer.classList.add("fadeout");
  modal.classList.remove("fadein");
  modal.classList.add("fadeout");

  setTimeout(() => {
    modal.style.opacity = "0";
    modal.style.zIndex = "-1";
    beer.classList.remove("fadeout");
    modal.classList.remove("fadeout");
  }, 300);
}

showModal();
