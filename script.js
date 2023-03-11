const activeDisplay = document.querySelector(".display-active");

const numKeys = document.querySelectorAll("button[data-num]");

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

const calculator = {
  displayVal: 0,
  valOne: 0,
  operand: null,
  valTwo: null,
};

console.log(numKeys);

numKeys.forEach((key) => {
  console.log(key.dataset.num);

  key.addEventListener("click", (e) => {
    if (!calculator.displayVal) {
      calculator.displayVal = key.dataset.num;
    } else {
      calculator.displayVal += key.dataset.num;
    }
    updateDisplay();
  });
});

function updateDisplay() {
  activeDisplay.textContent = calculator.displayVal;
}
