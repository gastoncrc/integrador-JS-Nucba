const registrerForm = document.querySelector(".form-registrer-container");
const nameInput = document.querySelector("#name");
const surNameInput = document.querySelector("#surname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const phoneInput = document.querySelector("#phone");

const userData = JSON.parse(localStorage.getItem("user")) || [];

const addLS = () => {
  localStorage.setItem("users", JSON.stringify(userData));
};

// INPUT VACIO
const isEmptyField = (input) => {
  return !input.value.trim().length;
};

// INPUT ENTRE VALORES
const isValueBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

// INPUT SI EL EMAIL ES VALIDO
const isValidEmail = (input) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input.value.trim());
};

// VERIFICA SI EL EMAIL ESTA EN ARRAY DE USUARIOS
const isValidUser = (input) => {
  return userData.some((user) => user.email === input.value.trim());
};

// INPUT SI LA PASS ES VALIDA
const isValidPass = (input) => {
  const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passRegex.test(input.value.trim());
};

// INPUT SI EL PHONE ES VALIDO
const isValidPhone = (input) => {
  const phoneRegex = /^(?:(?:\+|00)?54)?(?:9)?[1-9]\d{7,11}$/;
  return phoneRegex.test(input.value.trim());
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

// CHEQUEO DEL CAMPO
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

// CHEQUEO DE EMAIL
const checkEmail = (input) => {
  let valid = false;
  if (isEmptyField(input)) {
    inputErrorMessage(input, "Debe ingresar un correo electrónico");
    return;
  }
  if (!isValidEmail(input)) {
    inputErrorMessage(input, "El correo electrónico es incorrecto");
    return;
  }
  if (isValidUser(input)) {
    inputErrorMessage(input, "El correo electrónico ya está registrado");
    return;
  }
  inputSucess(input);
  valid = true;
  return valid;
};

// CHEQUEO DE PASSWORD CORRECTA
const checkPass = (input) => {
  let valid = false;
  if (isEmptyField(input)) {
    inputErrorMessage(input, "Debe ingresar una contraseña");
    return;
  }
  if (!isValidPass(input)) {
    inputErrorMessage(
      input,
      "La contraseña debe contener al menos 8 caracteres, una mayúscula y un número"
    );
    return;
  }
  inputSucess(input);
  valid = true;
  return valid;
};

// CHEQUEO DE PHONE CORRECTO
const checkPhone = (input) => {
  let valid = false;
  if (isEmptyField(input)) {
    inputErrorMessage(input, "Debe ingresar un teléfono");
    return;
  }
  if (!isValidPhone(input)) {
    inputErrorMessage(input, "Debe ingresar un teléfono correcto");
    return;
  }
  inputSucess(input);
  valid = true;
  return valid;
};

// CHEQUEAR TODO EL FORMULARIO
const checkForm = (e) => {
  e.preventDefault();
  let isNameTrue = checkField(nameInput);
  let isSurNameTrue = checkField(surNameInput);
  let isEmailTrue = checkField(emailInput);
  let isPassTrue = checkField(passwordInput);
  let isPhoneTrue = checkField(phoneInput);

  let isFormTrue =
    isNameTrue && isSurNameTrue && isEmailTrue && isPassTrue && isPhoneTrue;

  if (isFormTrue) {
    userData.push({
      name: nameInput.value,
      surname: surNameInput.value,
      email: emailInput.value,
      pass: passwordInput.value,
      phone: phoneInput.value,
    });
    addLS(userData);
    alert("Te registraste correctamente");
    window.location.href = "login.html";
  }
};

const init = () => {
  nameInput.addEventListener("input", () => checkField(nameInput));
  surNameInput.addEventListener("input", () => checkField(surNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  passwordInput.addEventListener("input", () => checkPass(passwordInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
  registrerForm.addEventListener("submit", checkForm);
};
init();
