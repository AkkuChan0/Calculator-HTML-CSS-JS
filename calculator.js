function Calculator() {
    let numbers = [];
    let operators = [];

    const calc_operators = ["×", "÷", "+", "-", "(", ")"];

    function constructExample(example) {
        let _number = "";
        for (let i of example) {
            if (calc_operators.includes(i)) {
                operators.push(i);
                if (!_number == "") {
                    numbers.push(parseInt(_number));
                }
                _number = "";
                continue;
            }
            _number += i;
        }
        if (!_number == "") {
            numbers.push(parseInt(_number));
        }
    }

    function prioritySolution(_temp_numbers, _temp_operators) {
        markLoop: while (true) {
            for (let i of _temp_operators) {
                if (i == calc_operators[0]) {
                    index_oper = _temp_operators.indexOf(calc_operators[0]);
                    _temp_numbers[index_oper] *= _temp_numbers[index_oper + 1];
                } else if (i == calc_operators[1]) {
                    index_oper = _temp_operators.indexOf(calc_operators[1]);
                    _temp_numbers[index_oper] /= _temp_numbers[index_oper + 1];
                } else {
                    continue;
                }
                _temp_numbers.splice(index_oper + 1, 1);
                _temp_operators.splice(index_oper, 1);
                continue markLoop;
            }
            
            break;
        }
        
        markLoop: while(true) {
            for (let oper in _temp_operators) {
                if (_temp_operators[oper] == "+") {
                    _temp_numbers[oper] += _temp_numbers[parseInt(oper) + 1];
                } else {
                    _temp_numbers[oper] -= _temp_numbers[parseInt(oper) + 1];
                }
                _temp_numbers.splice(oper + 1, 1);
                _temp_operators.splice(oper, 1);
                continue markLoop;
            }
            break;
        }

        return _temp_numbers[0];
    }

    function exampleSolution(example) {
        
        let _temp_numbers = numbers.slice(0);
        let _temp_operators = operators.slice(0);
        console.log(_temp_numbers);
        console.log(_temp_operators);
        markLoop: while(true) {
            let level_bracket = -1;
            if (_temp_operators.includes("(")) {
                let index_bracket_1;
                let index_bracket_2 = -1;
                for (let i in _temp_operators) {
                    if (_temp_operators[i] === "(") {
                        ++level_bracket;
                        index_bracket_1 = parseInt(i);
                    }
                    if (_temp_operators[i] === ")") {
                        index_bracket_2 = parseInt(i);
                        break;
                    }
                    if (index_bracket_1 && index_bracket_2 != -1) {
                        break;
                    }
                }
                if (index_bracket_2 == -1) {
                    index_bracket_2 = parseInt(_temp_operators.length);
                }
                console.log(index_bracket_1);
                console.log(index_bracket_2);
                
                console.log(level_bracket);
                let _brackets_numbers = _temp_numbers.slice((index_bracket_1 - level_bracket), index_bracket_2);
                let _brackets_operators = _temp_operators.slice(index_bracket_1 + 1, index_bracket_2);
                
                console.log(_brackets_numbers);
                console.log(_brackets_operators);

                _temp_numbers.splice((index_bracket_1 - level_bracket), (index_bracket_2 - index_bracket_1 - 1));
                _temp_operators.splice(index_bracket_1, (index_bracket_2 - index_bracket_1 + 1 + level_bracket));

                _temp_numbers[index_bracket_1 - level_bracket] = prioritySolution(_brackets_numbers, _brackets_operators);

                console.log(_temp_numbers);
                console.log(_temp_operators);
                continue markLoop;
            }

            break;
        }

        let res = prioritySolution(_temp_numbers, _temp_operators)

        let ul = document.querySelector('.history-list');
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.href = "#";
        link.appendChild(document.createTextNode(example));
        li.appendChild(link);
        ul.appendChild(li);
        updateHistory()

        numbers = [];
        operators = [];

        return res;
    }

    function getResult(example) {
        constructExample(example);

        return String(exampleSolution(example));
    }

    // Возвращаем публичные методы объекта
    return {
        getResult
    };
}