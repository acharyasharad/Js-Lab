const form = document.getElementById('registrationForm');

function populateBirthdayDropdowns() {
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');

  if (!daySelect || !monthSelect || !yearSelect) return;

  // Populate Days
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Populate Months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  // Populate Years
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

populateBirthdayDropdowns();


const requiredFields = [
  'firstname',
  'lastname',
  'username',
  'email',
  'website',
  'password',
  'repassword'
];

const fieldLabels = {
  firstname: 'Firstname',
  lastname: 'Lastname',
  username: 'Username',
  email: 'E-mail',
  website: 'Website',
  password: 'Password',
  repassword: 'Re-password'
};

function markInvalid(el, message = '') {
  el.classList.add('invalid');
  el.setAttribute('aria-invalid', 'true');

  let errorElement = el.parentElement?.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-text')) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-text';
    el.parentElement?.insertAdjacentElement('afterend', errorElement);
  }

  errorElement.textContent = message;
}

function clearInvalid(el) {
  el.classList.remove('invalid');
  el.setAttribute('aria-invalid', 'false');

  const next = el.parentElement?.nextElementSibling;
  if (next && next.classList.contains('error-text')) {
    next.textContent = '';
  }
}

function validateField(fieldName, customMessage = '') {
  const input = document.getElementById(fieldName);
  if (!input) return true;

  const value = input.value.trim();
  const required = requiredFields.includes(fieldName);

  if (required && !value) {
    markInvalid(input, customMessage || `${fieldLabels[fieldName]} is required.`);
    return false;
  }

  if (fieldName === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    markInvalid(input, 'Please enter a valid email address.');
    return false;
  }

  if (fieldName === 'website' && value && !/^https?:\/\//i.test(value)) {
    markInvalid(input, 'Website should begin with http:// or https://');
    return false;
  }

  if (fieldName === 'repassword' && value && value !== document.getElementById('password').value) {
    markInvalid(input, 'Passwords do not match.');
    return false;
  }

  clearInvalid(input);
  return true;
}

function validateBirthday() {
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');
  const selects = [day, month, year];

  let valid = true;
  selects.forEach((select) => {
    if (!select.value) {
      select.classList.add('invalid');
      valid = false;
    } else {
      select.classList.remove('invalid');
    }
  });

  if (!valid) {
    day.setCustomValidity('Please fill in the birthday details.');
    month.setCustomValidity('Please fill in the birthday details.');
    year.setCustomValidity('Please fill in the birthday details.');
  } else {
    day.setCustomValidity('');
    month.setCustomValidity('');
    year.setCustomValidity('');
  }

  return valid;
}

requiredFields.forEach((name) => {
  const field = document.getElementById(name);
  if (!field) return;

  field.addEventListener('blur', () => validateField(name));
  field.addEventListener('input', () => clearInvalid(field));
});

['day', 'month', 'year'].forEach((id) => {
  const field = document.getElementById(id);
  field.addEventListener('change', () => {
    if (field.value) {
      field.classList.remove('invalid');
    } else {
      field.classList.add('invalid');
    }
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isBirthdayValid = validateBirthday();
  let allValid = isBirthdayValid;

  requiredFields.forEach((name) => {
    const ok = validateField(name);
    allValid = allValid && ok;
  });

  const agree = document.getElementById('agree');
  if (!agree.checked) {
    alert('You must agree to the terms and conditions before submitting.');
    allValid = false;
  }

  if (allValid) {
    alert('Form submitted successfully!');
    form.reset();
  }
});
