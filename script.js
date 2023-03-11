const activeDisplay = document.querySelector(".display-active");

const numKeys = document.querySelectorAll("button[data-num]");
const opKeys = document.querySelectorAll("button[data-op]");

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

const calculator = {
  displayVal: 0,
  valOne: 0,
  operand: null,
  valTwo: null,
};

numKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (!Number(calculator.displayVal)) {
      calculator.displayVal = key.dataset.num;
    } else {
      calculator.displayVal += key.dataset.num;
    }
    updateDisplay();
  });
});

opKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    calculator.valOne = calculator.displayVal;
    calculator.operand = key.dataset.op;
    calculator.displayVal = 0;
    console.log(calculator)
  });
});
