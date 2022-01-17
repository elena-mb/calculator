const eq = '1 + 2 + 4 / 2 * 0.5 *- 1'; // = 2

function counter(str) {
    var array = str.split(' ');

    // change all numbers to actual numbers
    array = array.map(element => (isNaN(element * 1)) ? element : parseFloat(element));

    // find which numbers are ought to be negative and make them such
    array = array.map(function(el, i, arr) {
        if (isNaN(el) && el.length === 2) {
            arr[++i] *= -1;
            el = el[0];
        }
        return el
    });

    // for tests:
    // var example = [1, '+', 2, '*', 2, '/', 10]; // = 5

    function count(equation) {
        var res = 0;

        //find the _index_ of current operation
        const findCurrentOp = (arr) => {
                let indexOfMult = arr.indexOf('*');
                let indexOfDiv = arr.indexOf('/');
                if (indexOfDiv === -1 && indexOfMult === -1) {
                    return 1;
                }
                if (indexOfDiv === -1) {
                    return indexOfMult;
                }
                if (indexOfMult === -1) {
                    return indexOfDiv;
                }
                return (indexOfMult < indexOfDiv) ? indexOfMult : indexOfDiv;
            }
            //console.log(countNow(findCurrentOp));

        let opIndex = findCurrentOp(equation); // index of current operation
        let operation = equation[opIndex]; // value of current operation 

        function toWhatEquals(a, b, op) { // input: num, num, str
            switch (op) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    return a / b;
            }

        }

        res = toWhatEquals(equation[opIndex - 1], equation[opIndex + 1], operation);
        equation.splice(opIndex - 1, 3, res); // delete what we have just counted and replace those values with res 
        return equation.length > 1 ? count(equation) : equation[0];

    }

    return count(array);
}

console.log(counter(eq));