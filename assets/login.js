const loginForm = document.querySelector(".form-login-container");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#login-error");

const userData = JSON.parse(localStorage.getItem("users")) || [];

const addSS = (user) => {
  sessionStorage.setItem("userLoguedIn", JSON.stringify(user));
};

// INPUT VACIO -
const isEmptyField = (input) => {
  return !input.value.trim().length;
};

// VERIFICA SI EL EMAIL EXISTE  -
const isValidUser = (input) => {
  return userData.some((user) => user.email === input.value.trim());
};

//VERIFICA SI COINCIDE EL EMAIL CON CONTRASEÑA REGISTRADA -
const matchedPass = (input) => {
  const user = userData.find((user) => user.email === emailInput.value.trim());
  return user.pass === input.value.trim();
};

const inputErrorMessage = (msg) => {
  errorMessage.textContent = msg;
};

// CHEQUEO DE EMAIL REGISTRADO
const accountExists = () => {
  let valid = false;
  if (isEmptyField(emailInput)) {
    inputErrorMessage("Debe ingresar un correo electrónico");
    return;
  }
  if (!isValidUser(emailInput)) {
    inputErrorMessage("El correo electrónico es incorrecto");
    return;
  }
  if (isEmptyField(passwordInput)) {
    inputErrorMessage("Debe ingresar un constraseña");
    return;
  }
  if (!matchedPass(passwordInput)) {
    inputErrorMessage("La contraseña es incorrecta");
    return;
  }
  alert("Logueado");
  valid = true;
  errorMessage.textContent = "";
  return valid;
};

// CHEQUEAR TODO EL FORMULARIO
const login = (e) => {
  e.preventDefault();
  if (accountExists()) {
    const user = userData.find(
      (user) => user.email === emailInput.value.trim()
    );
    addSS(user);
    window.location.href = "/index.html";
  }
};

const init = () => {
  loginForm.addEventListener("submit", login);
};
init();
