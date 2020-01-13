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
  if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
      makeSticky();
  }else {
    wideScreenSticky();
  }
};
let sticky = menuBasket.offsetTop;

function makeSticky() {
  if (window.pageYOffset > sticky) {
    menuBasket.classList.add("sticky");
    document.body.style.paddingTop =`${sticky - 60}px`;
  } else {
    menuBasket.classList.remove("sticky");
    document.body.style.paddingTop =`0`;
  }
}

const menu = document.querySelector('#menu');
let wideSticky = menu.offsetTop;

function wideScreenSticky() {
  if (window.pageYOffset > wideSticky) {
    menu.classList.add("wide-sticky");
    document.body.style.paddingTop =`${wideSticky - 15}px`;
  } else {
    menu.classList.remove("wide-sticky");
    document.body.style.paddingTop =`0`;
  }
}