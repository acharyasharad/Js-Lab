const input = document.getElementById('textInput');
const button = document.getElementById('checkBtn');
const result = document.getElementById('result');

function isPalindrome(text) {
  const cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedText = cleanedText.split('').reverse().join('');
  return cleanedText === reversedText;
}

function checkPalindrome() {
  const value = input.value.trim();

  if (!value) {
    result.textContent = 'Please enter some text.';
    result.className = 'result';
    return;
  }

  if (isPalindrome(value)) {
    result.textContent = 'It is a palindrome.';
    result.className = 'result palindrome';
  } else {
    result.textContent = 'It is not a palindrome.';
    result.className = 'result not-palindrome';
  }
}

button.addEventListener('click', checkPalindrome);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkPalindrome();
  }
});
