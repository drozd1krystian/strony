function detectmob() {
  const datepicker = document.querySelector(".date-container");
  const aboutSection = document.querySelector("#about .container");
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    const piker = datepicker.parentElement.removeChild(datepicker);
    aboutSection.insertBefore(piker, aboutSection.firstChild);
  } else {
    const showcase = document.querySelector("#showcase .container");
    datepicker.remove();
    showcase.appendChild(datepicker);
  }
}

let index = window.location.pathname.split("/");
if (index[index.length - 1].toString() == "index.html") {
  window.addEventListener("resize", detectmob);
  window.addEventListener("load", detectmob);
}

let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  let navBar = document.getElementById("navbar");

  if (prevScrollPos > currentScrollPos) {
    navBar.style.transform = "translateY(0)";
  } else {
    navBar.style.transform = "translateY(-100%)";
  }
  prevScrollPos = currentScrollPos;
};
