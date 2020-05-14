// Card Number
const cardNumberFields = Array.from(document.querySelectorAll(".number"));
let cardNumberField = document.getElementById("cardNumber");

function onCardNumberInput() {
  let cardNumber = cardNumberField.value;

  for (let i = 0; i < cardNumber.length; i++) {
    if (isNaN(cardNumber[i])) {
      cardNumber = cardNumber.substring(0, i);
      cardNumberField.value = cardNumber;
      return;
    }
    cardNumberFields[i].classList.add("fadeIn");
    cardNumberFields[i].innerHTML = cardNumber[i];
  }

  for (let i = cardNumber.length; i < cardNumberFields.length; i++) {
    cardNumberFields[i].classList.remove("fadeIn");
    cardNumberFields[i].innerHTML = "#";
  }
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

// Backface
function flipCard() {
  const card = document.querySelector(".card");
  card.classList.toggle("is-flipped");
}

const cvvField = document.querySelector(".cvv_space");
function onCvvInput() {
  const cvv = CVV.value;
  cvvField.innerHTML = cvv;
}

CVV.addEventListener("focus", flipCard);
CVV.addEventListener("blur", flipCard);
CVV.addEventListener("input", onCvvInput);
