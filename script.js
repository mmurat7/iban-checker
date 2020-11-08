/* Get elements */
const input = document.querySelector("input[type='text']");
const form = document.querySelector("form");

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
  console.log(BigInt(valNumberTable.join('')) % 97n === 1n ? true : false);
}

const onlyAlphanumeric = (e) => {
  const regex = new RegExp('^[a-zA-Z0-9]+$');
  if (regex.test(e.target.value)) {
    lastValue = e.target.value;
  } else {
    e.target.value.length > 1 ? e.target.value = lastValue : e.target.value = '';
    return;
  }
}

/* Hook up the event listeners */
input.addEventListener('input', onlyAlphanumeric);
form.addEventListener('submit', isValid);
