import React, { useState, useEffect } from 'react';
import Display from './display';
import Button from './button';

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [pressedKey, setPressedKey] = useState(null); 

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event; 
            if (/[0-9./*\-+=]/.test(key)) { 
                setPressedKey(key);
            }
        };
        const handleKeyUp = () => {
            setPressedKey(null);
        }; 

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);


        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);

        };
    }, []);

    useEffect(() => {
        if (pressedKey) {
            handleClick(pressedKey);
        }
    }, [pressedKey]);

    const handleClick = (label) => {
        if (/[0-9]/.test(label)) {
            if (display.length < 9) {
                if (waitingForOperand) {
                    setDisplay(label);
                    setWaitingForOperand(false);
                } else {
                    setDisplay((prev) => (prev === '0' ? label : prev + label));
                }
            }
        } else if (label === '.') {
            if (display.length < 9 && !display.includes('.')) {
                if (waitingForOperand) {
                    setDisplay('0.');
                    setWaitingForOperand(false);
                } else {
                    setDisplay((prev) => prev + label);
                }
            }
        } else if (label === 'C') {
            setDisplay('');
            setOperator(null);
            setOperand(null);
            setWaitingForOperand(false);
        } else if (label === '=') {
            calculate();
        } else {
            if (operator && operand !== null && !waitingForOperand) {
                calculate(label);
            } else {
                setOperand(parseFloat(display));
            }
            setOperator(label);
            setWaitingForOperand(true);
        }
    };

    const calculate = (nextOperator = null) => {
        let result;
        if (operator && operand !== null) {
            switch (operator) {
                case '+':
                    result = operand + parseFloat(display);
                    break;
                case '-':
                    result = operand - parseFloat(display);
                    break;
                case '*':
                    result = operand * parseFloat(display);
                    break;
                case '/':
                    result = operand / parseFloat(display);
                    break;
                default:
                    return;
            }

            if (result > 999999999 || result < 0) {
                setDisplay('ERROR');
            } else {
                setDisplay(String(result).slice(0, 9));
                setOperand(result);
            }

            setOperator(nextOperator);
            setWaitingForOperand(true);
        }
    };

    return (
        <div className="calculator">
            <Display value={display} />
            <div className="buttons">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((label) => (
                    <Button key={label} label={label} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
};


export default Calculator;
