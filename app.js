const display = document.getElementById('display');
const numbers = document.getElementsByClassName('numbers');
const operations = document.getElementsByClassName('operations');
const operateButton = document.getElementById('operateButton');
const ACButton = document.getElementById('AC');
const changeSignButton = document.getElementById('changeSign');
const percentage = document.getElementById('percentage');

let storedNumber;
let displayNumber;
let currentOperation;
let isOperating;
let dotCounter;

const initialize = () => {
  storedNumber = 0;
  displayNumber = '0';
  currentOperation = '';
  isOperating = false;
  dotCounter = 0;
};

const DISPLAY_SIZE = 8;

const add = (a, b) => {
  return a + b;
}
const subtract = (a, b) => {
  return a - b;
}
const multiply = (a, b) => {
  return a * b;
}
const divide = (a, b) => {
  return a / b;
}

const operate = (operation, a, b) => {
  let result;
  switch (operation) {
    case '/':
      result = divide(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '+':
      result = add(a, b);
      break;
  }
  if (result.toString().length >= DISPLAY_SIZE) {
    result = +(Math.round(result + "e+6")  + "e-6");
  }
  return result;
}

const clearDisplay  = () => {
  displayNumber = '';
  display.innerHTML = ``;
}

const updateDisplay = (number) => {
  if (displayNumber.length < DISPLAY_SIZE) {
    const isDot = number == '.';
    if (isDot) {
      dotCounter++;
    }
    if (!(displayNumber == '0' && number == '0') && dotCounter <= 1) {
      if (displayNumber == '0' && number != '.') displayNumber = '';
      displayNumber += number;
      display.innerHTML = `${displayNumber}`;
    }
  }
}

const setCurrentOperation = (operation) => {
  currentOperation = operation;
}

const storeDisplayNumber = () => {
  storedNumber = display.innerHTML;
}

const showResult = () => {
  const result = (storedNumber) ? operate(currentOperation, parseFloat(storedNumber), parseFloat(displayNumber)) : displayNumber;
  storedNumber = 0;
  clearDisplay();
  updateDisplay(result);
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    const number = event.target.innerHTML;
    if (isOperating == true) {
      clearDisplay();
      isOperating = false;
    }
    updateDisplay(number);
  });
}

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener('click', (event) => {
    const operation = event.target.innerHTML;
    if (storedNumber) {
      showResult();
    }
    isOperating = true;
    setCurrentOperation(operation);
    storeDisplayNumber();
  });
}

operateButton.addEventListener('click', () => {
  showResult();
});

ACButton.addEventListener('click', () => {
  clearDisplay();
  display.innerHTML = `0`;
  initialize();
});

changeSignButton.addEventListener('click', () => {
  let result = '0';
  const isNegative = (displayNumber[0] != '-');
  if (isNegative && displayNumber != '0') {
    result = '-' + displayNumber;
    if (result.length >= DISPLAY_SIZE) {
      result = result.slice(0, -1);
    }
  }
  if (!isNegative) {
    result = displayNumber.substring(1);
  }
  clearDisplay();
  updateDisplay(result);
});

percentage.addEventListener('click', () => {
  if (displayNumber != '0') {
    let result = (displayNumber / 100).toString();
    if (result.length >= DISPLAY_SIZE) {
      result = result.slice(0, DISPLAY_SIZE);
    }
    clearDisplay();
    updateDisplay(result);
  }
});

initialize();
