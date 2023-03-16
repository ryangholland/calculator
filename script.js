const activeDisplay = document.querySelector(".display-active");

const numKeys = document.querySelectorAll("button[data-num]");
const opKeys = document.querySelectorAll("button[data-op]");
const equalsKey = document.querySelector("button[data-equals]");
const clearKey = document.querySelector("button[data-clear]");
const decKey = document.querySelector("button[data-dec]");
const delKey = document.querySelector("button[data-del]");

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
  if (!calculator.displayVal) {
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

function inputDecimal() {
  if (calculator.displayVal === 0) {
    calculator.displayVal = "0.";
    activeDisplay.textContent = calculator.displayVal;
  } else if (calculator.displayVal.indexOf(".") === -1) {
    calculator.displayVal += ".";
    activeDisplay.textContent = calculator.displayVal;
  }
}

function handleBackspace() {
  if (!calculator.displayVal || calculator.displayVal === 0) {
    return;
  } else {
    valArr = calculator.displayVal.split("");
    valArr.pop();
    if (valArr.length > 0) {
      if (valArr[valArr.length - 1] === ".") valArr.pop();
      calculator.displayVal = valArr.join("");
    } else {
      calculator.displayVal = 0;
    }
  }

  if (!calculator.operand) {
    calculator.valOne = Number(calculator.displayVal);
  } else {
    calculator.valTwo = Number(calculator.displayVal);
  }
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

decKey.addEventListener("click", inputDecimal);

delKey.addEventListener("click", () => {
  handleBackspace();
  updateDisplay();
});

document.addEventListener("keyup", (e) => {
  clearKey.blur();

  if (e.key === "Enter") {
    equalsKey.click();
  }

  if (e.key === ".") {
    decKey.click();
  }

  if (e.key === "Escape") {
    clearKey.click();
  }

  if (e.key === "Delete") {
    delKey.click();
  }

  numKeys.forEach((key) => {
    if (key.dataset.num === e.key) {
      key.click();
    }
  });

  opKeys.forEach((key) => {
    if (key.dataset.op === e.key) {
      key.click();
    }
  });
});
