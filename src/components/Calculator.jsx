import { useState } from 'react';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [currentOperator, setCurrentOperator] = useState('');
    const [previousValue, setPreviousValue] = useState('');
    const [shouldClearDisplay, setShouldClearDisplay] = useState(false);
    const [operationText, setOperationText] = useState('');

    const handleButtonClick = (text) => {
        if (text >= '0' && text <= '9' || text === '.') {
            if (shouldClearDisplay) {
                setDisplayValue(text === '.' ? '0.' : text);
                setShouldClearDisplay(false);
            } else {
                if (text === '.' && displayValue.includes('.')) return;
                setDisplayValue(displayValue === '0' && text !== '.' ? text : displayValue + text);
            }
        } else if (text === 'C') {
            setDisplayValue('0');
            setCurrentOperator('');
            setPreviousValue('');
            setOperationText('');
        } else if (text === '←') {
            setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
        } else if (text === '=') {
            if (previousValue && currentOperator) {
                setDisplayValue(calculate(previousValue, displayValue, currentOperator));
                setPreviousValue('');
                setCurrentOperator('');
                setOperationText(`${previousValue} ${currentOperator} ${displayValue} =`);
                setShouldClearDisplay(true);
            }
        } else { // Operadores
            if (displayValue) {
                setPreviousValue(displayValue);
                setDisplayValue('0');
                setOperationText(`${displayValue} ${text}`);
            }
            setCurrentOperator(text);
            setShouldClearDisplay(true);
        }
    };

    const calculate = (value1, value2, operator) => {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return num2 !== 0 ? (num1 / num2).toString() : 'Erro';
            default:
                return num2.toString();
        }
    };

    return (
        <div className="bg-gray-800 text-white max-w-xs mx-auto p-4 rounded-lg shadow-lg">
            <div className="bg-gray-900 p-4 rounded-md mb-4 flex flex-col justify-end h-24">
                <div className="text-left text-xs text-gray-400 mb-1" style={{ height: '1.5rem' }}>
                    {operationText}
                </div>
                <div className="text-right text-4xl" style={{ height: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'right' }}>
                    {displayValue}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('C')}>C</button>
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('←')}>←</button>
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('/')}>/</button>
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('*')}>*</button>
                
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('7')}>7</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('8')}>8</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('9')}>9</button>
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('-')}>-</button>
                
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('4')}>4</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('5')}>5</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('6')}>6</button>
                <button className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition-transform" onClick={() => handleButtonClick('+')}>+</button>
                
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('1')}>1</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('2')}>2</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('3')}>3</button>
                <button className="bg-red-600 p-4 rounded col-span-1 row-span-2 hover:bg-red-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('=')}>=</button>
                
                <button className="bg-gray-600 p-4 col-span-2 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('0')}>0</button>
                <button className="bg-gray-600 p-4 rounded hover:bg-gray-500 hover:scale-105 transition-transform" onClick={() => handleButtonClick('.')}>.</button>
            </div>
        </div>
    );
}

export default Calculator;