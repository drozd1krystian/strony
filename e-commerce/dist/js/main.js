const displaySubMenu = (id) => {
  const element = document.querySelector(`#${id} .sub-menu`);
  element.classList.add('active-menu');
}
const hideSubMenu = (id) => {
  const element = document.querySelector(`#${id} .sub-menu`);
  element.classList.remove('active-menu');
}


const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const next = document.querySelector('.next-slide');
const prev = document.querySelector('.prev-slide');
const dots = document.querySelectorAll('.dot');

const showSlide = (s) => {
  slides[currentSlide].className = 'slide';
  dots[currentSlide].className = 'dot';

  currentSlide = (s + slides.length) % slides.length;

  slides[currentSlide].className = 'slide showing';
  dots[currentSlide].className = 'dot active';
}

const nextSlide = () => {
  showSlide(currentSlide + 1);
}

const prevSlide = () => {
  showSlide(currentSlide - 1);
}

const pauseSlider = () => {
  clearInterval(slideInterval);
}

let slideInterval = setInterval(nextSlide, 4000);

next.onclick = () => {
  pauseSlider();
  nextSlide();
}

prev.onclick = () => {
  pauseSlider();
  prevSlide();
}

const goToSlide = (n) => {
  showSlide(n);
}

const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// News
const container = document.querySelector('.items-container');
const items = document.querySelectorAll('.item');

let currentFirst = 0;
const showItem = (n) => {
  currentFirst += n;
  if(!isInViewport(items[items.length - 1])){
    container.style.left = `-${currentFirst * items[0].offsetWidth}px`;
  } else {
    container.style.left = 0;
    currentFirst = 0;
  }
}

const nextItem = document.querySelector('.next');
const prevItem = document.querySelector('.prev');

const showNextItem = () => showItem(1);
const showPrevItem = () => {
  currentFirst == 0 ? currentFirst = 0 : showItem(-1);
}   

nextItem.addEventListener('click', () => {
  clearInterval(itemInterval);
  showNextItem();
});

prevItem.addEventListener('click', () => {
  clearInterval(itemInterval);
  showPrevItem();
});

let itemInterval = setInterval(showNextItem, 1000);