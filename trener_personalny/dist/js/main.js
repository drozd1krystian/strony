// Smooth Scrolling
$('#navbar a, .btn').on('click', function(event) {
  if(this.hash !== '') {
    event.preventDefault();
    
    const hash = this.hash;
    function detectmob() {
      if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
      } else {
        return false;
      }
   }
    if(detectmob()) {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
   }
   else {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 200
      },
      800
    );
   }   
  } 
});

const checkPrimary = () => {
  const elems = document.querySelectorAll('.secondary');
  const primary = document.getElementById('picked');
  elems.forEach(el => {
    el.onmouseover = () => {
      primary.classList.remove('picked');  
    }
  })
  elems.forEach(el => {
    el.onmouseout = () => {
      primary.classList.add('picked');
    }
  })
}
checkPrimary();


// Burger Menu
// const navSlide = () => {
//   const burger = document.querySelector('.burger');
//   const nav = document.querySelector('.links');

//   burger.addEventListener('click', () => {
//     nav.classList.toggle('active');
//     burger.classList.toggle('toggle');
//   })
// };

// navSlide();

// $( '.links a' ).on("click", function(){
//   $('.links').removeClass('active');
//   $('.burger').removeClass('toggle');
// });


// Slide show
let slideId = 1;
let slides = document.getElementsByClassName('showcase-content');


const nextSlide = (slide) => {
  slider(slideId += slide);
  clearInterval(autoSlide);
  autoSlide = setInterval(() => nextSlide(1), 4000);
}

let autoSlide = setInterval(() => nextSlide(1), 4000);

const slider = (slideNr) => {
  if (slideNr > slides.length) {slideId = 1}
  if (slideNr < 1) {slideId = slides.length}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideId-1].style.display = "block";
}
slider(slideId);
