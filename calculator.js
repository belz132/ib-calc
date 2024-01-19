// Toggle Themes
document.addEventListener("DOMContentLoaded", function() {
    const themeSwitch = document.getElementById("flexSwitchCheckDefault");
    const bodyElement = document.body;

    // Initialize the correct theme based on the switch's state
    updateTheme();    

    themeSwitch.addEventListener('change', updateTheme);

    function updateTheme() {
        if (themeSwitch.checked) {
            bodyElement.classList.add('dark-theme');
            bodyElement.classList.remove('light-theme');
        } else {
            bodyElement.classList.add('light-theme');
            bodyElement.classList.remove('dark-theme');
        }
    }
});

// Input by Clicking Buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        if (!isNaN(value)) {
            appendNumber(value);
        } else if (value === "AC") {
            clearDisplay();
        } else if (value === "+/-") {
            makeNegative();
        } else if (value === "%") {
            calculatePercentage();
        } else if (value === "C") {
            backspace();
        } else if (value === ".") {
            appendDecimal();
        } else if (value === "=") {
            calculateResult();
        }
        else {
            setOperation(value);
        }
        this.blur(); // Remove focus from the button
    });
});

// Input by Keyboard
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else {
        switch (event.key) {
            case '+':
                setOperation('+');
                break;
            case '-':
                setOperation('-');
                break;
            case '*':
                setOperation('x');
                break;
            case '/':
                setOperation('/');
                break;
            case 'Enter':
                calculateResult();
                break;
            case 'Backspace':
                backspace();
                break;
            case '.':
                appendDecimal();
                break;
            case 'Delete':
                clearDisplay();
                break;
            case 'Percentage':
                calculatePercentage();
                break;
        }
    }
});

// Variables
let resultDisplay = document.getElementById('result-display');
let historyDisplay = document.getElementById('history-display');
let currentNumber = '';
let previousNumber = '';
let operation = null;
let isCalculationPerformed = false; // Flag to track if a calculation was performed

// Function to input a number
function appendNumber(number) {
    if (isCalculationPerformed) {
        currentNumber = '';
        isCalculationPerformed = false;
        clearHistoryDisplay(); // When a new number is entered after a calculation was just performed, clear history display 
    }
    currentNumber += number;
    updateDisplay();
}

// Function to clear only 1 character
function backspace() {
    if (currentNumber.length === 1 || (isCalculationPerformed && currentNumber === '')) {
        clearDisplay(); // Clear everything if the current number is about to be emptied or a calculation was just performed
    } else {
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        updateDisplay();
    }
}

// Function to input a decimal point
function appendDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

// Function to convert a number to negative or back to positive again
function makeNegative() {
    if (currentNumber !== '') {
        if (currentNumber.startsWith('-')) {
            currentNumber = currentNumber.slice(1); // convert to positive if it's a negative
        } else {
            currentNumber = '-' + currentNumber;    // convert to negative if it's a positive
        }
    }
    updateDisplay();
}

// Function to calculate a percentaged value of a number
function calculatePercentage() {
    if (currentNumber !== '') {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
    }
    updateDisplay();
}

// Function to set the operator
function setOperation(op) {
    if (currentNumber === '' && !isCalculationPerformed) return;    // If the screen is empty or there is no prior operation, nothing will happen 
    if (previousNumber !== '' && !isCalculationPerformed) {         // If there is already an input number or prior operation, execute following codes
        calculateResult();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    isCalculationPerformed = false;
    updateDisplay();
    updateHistoryDisplay(false);
}

// Function to calculate the result of the operation. Nothing fancy.
function calculateResult() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;  // If there is no operand (input number), then nothing will happen

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    updateHistoryDisplay(true);
    currentNumber = result.toString();
    operation = null;
    previousNumber = '';
    isCalculationPerformed = true;
    updateDisplay();
}

// Function to update the upper, smaller screen
function updateHistoryDisplay(isResultShown) {
    if (isResultShown) {
        historyDisplay.value = `${previousNumber} ${operation} ${currentNumber} =`; // If true, display the operand 1, the operator, the operand 2 and an equal (=) sign 
    } else {
        historyDisplay.value = `${previousNumber} ${operation}`;                    // If false, display only operand 1 and the operator
    }
}

// Function to clear the upper, smaller screen
function clearHistoryDisplay() {
    historyDisplay.value = '';
}


// Function to update the main screen
function updateDisplay() {
    resultDisplay.value = currentNumber;
}

// Function to clear the main screen
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    isCalculationPerformed = false;
    updateDisplay();
    clearHistoryDisplay(); // Clearing the history display as well
}
