// Function to prompt the user for a number and validate the input
function getNumberInput(promptMessage) {
    while (true) {
        let input = prompt(promptMessage);
        if (input === null) return null; // Exit if Cancel is clicked
        let number = parseFloat(input);
        if (!isNaN(number)) return number; // Valid number, return it
        alert("Oops! That doesn't seem like a valid number. Please try again.");
    }
}

// Function to prompt the user for an operator and validate the input
function getOperatorInput() {
    while (true) {
        let operator = prompt("Enter an arithmetic operator (+, -, *, /, %):");
        if (operator === null) return null; // Exit if Cancel is clicked
        operator = operator.trim(); // Trim any extra spaces

        if (["+", "-", "*", "/", "%"].includes(operator)) {
            return operator; // Valid operator, return it
        } else {
            alert("Invalid operator! Please use +, -, *, /, or %.");
        }
    }
}

// Function to perform the calculation
function performCalculation(x, y, operator) {
    switch (operator) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            return y === 0 ? "undefined (cannot divide by zero)" : x / y;
        case "%":
            return x % y;
        default:
            return "Error";
    }
}

// Function to create and append table rows for results
function appendToTable(x, operator, y, result) {
    const table = document.getElementById('results-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${x}</td>
        <td>${operator}</td>
        <td>${y}</td>
        <td>${result}</td>
    `;
    table.appendChild(row);
}

// Function to calculate and display the summary
function displaySummary(validResults) {
    if (validResults.length === 0) {
        return; // If no valid results, no need for summary
    }

    const min = Math.min(...validResults);
    const max = Math.max(...validResults);
    const total = validResults.reduce((acc, val) => acc + val, 0);
    const avg = total / validResults.length;

    const summaryTable = document.createElement('table');
    summaryTable.classList.add('summary-table');
    summaryTable.innerHTML = `
        <tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>
        <tr><td>${min}</td><td>${max}</td><td>${avg.toFixed(2)}</td><td>${total}</td></tr>
    `;

    document.getElementById('calculator-output').appendChild(summaryTable);
}

// Main function to run the calculator
function calculator() {
    let validResults = []; // Array to store valid results for summary

    // Create a table for results
    document.getElementById('calculator-output').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Number 1</th>
                    <th>Operator</th>
                    <th>Number 2</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody id="results-table-body"></tbody>
        </table>
    `;

    while (true) {
        // 1. Get the first number
        let x = getNumberInput("Enter the first number (or click Cancel to exit):");
        if (x === null) break;

        // 2. Get the second number
        let y = getNumberInput("Enter the second number (or click Cancel to exit):");
        if (y === null) break;

        // 3. Get the operator
        let operator = getOperatorInput();
        if (operator === null) break;

        // 4. Perform the calculation and store the result
        let result;
        if (isNaN(x) || isNaN(y)) {
            result = "Error: Invalid number(s)";
        } else if (!["+", "-", "*", "/", "%"].includes(operator)) {
            result = "Error: Invalid operator";
        } else {
            result = performCalculation(x, y, operator);
            if (typeof result === "number") validResults.push(result); // Only store valid numbers
        }

        // Append the result to the table
        appendToTable(x, operator, y, result);

        // Ask if the user wants to perform another calculation
        let continueCalc = confirm("Do you want to perform another calculation?");
        if (!continueCalc) break;
    }

    // Display summary of valid results
    displaySummary(validResults);

    alert("Goodbye! Thanks for using the calculator.");
}

// Call the calculator function when the page loads
calculator();
