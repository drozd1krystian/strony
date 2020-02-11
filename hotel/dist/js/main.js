let today = new Date();
let tommorow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

checkIn.valueAsDate = today;
checkIn.setAttribute("min", checkIn.value);
inDay.innerHTML = ("0" + today.getDate()).slice(-2);
inMonth.innerHTML = today
  .toString()
  .split(" ")
  .slice(1, 2)
  .join("");

checkIn.onchange = () => {
  inDay.innerHTML = checkIn.value
    .toString()
    .split("-")
    .slice(2, 4)
    .join("");

  inMonth.innerHTML =
    months[
      checkIn.value
        .toString()
        .split("-")
        .slice(1, 2)
        .join("")
        .slice(1, 2) - 1
    ];
};

checkOut.valueAsDate = tommorow;
checkOut.setAttribute("min", checkOut.value);
outDay.innerHTML = tommorow.getDate();
outMonth.innerHTML = tommorow
  .toString()
  .split(" ")
  .slice(1, 2)
  .join("");

checkOut.onchange = () => {
  outDay.innerHTML = checkOut.value
    .toString()
    .split("-")
    .slice(2, 4)
    .join("");
  outMonth.innerHTML =
    months[
      checkOut.value
        .toString()
        .split("-")
        .slice(1, 2)
        .join("")
        .slice(1, 2) - 1
    ];
};

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
