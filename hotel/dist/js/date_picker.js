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

function calculateDays() {
  let checkInDate = new Date(checkIn.value);
  let checkOutDate = new Date(checkOut.value);
  let timeDiff = Math.abs(checkInDate.getTime() - checkOutDate.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  nights.value = diffDays;
  dateContainer.addEventListener("change", () => {
    checkInDate = new Date(checkIn.value);
    checkOutDate = new Date(checkOut.value);
    timeDiff = Math.abs(checkInDate.getTime() - checkOutDate.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    nights.value = diffDays;
  });
}
if (window.location.pathname.split("/")[2] != "index.html") {
  calculateDays();
}
