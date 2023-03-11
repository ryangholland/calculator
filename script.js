const activeDisplay = document.querySelector(".display-active");

const numKeys = document.querySelectorAll("button[data-num]");
const opKeys = document.querySelectorAll("button[data-op]");
const equalsKey = document.querySelector("button[data-equals]");

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
    case "/":
      return divide(num1, num2);
    default:
      console.log("Operand problem");
      return "ERROR";
  }
}

function updateDisplay() {
  activeDisplay.textContent = calculator.displayVal;
}

function inputNumber(key) {
  if (!Number(calculator.displayVal)) {
    calculator.displayVal = key.dataset.num;
  } else {
    calculator.displayVal += key.dataset.num;
  }
}

function inputOperand(key) {
  if (!calculator.operand) {
    if (!Number(calculator.valOne))
      calculator.valOne = Number(calculator.displayVal);
    calculator.operand = key.dataset.op;
    calculator.displayVal = null;
  } else if (Number(calculator.displayVal)) {
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
  calculator.valTwo = 0;
  calculator.displayVal = 0;
}

const calculator = {
  displayVal: 0,
  valOne: 0,
  operand: null,
  valTwo: 0,
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
