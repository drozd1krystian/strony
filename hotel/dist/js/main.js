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

if (window.location.pathname.split("/")[2] == "index.html") {
  window.addEventListener("resize", detectmob);
  window.addEventListener("load", detectmob);
}
