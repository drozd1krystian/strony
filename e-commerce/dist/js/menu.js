const displaySubMenu = (id) => {
  const element = document.querySelector(`#${id} .sub-menu`);
  element.classList.add('active-menu');
}
const hideSubMenu = (id) => {
  const element = document.querySelector(`#${id} .sub-menu`);
  element.classList.remove('active-menu');
}

// Burger menu
const burger = document.querySelector('.burger');
const subMenu = document.querySelectorAll('.main-link')
const mobileMenu = document.querySelector('#mobile-menu');
const menuBasket = document.querySelector('.menu-basket')

burger.addEventListener('click', () => {
  burger.classList.toggle('toggle');
  mobileMenu.classList.toggle('toogle-menu');
  menuBasket.classList.toggle('triangle');
})

subMenu.forEach(el => el.addEventListener('click', () => {
  const sibling = el.nextSibling.nextSibling;
  sibling.classList.toggle('active');
}))



window.onscroll = () => {
  makeSticky()
  wideScreenSticky();
};
let sticky = menuBasket.offsetTop;

function makeSticky() {
  if (window.pageYOffset > sticky) {
    menuBasket.classList.add("sticky");
  } else {
    menuBasket.classList.remove("sticky");
  }
}

const menu = document.querySelector('#menu');
let wideSticky = menu.offsetTop;

function wideScreenSticky() {
  if (window.pageYOffset > wideSticky) {
    menu.classList.add("wide-sticky");
  } else {
    menu.classList.remove("wide-sticky");
  }
}