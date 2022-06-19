const form = document.getElementById("form");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");

let username = "";
let email = "";
let password = "";
let confirmPassword = "";

// Develop utility functions
function isEmpty(value) {
  return value === "" ? true : false;
}

function isBetween(length, min, max) {
  return length < min || length > max ? false : true;
}

function isEmailValid(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isPasswordSecure(password) {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
}

// Develop functions that show the error / success
function showError(input, message) {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
}

function showSuccess(input) {
  // get the form-field element
  const formField = input.parentElement;
  // add the success class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
}

// Develop input field validating functions

function checkUsername() {
  let valid = false;
  const min = 3;
  const max = 25;

  if (isEmpty(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
}

function checkEmail() {
  let valid = false;
  if (isEmpty(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Please enter a valid email address");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
}

function checkPassword() {
  let valid = false;
  if (isEmpty(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
}

function checkConfirmPassword() {
  let valid = false;
  if (isEmpty(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter password again");
  } else if (confirmPassword !== password) {
    showError(confirmPasswordEl, "Password do not match.");
    console.log(password, confirmPassword);
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
}

form.addEventListener("input", function (event) {
  const { value, name } = event.target;

  if (name === "username") {
    username = value;
    checkUsername(value);
  }
  if (name === "email") {
    email = value;
    checkEmail(value);
  }
  if (name === "password") {
    password = value;
    checkPassword(value);
  }
  if (name === "confirmPassword") {
    confirmPassword = value;
    checkConfirmPassword(value);
  }
  console.log(name, value);
});

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isUsernameValid = checkUsername(username),
    isEmailValid = checkEmail(email),
    isPasswordValid = checkPassword(password),
    isConfirmPasswordValid = checkConfirmPassword(confirmPassword);

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    document.querySelector(".container").innerHTML =
      "<p>Your form submitted successfully.</p>";
    console.log(username, email, password, confirmPassword);
  }
});
