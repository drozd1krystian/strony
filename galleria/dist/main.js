const imgs = Array.from(document.querySelectorAll("img"));

const next = document.querySelector(".right");
const prev = document.querySelector(".left");
const container = document.querySelector(".container");
let current = 0;

function moveSlide(sign = "-") {
  console.log(current);
  if (current == imgs.length - 1) {
    current = 0;
    container.style.marginLeft = `${0}px`;
    return;
  }
  let offWidth = imgs[current].offsetWidth;
  let margin = 0;
  if (sign == "-") {
    margin = container.offsetLeft - offWidth - 5;
  } else {
    margin = container.offsetLeft + offWidth + 5;
  }
  console.log(margin, offWidth);
  container.style.marginLeft = `${margin}px`;
}

next.onclick = () => {
  moveSlide();
  current += 1;
};
prev.onclick = () => {
  moveSlide("+");
  current == 0 ? (current = 0) : (current -= 1);
};
