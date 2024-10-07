import { useState } from 'react'
import Key from '../components/Key'

export default function Calculator() {

    const [display, setDisplay] = useState(0);
    const [digit1, setDigit1] = useState(null);
    const [digit2, setDigit2] = useState(null);
    const [operator, setOperator] = useState(null);
    const [prevDisplay, setPrevDisplay] = useState("");
    
    let result;

    const digitClickHandler = (e) => {
        const value = e.target.innerHTML;

        // ONLY RUNS IF THERE IS AN OPERATOR 
        if (operator === null){
            if(digit1 === null){
                if(value !== '0'){
                    setDigit1(value);
                    setDisplay(value);
                }
            } else { 
                if(value !== '0' || digit1 !== '0'){
                    // TO PREVENT ADDING ERROR TO THE CALCULATION
                    if (digit1 !== "Can't Divide by Zero" && digit1.length < 15){
                        setDigit1(digit1 + value);
                        setDisplay(digit1 + value);
                    }
                }
            } 
        } else {
            if(digit2 === null) {
                    setDigit2(value);
                    setDisplay(value);
            } else {
                if(value !== '0' || digit2 !== '0'){
                    if(digit2.length < 15) {
                        setDigit2(digit2 + value);
                        setDisplay(digit2 + value);
                    }
                }
            } 
        }
    }
    
    const operatorClickHandler = (e) => {
        calculateClickHandler();
        if (digit1 !== null && digit1 !== "Can't Divide by Zero"){
            const value = e.target.innerHTML;
            setOperator(value);
            setDisplay(0);
            setPrevDisplay(`${digit1} ${value}`)

            if(digit2 !== null){
                setOperator(value);
                setDisplay(0);
                setPrevDisplay(`${result} ${value}`);
            }  
        }     
    }

    const calculateClickHandler = (e) => {
        if (digit1 !== null && digit2 !== null && operator !== null){
            const digitOne = parseInt(digit1);
            const digitTwo = parseInt(digit2);

            switch(operator){
                case "+":
                    result = digitOne + digitTwo;
                    break;
                case "-":
                    result = digitOne - digitTwo;
                    break;
                case "*":
                    result = digitOne * digitTwo;
                    break;
                case "/":
                    result = digitTwo !== 0 ? digitOne / digitTwo : "Can't Divide by Zero";  
                    break;
                default:
                    result = "ERROR";
            }
            
            setDisplay(result)
            setDigit1(result)
            setDigit2(null)
            setOperator(null)
            setPrevDisplay(null);
        }  
    }

    const clearClickHandler = (e) => {
        setDisplay(0);
        setDigit1(null);
        setDigit2(null);
        setOperator(null);
        setPrevDisplay("");
    }

    const showFullName = (e) => {
        console.log(e);
        setDisplay("Kristenz Mingoy");
        setDigit1(null);
        setDigit2(null);
        setOperator(null);
        setPrevDisplay("")
    }

    return(
        <div className="calculator-container">
            <div className="calculator-header">
                <p>Calculator of Kristenz Mingoy - IT3A <span>-</span></p> 
            </div>
            <div className="display-container">
                <p>{prevDisplay}</p>
                <h2>{display}</h2>
            </div>
            <div className="button-container">
                <div className="calculator-keys">
                    <Key label={7} clickHandler={digitClickHandler}/>
                    <Key label={8} clickHandler={digitClickHandler}/>
                    <Key label={9} clickHandler={digitClickHandler}/>
                    <Key label={"+"} clickHandler={operatorClickHandler}/>
                    <Key label={4} clickHandler={digitClickHandler}/>
                    <Key label={5} clickHandler={digitClickHandler}/>
                    <Key label={6} clickHandler={digitClickHandler}/>
                    <Key label={"-"} clickHandler={operatorClickHandler}/>
                    <Key label={1} clickHandler={digitClickHandler}/>
                    <Key label={2} clickHandler={digitClickHandler}/>
                    <Key label={3} clickHandler={digitClickHandler}/>
                    <Key label={"*"} clickHandler={operatorClickHandler}/>
                    <Key label={"C"} clickHandler={clearClickHandler}/>
                    <Key label={0} clickHandler={digitClickHandler}/>
                    <Key label={"="} clickHandler={calculateClickHandler}/>
                    <Key label={"/"} clickHandler={operatorClickHandler}/>
                </div>
                <div className="surname">
                    <Key label={'MINGOY'} clickHandler={showFullName} className="span-four"/> 
                </div>
            </div>
                 

        </div>
    )
};