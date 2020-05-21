// Smooth Scrolling
$(".content .left a").on("click", function(event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;
    function detectmob() {
      if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
      } else {
        return false;
      }
    }
    if (detectmob()) {
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 100
        },
        800
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 100
        },
        800
      );
    }
  }
});
