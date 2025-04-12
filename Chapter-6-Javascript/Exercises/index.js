
    // Track which input is currently active
    let activeInput = 'petrolCost';

    // Set the input being edited
    function setActiveInput(id) {
      activeInput = id;
    }

    // Append a number or decimal to the active input
    function appendNumber(num) {
      const input = document.getElementById(activeInput);
      input.value += num;
    }

    // Remove the last character in the active input
    function backspace() {
      const input = document.getElementById(activeInput);
      input.value = input.value.slice(0, -1);
    }

    // Clear both input fields and reset values
    function clearInputs() {
      document.getElementById("petrolCost").value = "1.72";
      document.getElementById("litersPurchased").value = "0";
      document.getElementById("totalCost").innerText = "Total: $0.00";
      activeInput = 'petrolCost';
    }

    // Calculate and display the total cost
    function calculateTotal() {
      const costPerLiter = parseFloat(document.getElementById("petrolCost").value);
      const liters = parseFloat(document.getElementById("litersPurchased").value);
      const total = (costPerLiter * liters).toFixed(2);
      document.getElementById("totalCost").innerText = `Total: $${total}`;
    }
