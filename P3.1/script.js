const loginForm = document.getElementById('loginForm');
const loginIdInput = document.getElementById('loginId');
const passwordInput = document.getElementById('password');
const loginIdError = document.getElementById('loginIdError');
const passwordError = document.getElementById('passwordError');

function validateLoginId(value) {
  return value.trim().length >= 3;
}

function validatePassword(value) {
  const lengthCheck = value.length >= 8;
  const uppercaseCheck = /[A-Z]/.test(value);
  const digitCheck = /[0-9]/.test(value);
  const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return lengthCheck && uppercaseCheck && digitCheck && specialCharCheck;
}

function updateError(element, isValid) {
  element.classList.toggle('visible', !isValid);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const loginIdValid = validateLoginId(loginIdInput.value);
  const passwordValid = validatePassword(passwordInput.value);

  updateError(loginIdError, loginIdValid);
  updateError(passwordError, passwordValid);

  if (loginIdValid && passwordValid) {
    alert('Login successful!');
    loginForm.reset();
    updateError(loginIdError, true);
    updateError(passwordError, true);
  }
});

loginIdInput.addEventListener('input', () => {
  updateError(loginIdError, validateLoginId(loginIdInput.value));
});

passwordInput.addEventListener('input', () => {
  updateError(passwordError, validatePassword(passwordInput.value));
});
