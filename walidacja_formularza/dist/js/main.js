const inputs = Array.from(document.querySelectorAll("input"));
inputs.forEach(
  el =>
    (el.oninput = () => {
      if (el.value == "") {
        el.nextElementSibling.style.opacity = "1";
      } else {
        el.nextElementSibling.style.opacity = "0";
      }
    })
);

const buttons = Array.from(document.querySelectorAll(".change-btns a"));

buttons.forEach(
  el =>
    (el.onclick = function(e) {
      e.preventDefault();

      document.querySelector(".change-btns .active").classList.remove("active");
      this.classList.add("active");

      const target = this.getAttribute("href");
      const hideform = document.querySelector(`form:not(${target})`);

      hideform.classList.remove("fadeIn");
      hideform.classList.add("fadeOut");
      setTimeout(() => {
        hideform.style.display = "none";
      }, 400);
      activeForm = document.querySelector(target);
      setTimeout(() => {
        activeForm.style.display = "block";
      }, 401);
      setTimeout(() => {
        activeForm.classList.add("fadeIn");
        activeForm.classList.remove("fadeOut");
      });
    })
);
const forms = document.querySelectorAll("form");

Array.from(forms).forEach(
  form =>
    (form.oninput = () => {
      const button = document.querySelector(`#${form.id} button`);
      const valid = validateForm(form);
      if (valid && form.pass.value.length >= 5) {
        button.classList.add("active");
        button.removeAttribute("disabled");
      } else {
        button.classList.remove("active");
        button.disabled = true;
      }
    })
);
function validateForm(activeForm) {
  let confirm = "";
  const password = activeForm.pass.value;
  const email = activeForm.email.value;
  const validEmail = emailIsValid(email);
  if (activeForm.id == "sign-up") {
    confirm = activeForm.confirm.value;
    if (confirm != "" && password == confirm && validEmail) {
      return true;
    }
    return false;
  } else {
    if (validEmail) {
      return true;
    }
  }
  return false;
}

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}
