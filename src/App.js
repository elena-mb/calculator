import React, { useState } from 'react';
import './App.css';

function App() {
  const [previous, setPrevious] = useState('');
  const [result, setResult] = useState('');


  function clear() {
    setPrevious('');
    setResult('0');
  }

  function del() {
    setResult(prevRes => prevRes.toString().slice(0, -1));
  }

  const regexSpace = new RegExp('\\s', 'g');

  function getDisplayNum(num) {
    const stringNum = num.toString();
    
    stringNum.replace(regexSpace, '');
    console.log(stringNum.replace(regexSpace, ''));
    const integerDigits = parseFloat(stringNum.split('.')[0]);
    const decimalDigits = stringNum.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString()
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    }
    return integerDisplay.toString();
  }

  function append(e) {
    if (e.target.innerHTML === '0' && result.toString()[0] === '0') {
      setResult(0);
    }
    if (!(e.target.innerHTML === '.' && result.toString().includes('.'))) {
      setResult(res => getDisplayNum(res.toString().replace(regexSpace, '') + e.target.innerHTML));
    }
  }

  function chooseOperation(e) {
    let oper = e.target.innerHTML;
    if (result !== '' && previous !== '') {
      setPrevious(prev => prev + ' ' + getDisplayNum(result.replace(regexSpace, '')) + ' ' + oper);
      setResult('');
    } if (previous == '' || previous.includes('=')) {
      setPrevious(getDisplayNum(result.replace(regexSpace, '')) + ' ' + oper);
      setResult('')
    } if (result == '') { // if we want to change operation      
      if (oper == '−') { // if pressed after another sign, it is treated as sign of the negative number
        if (previous.split(' ').at(-1).length < 2) {
          setPrevious(prev => prev.concat(oper));
        }

      } else {
        setPrevious(prev => prev.split(' ').slice(0, -1).concat(oper).join(' '));
      }
    }

  }


  function compute() {
    setPrevious(prev => prev + ' ' + getDisplayNum(result.replace(regexSpace, '')) + ' ' + '=');
    setResult(counter(previous + ' ' + getDisplayNum(result.replace(regexSpace, ''))));
  
    function counter(str) {
      var array = str.split(' ');
     
      array = array.map(el => el.replace(regexSpace, ''));
      console.log(array);
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
     // console.log(array);
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
  
          let opIndex = findCurrentOp(equation); // index of current operation
          let operation = equation[opIndex]; // value of current operation 
  
          function toWhatEquals(a, b, op) { // input: num, num, str
              switch (op) {
                  case '+':
                      return a + b;
                  case '−':
                      return a - b;
                  case '×':
                      return a * b;
                  case '÷':
                      return a / b;
              }
  
          }
  
          res = toWhatEquals(equation[opIndex - 1], equation[opIndex + 1], operation);
          equation.splice(opIndex - 1, 3, res); // delete what we have just counted and replace those values with res 
          return equation.length > 1 ? count(equation) : equation[0];
  
      }
  
      let answer = count(array);
      return (answer.toString().includes('.') && answer.toString().length > 5) ? getDisplayNum(answer.toFixed(5) * 1) : getDisplayNum(answer);
  }

  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="calculator-grid">
          <div id="display-big">
            <div className="previous-operand">{previous}</div>
            <div id="display" className="current-operand">{result}</div>
          </div>
          <button id="clear" className="span-two" onClick={clear}>AC</button>
          <button id="del" className='safari_only' onClick={del}>DEL</button>
          <button id="divide" onClick={chooseOperation}>÷</button>
          <button id="one" onClick={append}>1</button>
          <button id="two" onClick={append}>2</button>
          <button id="three" onClick={append}>3</button>
          <button id="multiply" onClick={chooseOperation}>×</button>
          <button id="four" onClick={append}>4</button>
          <button id="five" onClick={append}>5</button>
          <button id="six" onClick={append}>6</button>
          <button id="add" onClick={chooseOperation}>+</button>
          <button id="seven" onClick={append}>7</button>
          <button id="eight" onClick={append}>8</button>
          <button id="nine" onClick={append}>9</button>
          <button id="subtract" onClick={chooseOperation}>−</button>
          <button id="decimal" onClick={append}>.</button>
          <button id="zero" onClick={append}>0</button>
          <button id="equals" className="span-two" onClick={compute}>=</button>

        </div>
      </header>
    </div>
  );
}

export default App;
