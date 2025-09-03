import { useState } from 'react'
import './App.css'
import NumbersInput from '../src/Components/NumbersInput'
import MathsInput from './Components/MathsInput'


function App() {
  const [display, setDisplay] = useState('0');                // Tracks the current input/result shown on the screen.
  const [previousValue, setPreviousValue] = useState(null);   //Stores the first operand for calculations  
  const [operation, setOperation] = useState(null);           //Stores the current operation (+, -, *, /).
  const [resetDisplay, setResetDisplay] = useState(false);    //Flag to clear the display after an operation or equals


  const handleNumber = (number) => { //Appends digits to the display, handling initial '0' and reset after operations.
    if (resetDisplay) {
      setDisplay(number);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleDecimal = () => {   //Adds a decimal point if not already present
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {   //Stores the first operand and operation, or computes intermediate results for chained operations
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setOperation(op);
      setResetDisplay(true);
    } else if (operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(result);
      setOperation(op);
      setResetDisplay(true);
    }
  };

  const calculate = (a, b, op) => {    //Performs arithmetic based on the operation, with error handling for division by zero
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {      //Computes the final result and resets the operation state
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
      console.log(result)
    }
  };

  const handleClear = () => {   //Resets all states to initial values
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleBackspace = () => {   //Removes the last character from the display, reverting to '0' if empty
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };


  return (
    <div className='container'>
      <div className='row text-center w-50 d-flex justify-content-center'>
        <h2 className='headingtxt mb-2'>CALCULATOR</h2>
        <div className='border-underline w-75 mb-2 shadow'></div>
      </div>
      <div className='row content p-5 w-50 mt-3'>
        <div className='screen border w-100 px-2 shadow mb-4'>
          <span id="outputScreen" className='fs-2'>{display}</span>
        </div>
        <div className='row main-board ps-5'>
          <div className='row w-100'>
            {/* This is where the input numbers are placed */}
              <div className='col-8'> 
                <div className='row'>
                  <NumbersInput numtxt = {7} onClick={() => handleNumber('7')}/>
                  <NumbersInput numtxt = {8} onClick={() => handleNumber('8')}/>
                  <NumbersInput numtxt = {9} onClick={() => handleNumber('9')}/>
                </div>
                <div className='row'>
                  <NumbersInput numtxt = {4} onClick={() => handleNumber('4')}/>
                  <NumbersInput numtxt = {5} onClick={() => handleNumber('5')}/>
                  <NumbersInput numtxt = {6} onClick={() => handleNumber('6')}/>
                </div>

                <div className='row'>
                  <NumbersInput numtxt = {1} onClick={() => handleNumber('1')}/>
                  <NumbersInput numtxt = {2} onClick={() => handleNumber('2')}/>
                  <NumbersInput numtxt = {3} onClick={() => handleNumber('3')}/>
                </div>

                <div className='row'>
                  <NumbersInput numtxt = '#' onClick={() => {}}/>
                  <NumbersInput numtxt = {0} onClick={() => handleNumber('0')}/>
                  <NumbersInput numtxt = '.' onClick={handleDecimal}/>
                </div>

              </div>

              {/* Math inputs */}
              <div className='col-4 ps-4'>
                <div className='row '>
                  <MathsInput type='button' icon = {<i class="bi bi-plus-lg"></i>} id='plusMath' onClick={() => handleOperation('+')}/>
                  <MathsInput type='button' icon = {<i class="bi bi-dash-lg"></i>} id='minusMath' onClick={() => handleOperation('-')}/>
                </div>
                 <div className='row'>
                  <MathsInput type='button' icon = {<i class="bi bi-x-lg"></i>} id='multiplyMath' onClick={() => handleOperation('*')}/>
                  <MathsInput type='button' icon = {<i class="bi bi-slash-lg"></i>} id='divideMath' onClick={() => handleOperation('/')}/> 
                </div>
                 <div className='row'>
                  <MathsInput type='button' icon = {<i class="bi bi-arrow-left"></i>} onClick={handleBackspace}/>
                  <MathsInput type='button' icon = {'='} id='equalMath' onClick={handleEquals}/> 
                </div>
                <div className='row'>
                    <div className='col-12 ms-2 input-math p-1'>
                      <button type='button' className='btn-clear w-100' onClick={handleClear}>Clear</button>
                    </div>
                </div>

              </div>

          </div>
        </div>
      </div>

      <div className='row mt-3'>
        <h3 className='footer-txt'>Proudly Created by T Faltein</h3>
      </div>
    </div>
    
  )
}

export default App
