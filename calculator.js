// Function to handle theme switch
document.getElementById('themeSwitch').addEventListener('change', function(event){
    document.body.classList.toggle('light-theme', event.target.checked);
  });
  
  let currentInput = '0';
  let currentOperation = null;
  
  function inputDigit(digit) {
    if (currentInput === '0') {
      currentInput = digit;
    } else {
      currentInput += digit;
    }
    updateScreen();
  }
  
  function inputOperator(operator) {
    // Implement operation logic
  }
  
  function updateScreen() {
    document.getElementById('calcScreen').innerText = currentInput;
  }
  
  function clearEntry() {
    currentInput = '0';
    updateScreen();
  }
  
  function toggleSign() {
    // Implement toggle sign logic
  }
  
  function percentage() {
    // Implement percentage logic
  }
  
  // Implement additional functionality as needed
  