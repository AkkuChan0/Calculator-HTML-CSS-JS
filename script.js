const result = document.querySelector('.result');
const prev = document.querySelector('.example');
const example = Calculator();

let brack = false;
let buffer = "";

function buttonClick(val) {
    if (isNaN(val)) {
        handleSymbol(val);
    } else {
        handleNumber(val);
    }
    result.innerText = buffer;
}

function handleNumber(val) {
    if (buffer === "") {
        buffer = val;
    } else {
        buffer += val;
    }
}

function handleSymbol(val) {
    switch (val) {
        case 'C':
            if (buffer == "") {
                prev.innerText = "";
            }
            buffer = "";
            brack = false;
            break;
        case '=':
            prev.innerText = buffer;
            buffer = example.getResult(buffer);
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '';
            } else {
                if (buffer.slice(0, -1) == ")") {
                    brack = true;
                } else if (buffer.slice(0, -1) == "(") {
                    brack = false;
                }
                buffer = buffer.slice(0, -1);
            }
            break;
        case '( )':
            if (brack) {
                buffer += ")";
                brack = false;
            } else {
                buffer += "(";
                brack = true;
            }
            break;
        case "÷":
        case "×":
        case "+":
        case "-":
            if (isNaN(buffer[buffer.length-1])) {
                if (buffer[buffer.length-1] != ")") {
                    buffer = buffer.slice(0, -1);
                }
            }
            buffer += val;
            break;
    }
}

function prevButton() {
    if (prev.innerText == "") {
        return;
    }

    result.innerText = prev.innerText;
    buffer = prev.innerText;
    prev.innerText = "-";
}

function showHistory(val) {
    buffer = val;
    result.innerText = buffer;
}

function updateHistory() {
    let links = document.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            showHistory(event.target.innerText);
        });
    }
}

function keyDown(key) {
    console.log(key);
    if (!isNaN(key)){
        handleNumber(key);
    }

    switch (key) {
        case "*":
        case "×":
            handleSymbol("×");
            break;
        case "/":
        case "÷":
            handleSymbol("÷");
            break;
        case "=":
        case "Enter":
            handleSymbol("=");
            break;
        case "Backspace":
            handleSymbol("←");
            break;
        case "(":
        case ")":
            handleSymbol("( )");
            break;
        case "+":
        case "-":
        case "C":
            handleSymbol(key);
            break;
    }
    result.innerText = buffer;
}

function init() {
    document.querySelector('.buttons').
    addEventListener('click', function(event) {
        buttonClick(event.target.innerText)
    });

    document.querySelector('.example').
    addEventListener('click', function(event) {
        prevButton(event.target.innerText)
    });

    document.querySelector('.history-button').
    addEventListener('click', function() {
        document.querySelector('.buttons').classList.toggle('buttons_active');
        document.querySelector('.history-list').classList.toggle('history_active');
    });
    updateHistory();

    document.addEventListener("keydown", function(event) {
        keyDown(event.key);
    })
}

init();
