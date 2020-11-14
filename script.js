/* Get elements */
const input = document.querySelector("input[type='text']");
const form = document.querySelector("form");
const validationInfo = document.querySelector('.info');

let lastValue;

/* Build out a function */
const isValid = (e) => {
  e.preventDefault();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const iban = input.value.toUpperCase();
  const valNumber = iban.slice(4, iban.length) + iban.slice(0, 4);
  const valNumberTable = [];

  for (let i = 0; i < valNumber.length; i++) {
    if (alphabet.includes(valNumber[i])) {
      valNumberTable.push(`${alphabet.indexOf(valNumber[i]) + 10}`);
    } else {
      valNumberTable.push(valNumber[i]);
    }
  }

  if (BigInt(valNumberTable.join('')) % 97n === 1n) {
    validationInfo.textContent = 'Your IBAN is correct!';
    validationInfo.classList.remove('wrong');
    validationInfo.classList.add('correct');
  } else {
    validationInfo.textContent = 'Your IBAN is wrong!';
    validationInfo.classList.remove('correct');
    validationInfo.classList.add('wrong');
  }
  input.value = '';
}

const onlyAlphanumeric = (e) => {
  const regex = new RegExp('^[a-zA-Z0-9]+$');
  if (regex.test(e.target.value)) {
    lastValue = e.target.value;
  } else {
    if (e.target.value.length > 1) {
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value = lastValue;
      e.target.selectionStart = start - 1;
      e.target.selectionEnd = end - 1;
    } else {
      e.target.value = ''
    }
  }
}

const pasteWithoutSpaces = (e) => {
  e.preventDefault();
  const start = e.target.selectionStart;
  const end = e.target.selectionEnd;
  const val = e.target.value;
  const pasteData = e.clipboardData.getData('text').split(' ').join('');
  input.value = val.slice(0, start) + pasteData + val.slice(end, val.length);
  lastValue = input.value;
  e.target.selectionStart = start + pasteData.length;
  e.target.selectionEnd = start + pasteData.length;
}

/* Hook up the event listeners */
input.addEventListener('input', onlyAlphanumeric);
input.addEventListener('paste', pasteWithoutSpaces);
form.addEventListener('submit', isValid);
