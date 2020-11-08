/* Get elements */
const input = document.querySelector("input[type='text']");
const form = document.querySelector("form");

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

/* Hook up the event listeners */
form.addEventListener('submit', isValid);
