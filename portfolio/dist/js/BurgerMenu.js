// Burger Menu
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".links");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("toggle");
  });
};

navSlide();

$(".links a").on("click", function() {
  $(".links").removeClass("active");
  $(".burger").removeClass("toggle");
});
