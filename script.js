const activeDisplay = document.querySelector(".display-active");

const numKeys = document.querySelectorAll("button[data-num]");
const opKeys = document.querySelectorAll("button[data-op]");
const equalsKey = document.querySelector("button[data-equals]");
const clearKey = document.querySelector("button[data-clear]");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operand, num1, num2) {
  switch (operand) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "divide":
      if (num2 == 0) {
        return "ERR: DIVBY0";
      } else {
        return divide(num1, num2);
      }
    default:
      console.log("Operand problem");
      return "ERROR";
  }
}

function updateDisplay() {
  let displayStr = calculator.displayVal.toString();

  // Check if displayStr contains a "."
  if (displayStr.indexOf(".") === -1) {
    // If it doesn't, max length is 12; reject any above 12
    if (displayStr.length > 12) displayStr = "ERR: BIG NUM";
  } else {
    // If it does, split the string on the "."
    let splitStr = displayStr.split(".");
    // Number left of "." has a max length of 10; reject any above 10
    if (splitStr.length > 10) {
      displayStr = "ERR: BIG NUM";
    } else {
      // Round the number to the right using as many decimal places as possible
      // Formula : 11 - num on left
      splitStr[1] = splitStr[1].slice(0, 11 - splitStr[0].length);
      // Make it into a number then back to a string to remove trailing zeroes
      let temp = Number(splitStr.join("."));
      displayStr = temp.toString();
    }
  }

  activeDisplay.textContent = displayStr;
}

function inputNumber(key) {
  if (!Number(calculator.displayVal)) {
    calculator.displayVal = key.dataset.num;
  } else {
    calculator.displayVal += key.dataset.num;
  }

  if (!calculator.operand) {
    calculator.valOne = Number(calculator.displayVal);
  } else {
    calculator.valTwo = Number(calculator.displayVal);
  }
}

function inputOperand(key) {
  if (!calculator.operand) {
    calculator.operand = key.dataset.op;
    calculator.displayVal = 0;
  } else if (calculator.displayVal !== null) {
    handleEquals();
    updateDisplay();
    resetSoft();
    calculator.operand = key.dataset.op;
  } else {
    calculator.operand = key.dataset.op;
  }
}

function handleEquals() {
  calculator.valTwo = Number(calculator.displayVal);

  let answer = operate(
    calculator.operand,
    calculator.valOne,
    calculator.valTwo
  );

  calculator.displayVal = answer;
}

function resetSoft() {
  calculator.valOne = Number(calculator.displayVal);
  calculator.operand = null;
  calculator.valTwo = null;
  calculator.displayVal = 0;
}

function resetHard() {
  resetSoft();
  calculator.valOne = null;
  updateDisplay();
}

const calculator = {
  displayVal: 0,
  valOne: null,
  operand: null,
  valTwo: null,
};

numKeys.forEach((key) => {
  key.addEventListener("click", () => {
    inputNumber(key);
    updateDisplay();
  });
});

opKeys.forEach((key) => {
  key.addEventListener("click", () => {
    inputOperand(key);
  });
});

equalsKey.addEventListener("click", (e) => {
  if (!calculator.operand) return;

  handleEquals();
  updateDisplay();
  resetSoft();
});

clearKey.addEventListener("click", resetHard);
