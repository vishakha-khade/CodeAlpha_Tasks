const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent;

        if (value === "C") {
            display.value = "";
        } 
        else if (value === "DEL") {
            display.value = display.value.slice(0, -1);
        } 
        else if (value === "=") {
            try {
                display.value = calculate(display.value);
            } 
            catch {
                display.value = "Invalid";
            }
        } 
        else {
            if (display.value === "Invalid") {
                display.value = "";
            }

            display.value += value;
        }
    });
});

function calculate(expression) {
    if (!expression.trim()) {
        return "";
    }

    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        throw new Error("Invalid expression");
    }

    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
        throw new Error("Invalid calculation");
    }

    return result;
}
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= "0" && key <= "9" || "+-*/.%()".includes(key)) {
        if (display.value === "Invalid") {
            display.value = "";
        }

        display.value += key;
    }

    else if (key === "Enter") {
        event.preventDefault();

        try {
            display.value = calculate(display.value);
        } catch {
            display.value = "Invalid";
        }
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    else if (key === "Escape") {
        display.value = "Invalid";
    }
});