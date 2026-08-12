const input = document.getElementById("registrationNumber");
const validateButton = document.getElementById("validateBtn");
const resetButton = document.getElementById("resetBtn");
const result = document.getElementById("result");

function validateRegistrationNumber(registrationNumber) {
  if (typeof registrationNumber !== "string") {
    throw new Error("Please enter a valid registration number.");
  }

  const value = registrationNumber.trim();

  if (value === "") {
    throw new Error("Registration number should not be empty.");
  }

  if (value.length !== 10) {
    throw new Error("Registration number must be exactly 10 characters long.");
  }

  const stateCode = value.slice(0, 2);
  const districtCode = value.slice(2, 4);
  const seriesCode = value.slice(4, 6);
  const vehicleNumber = value.slice(6);

  if (!/^[A-Z]{2}$/.test(stateCode)) {
    throw new Error("The first 2 characters must be uppercase alphabets.");
  }

  if (!/^\d{2}$/.test(districtCode)) {
    throw new Error("The next 2 characters must be digits.");
  }

  if (!/^[A-Z]{2}$/.test(seriesCode)) {
    throw new Error("The next 2 characters must be uppercase alphabets.");
  }

  if (!/^\d{4}$/.test(vehicleNumber)) {
    throw new Error("The last 4 characters must be digits.");
  }

  return true;
}

function showResult(message, type) {
  result.textContent = message;
  result.className = `result ${type}`;
}

validateButton.addEventListener("click", () => {
  try {
    validateRegistrationNumber(input.value);
    showResult("Valid registration number.", "success");
  } catch (error) {
    showResult(error.message, "error");
  }
});

resetButton.addEventListener("click", () => {
  input.value = "";
  input.focus();
  showResult("", "result");
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    validateButton.click();
  }
});
