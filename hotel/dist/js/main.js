let today = new Date();
let nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
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

inDay.innerHTML = `0${today
  .getDate()
  .toString()
  .slice(-2)}`;
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

  inMonth.innerHTML = today
    .toString()
    .split(" ")
    .slice(1, 2)
    .join("");
};

checkOut.valueAsDate = nextMonth;
outDay.innerHTML = new Date(
  today.getFullYear(),
  today.getMonth() + 2,
  0
).getDate();
outMonth.innerHTML = nextMonth
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

window.addEventListener("resize", detectmob);
