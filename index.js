// Password Strength Indicator
const indicator = document.querySelector(".indicator");
const input = document.querySelector("input");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
const showBtn = document.querySelector(".showBtn");
let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpIntermediate = /[A-Z\s]+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

let strongPassword =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/;
let mediumPassword =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{5,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

function StrengthChecker() {
  if (input.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
    text.style.display = "block";

    if (
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/.test(
        input.value
      )
    ) {
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.add("active");
      text.classList.add("strong");
      text.classList.remove("medium");
      text.textContent = "Your password is strong";
    } else if (
      /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{5,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(
        input.value
      )
    ) {
      strong.classList.remove("active");
      text.classList.remove("strong");
      weak.classList.add("active");
      medium.classList.add("active");
      text.textContent = "Your password is medium";
      text.classList.add("medium");
    } else {
      weak.classList.add("active");
      text.textContent = "Your password is too weak";
      text.classList.add("weak");
      medium.classList.remove("active");
      strong.classList.remove("active");
      text.classList.remove("medium");
      text.classList.remove("strong");
    }
    showBtn.style.display = "block";
    showBtn.onclick = function () {
      if (input.type == "password") {
        input.type = "text";
        showBtn.textContent = "HIDE";
        showBtn.style.color = "#23ad5c";
      } else {
        input.type = "password";
        showBtn.textContent = "SHOW";
        showBtn.style.color = "#000";
      }
    };
  } else {
    indicator.style.display = "none";
    text.style.display = "none";
    showBtn.style.display = "none";
  }
}

//  ////////////POLICY 1 JS/////////////////
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // No selected type
  if (typesCount === 0) {
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// ////// Policy 2 JS
const result2EL = document.getElementById("result-2");
const generate2EL = document.getElementById("generate-2");
const clipboard2 = document.getElementById("clipboard2");

wordArr1 = [
  "Red",
  "Orange",
  "yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
  "White",
  "Black",
  "Brown",
  "Purple",
  "Cyan",
];
wordArr2 = [
  "Melon",
  "Frog",
  "Giraffe",
  "Zebra",
  "Lion",
  "Tiger",
  "Ant",
  "Lamb",
  "Goat",
  "Moth",
  "fish",
  "Rat",
];
wordArr3 = [
  "Bread",
  "Card",
  "Candle",
  "Chair",
  "Moon",
  "Sun",
  "Star",
  "Spoon",
  "Cup",
  "Pot",
  "King",
  "Queen",
];

clipboard2.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result2EL.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

function generateThreeWord() {
  separator = getRandomSymbol();
  result =
    getFirstWord() +
    separator +
    getSecondWord() +
    separator +
    getThirdWord() +
    getRandomNumber();
  return result;
}

function getFirstWord() {
  return wordArr1[Math.floor(Math.random() * wordArr1.length)];
}

function getSecondWord() {
  return wordArr2[Math.floor(Math.random() * wordArr2.length)];
}

function getThirdWord() {
  return wordArr3[Math.floor(Math.random() * wordArr3.length)];
}

generate2EL.addEventListener("click", () => {
  result2EL.innerText = generateThreeWord();
});

// Policy 3 JS
const result3EL = document.getElementById("result-3");
const generate3EL = document.getElementById("generate-3");
const clipboard3 = document.getElementById("clipboard-3");
const input3 = document.getElementById("input3");
const showBtn3 = document.querySelector(".showBtn-3");

clipboard3.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result3EL.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

weakpassword = "";
function triggerThree() {
  if (input3.value != "") {
    showBtn3.style.color = "#23ad5c";
    showBtn3.style.display = "block";
    showBtn3.onclick = function () {
      if (input3.type == "password") {
        input3.type = "text";
        showBtn3.textContent = "HIDE";
        showBtn3.style.color = "#23ad5c";
      } else {
        input3.type = "password";
        showBtn3.textContent = "SHOW";
        showBtn3.style.color = "#000";
      }
    };
  } else {
    text.style.display = "none";
    showBtn3.style.display = "none";
  }
}

function generateStrongPassword(weakpassword) {
  index = Math.floor(Math.random() * weakpassword.length - 1);
  separator = getRandomSymbol();
  mutIndex1 = weakpassword.replace(
    weakpassword.charAt(index + 0),
    weakpassword.charAt(index + 0).toUpperCase()
  );
  mutIndex = mutIndex1.replace(
    mutIndex1.charAt(index + 1),
    mutIndex1.charAt(index + 1).toUpperCase()
  );
  strongPassword = mutIndex
    .split("")
    .map((item) => separator + item)
    .join("");

  return strongPassword;
}

generate3EL.addEventListener("click", () => {
  const weakpassword = document.getElementById("input3").value;
  result3EL.innerText = generateStrongPassword(weakpassword);
});
