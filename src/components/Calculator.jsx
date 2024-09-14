import { useState, useEffect } from 'react';
import { getSarcaticMessage } from './SarcasticInteractions'; 

const randomizeArray = (arr) => arr.sort(() => Math.random() - 0.5); // Embaralhar array para mudar a ordem dos botões

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [currentOperator, setCurrentOperator] = useState('');
    const [previousValue, setPreviousValue] = useState('');
    const [shouldClearDisplay, setShouldClearDisplay] = useState(false);
    const [operationText, setOperationText] = useState('');
    const [buttons, setButtons] = useState([
        'C', '←', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'
    ]);
    const [errorLogs, setErrorLogs] = useState([]); // Estado para logs de erro

    useEffect(() => {
        const intervalId = setInterval(() => {
            setButtons(prevButtons => [...randomizeArray(prevButtons)]);
        }, 3000); // Mudar a ordem dos botões a cada 3 segundos

        return () => clearInterval(intervalId);
    }, []);

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
                const errorChance = Math.random();
                if (errorChance < 0.4) { // 40% chance de erro
                    setErrorLogs(prevLogs => [...prevLogs, getSarcaticMessage()]); // Adiciona mensagem sarcástica ao log
                    setOperationText(''); // Limpa texto da operação
                } else {
                    setTimeout(() => {
                        setDisplayValue(generateRandomResult());
                        setPreviousValue('');
                        setCurrentOperator('');
                        setOperationText('');
                        setShouldClearDisplay(true);
                        setErrorLogs(prevLogs => [...prevLogs, getSarcaticMessage()]);
                    }, Math.random() * 3000); // Delay aleatório entre 0-3 segundos
                }
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

    const generateRandomResult = () => {
        const randomResult = Math.floor(Math.random() * 100);
        return randomResult.toString();
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="bg-gray-800 text-white max-w-xs p-4 rounded-lg shadow-lg flex flex-col">
                <div className="bg-gray-900 p-4 rounded-md mb-4 flex flex-col justify-end h-24">
                    <div className="text-left text-xs text-gray-400 mb-1" style={{ height: '1.5rem' }}>
                        {operationText}
                    </div>
                    <div className="text-right text-4xl" style={{ height: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'right' }}>
                        {displayValue}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            className={`p-4 rounded transition-transform duration-300 ease-in-out ${getButtonStyles(btn)}`}
                            onClick={() => handleButtonClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-gray-700 text-gray-300 p-4 rounded-lg w-full md:w-72 flex-shrink-0">
                <div className="text-lg font-bold mb-2">Logs de Erro</div>
                <div className="max-h-96 overflow-y-auto">
                    {errorLogs.map((log, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-600 rounded">
                            {log}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getButtonStyles = (btn) => {
    const buttonStyles = {
        'C': 'bg-green-700 font-bold hover:bg-green-600',
        '←': 'bg-gray-700 hover:bg-gray-600',
        '/': 'bg-gray-700 hover:bg-gray-600',
        '*': 'bg-gray-700 hover:bg-gray-600',
        '-': 'bg-gray-700 hover:bg-gray-600',
        '+': 'bg-gray-700 hover:bg-gray-600',
        '=': 'bg-red-600 font-bold hover:bg-red-500 col-span-1 row-span-2',
        '0': 'bg-gray-600 col-span-2 hover:bg-gray-500',
        '.': 'bg-gray-600 hover:bg-gray-500',
    };

    return buttonStyles[btn] || 'bg-gray-600 hover:bg-gray-500';
};

export default Calculator;
