const imgs = Array.from(document.querySelectorAll("img"));

const next = document.querySelector(".right");
const prev = document.querySelector(".left");
const container = document.querySelector(".container");
let current = 0;

function moveSlide() {
  if (current == imgs.length) {
    current = 0;
    container.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    return;
  }
  container.scrollTo({
    top: 0,
    left: imgs[current].offsetLeft,
    behavior: "smooth"
  });
}

next.onclick = () => {
  current += 1;
  moveSlide();
};
prev.onclick = () => {
  current == 0 ? (current = imgs.length - 1) : (current -= 1);
  moveSlide();
};
