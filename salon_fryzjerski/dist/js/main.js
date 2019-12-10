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

// Burger Menu
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.links');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
  })
};

navSlide();

$( '.links a' ).on("click", function(){
  $('.links').removeClass('active');
  $('.burger').removeClass('toggle');
});