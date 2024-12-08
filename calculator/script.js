// Get all buttons and the display screen element
const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');

let currentInput = '';
let previousInput = '';
let operator = null;

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Handle button clicks
function handleButtonClick(event) {
    const value = event.target.getAttribute('data-value');
    const action = event.target.getAttribute('data-action');

    if (action === 'calculate') {
        calculateResult();
    } else if (action === 'clear') {
        clearDisplay();
    } else {
        updateDisplay(value);
    }
}

// Update the display with the clicked value
function updateDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

// Clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.value = '';
}

// Perform the calculation
function calculateResult() {
    if (currentInput === '' || previousInput === '') {
        return;
    }

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === '*') {
        result = num1 * num2;
    } else if (operator === '/') {
        if (num2 === 0) {
            result = 'Error';
        } else {
            result = num1 / num2;
        }
    }

    // Show the result in the display
    display.value = result;

    // Reset values after calculation
    previousInput = result.toString();
    currentInput = '';
    operator = null;
}

// Handle operator input
function handleOperator(value) {
    if (currentInput === '') return; // Don't perform operation if there's no current input

    if (previousInput === '') {
        previousInput = currentInput;
        currentInput = '';
    }

    operator = value;
}

// Handle operator button click
buttons.forEach(button => {
    if (button.getAttribute('data-value') === '+' ||
        button.getAttribute('data-value') === '-' ||
        button.getAttribute('data-value') === '*' ||
        button.getAttribute('data-value') === '/') {

        button.addEventListener('click', () => handleOperator(button.getAttribute('data-value')));
    }
});