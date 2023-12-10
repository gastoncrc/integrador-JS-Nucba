const registrerForm = document.querySelector(".form-registrer-container");
const nameInput = document.querySelector("#name");
const surNameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const phoneInput = document.querySelector("#phone");

// INPUT VACIO
const isEmptyField = (input) => {
  return !input.value.trim().length;
};

// INPUT ENTRE VALORES
const isValueBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const isValidEmail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input.value.trim());
};

// MOSTRAR ERRORES
const inputErrorMessage = (input, message) => {
  const inputField = input.parentElement;
  inputField.classList.remove("sucess-input");
  inputField.classList.add("error-input");
  const errorSmall = inputField.querySelector("small");
  errorSmall.textContent = message;
  console.log(errorSmall);
};

// INPUT CORRECTO
const inputSucess = (input) => {
  const inputField = input.parentElement;
  inputField.classList.remove("error-input");
  inputField.classList.add("sucess-input");
  const errorSmall = inputField.querySelector("small");
  errorSmall.textContent = "";
};

const checkField = (input) => {
  let verified = false;
  const MAX_CHAR_LENGTH = 30;
  const MIN_CHAR_LENGHT = 2;

  if (isEmptyField(input)) {
    inputErrorMessage(input, "Debe ingresar un nombre");
    return;
  }
  if (!isValueBetween(input, MIN_CHAR_LENGHT, MAX_CHAR_LENGTH)) {
    inputErrorMessage(
      input,
      `Debe ingresar entre ${MIN_CHAR_LENGHT} y ${MAX_CHAR_LENGTH} letras`
    );
    return;
  }
  inputSucess(input);
  verified = true;
  return verified;
};

const init = () => {
  nameInput.addEventListener("input", () => checkField(nameInput));
  surNameInput.addEventListener("input", () => checkField(surNameInput));
};
init();
