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
          scrollTop: $(hash).offset().top - 100
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
    const links = document.querySelectorAll('.links li a');

    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('toggle');
    })

    links.forEach(el => el.onclick = () => {
      nav.classList.toogle('active');
      burger.classList.toogle('toogle');
    })
    
  };
  navSlide();