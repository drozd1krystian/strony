let today = new Date();
let nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

inDay.innerHTML = today.getDate();
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
  inMonth.innerHTML = nextMonth
    .toString()
    .split(" ")
    .slice(1, 2)
    .join("");
};
