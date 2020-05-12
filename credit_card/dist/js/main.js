// Card Number
const cardNumberFields = Array.from(document.querySelectorAll(".number"));
let cardNumberField = document.getElementById("cardNumber");

function onCardNumberInput() {
  let cardNumber = cardNumberField.value;

  for (let i = 0; i < cardNumber.length; i++) {
    cardNumberFields[i].classList.add("fadeIn");
    cardNumberFields[i].innerHTML = cardNumber[i];
  }
  cardNumberFields[cardNumber.length].classList.remove("fadeIn");
  cardNumberFields[cardNumber.length].innerHTML = "#";
}
cardNumberField.addEventListener("input", onCardNumberInput);

// Card Name

const holderNameField = document.getElementById("holderName");
const cardNameField = document.getElementById("cardName");

function onCardNameInput() {
  holderNameField.classList.add("fadeOut");
  holderNameField.innerHTML = cardNameField.value;
}

cardNameField.addEventListener("input", onCardNameInput);

// Expiry Date

const expiryDateField = document.getElementById("expiryDate");
const expiryMonthField = document.getElementById("expirationMonth");
const expiryYearField = document.getElementById("expirationYear");
const expirationDateContainer = document.querySelector(".expiration_date");

function onExpiryDateChange() {
  let expiryMonth = expiryMonthField.value || "MM";
  let expiryYear = expiryYearField.value.substring(2) || "YY";
  let expiryDate = `${expiryMonth}/${expiryYear}`;

  expiryDateField.classList.add("fadeIn");
  expiryDateField.innerHTML = expiryDate;
  setTimeout(() => {
    expiryDateField.classList.remove("fadeIn");
  }, 300);
}

expirationDateContainer.addEventListener("change", onExpiryDateChange);
