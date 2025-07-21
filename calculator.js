const equationList = [];
let currentNumber = '';

const operators = ['+', '-', 'X', '*', '/', '%'];

document.body.addEventListener('click', (event) => {
    const inputtedElement = event.target.innerHTML;

    if (/^\d$/.test(inputtedElement) || inputtedElement === '.' || inputtedElement === '+/-') {
        handleNumbers(inputtedElement);
    } else if (operators.includes(inputtedElement) || inputtedElement === '=' ) {
        handleOperators(inputtedElement);
    } else if (inputtedElement === 'AC') {
        clearAll();
    }
});

document.body.addEventListener('keydown', (event) => {
    const typedElement = event.key;

    if (/^\d$/.test(typedElement) || typedElement === '.' || typedElement === '+/-') {
        handleNumbers(typedElement);
    } else if (operators.includes(typedElement) || typedElement === '=' || typedElement === 'Enter') {
        handleOperators(typedElement === 'Enter' ? '=' : typedElement);
    } else if (typedElement === 'Backspace') {
        clearAll();
    }
});

function handleNumbers(num) {
    if (num === '+/-') {
        if (currentNumber) {
            currentNumber = (Number(currentNumber) * -1).toString();
            updateDisplay(currentNumber);
        } else {
            updateDisplay('0');
        }
    } else if (num === '.') {
        if (!currentNumber.includes('.')) {
            currentNumber += num;
            updateDisplay(currentNumber);
        }
    } else {
        if (!(num === '0' && currentNumber === '0')) {
            currentNumber += num;
            updateDisplay(currentNumber);
        }
    }
}

function handleOperators(opp) {
    if (currentNumber !== '') {
        equationList.push(currentNumber);
        currentNumber = '';
    }

    if (opp === '=') {
        solveEq(equationList);
        return;
    }

   
    if (equationList.length === 0 && opp !== '-') { 
        updateDisplay('Error');
        return;
    }

    const lastEntry = equationList[equationList.length - 1];
    if (operators.includes(lastEntry)) {
        equationList[equationList.length - 1] = opp;
    } else {
        equationList.push(opp);
    }
    updateDisplay(opp);
}

function updateDisplay(value) {
    document.querySelector('.user-input-number').innerHTML = value;
}

function solveEq(list) {
    if (currentNumber !== '') {
        list.push(currentNumber);
        currentNumber = '';
    }

    while (list.length > 0 && operators.includes(list[list.length - 1])) {
        list.pop();
    }

    let expression = list.join('').replace(/X/g, '*');

    try {
        let result = eval(expression);

        if (typeof result === 'number') {
            result = Math.round(result * 1e8) / 1e8;
        }
        
        updateDisplay(result);
        equationList.splice(0, equationList.length);
        equationList.push(result.toString());
    } catch (e) {
        updateDisplay('Error');
        clearAll();
    }
}

function clearAll() {
    equationList.splice(0, equationList.length);
    currentNumber = '';
    updateDisplay('0');
}
