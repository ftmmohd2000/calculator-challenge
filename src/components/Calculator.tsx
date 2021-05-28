import numeral from "numeral";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

type Operator = "" | "+" | "-" | "/" | "x";

const Calculator = () => {
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [screenVal, setScreenVal] = useState("0");
  const [opSideLeft, setOpSideLeft] = useState(true);
  const [operator, setOperator] = useState<Operator>("");

  const appendKey = (
    dispatcher: Dispatch<SetStateAction<string>>,
    value: string,
    keyValue: string
  ) => {
    const reg = /^[0-9]+\.?[0-9]*$/;
    let temp = value;
    // @ts-ignore
    temp = temp + keyValue;
    if (reg.test(temp)) {
      dispatcher(temp);
      setScreenVal(numeral(temp).format("0,0"));
    }
  };

  const handleKey = (keyValue: string) => {
    switch (keyValue) {
      case "+":
        if (!!op1) {
          setOperator("+");
          setOpSideLeft(false);
        }
        break;
      case "-":
        if (!!op1) {
          setOperator("-");
          setOpSideLeft(false);
        }
        break;
      case "x":
        if (!!op1) {
          setOperator("x");
          setOpSideLeft(false);
        }
        break;
      case "/":
        if (!!op1) {
          setOperator("/");
          setOpSideLeft(false);
        }
        break;
      default:
        if (opSideLeft) appendKey(setOp1, op1, keyValue);
        else appendKey(setOp2, op2, keyValue);
    }
  };

  const pressKey: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // @ts-ignore
    handleKey(e.target.innerHTML);
  };

  // const enterKey: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   handleKey(e.target.value);
  // };

  const deleteKey = () => {
    let newVal: string;
    if (opSideLeft) {
      newVal = op1.substring(0, op1.length - 1);
      setOp1(op1.substring(0, op1.length - 1));
    } else {
      newVal = op2.substring(0, op1.length - 2);
      setOp2(op2.substring(0, op2.length - 1));
    }
    setScreenVal(numeral(newVal).format("0,0"));
  };

  const reset = () => {
    setOp1("");
    setOp2("");
    setOpSideLeft(true);
    setScreenVal("0");
    setOperator("");
  };

  const calculate = () => {
    let calculated: number = 0;
    switch (operator) {
      case "+":
        calculated = parseFloat(op1) + parseFloat(op2);
        break;
      case "-":
        calculated = parseFloat(op1) - parseFloat(op2);
        break;
      case "x":
        calculated = parseFloat(op1) * parseFloat(op2);
        break;
      case "/":
        if (parseFloat(op2) === 0) calculated = Infinity;
        else calculated = parseFloat(op1) / parseFloat(op2);
        break;
    }

    setScreenVal(numeral(calculated).format("0,0"));
    setOp1(`${calculated}`);
    setOp2("");
    setOpSideLeft(true);
    setOperator("");
  };

  return (
    <div className="calc">
      <div className="calc__screen">{screenVal}</div>
      <div className="calc__key">
        <div className="calc__key__row">
          <button className="calc__key__row__btn" onClick={pressKey}>
            7
          </button>
          <button className="calc__key__row__btn" onClick={pressKey} value={8}>
            8
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            9
          </button>
          <button
            className="calc__key__row__btn calc__key__row__btn--bold"
            onClick={deleteKey}
          >
            DEL
          </button>
        </div>
        <div className="calc__key__row">
          <button className="calc__key__row__btn" onClick={pressKey}>
            4
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            5
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            6
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            +
          </button>
        </div>
        <div className="calc__key__row">
          <button className="calc__key__row__btn" onClick={pressKey}>
            1
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            2
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            3
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            -
          </button>
        </div>
        <div className="calc__key__row">
          <button className="calc__key__row__btn" onClick={pressKey}>
            .
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            0
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            /
          </button>
          <button className="calc__key__row__btn" onClick={pressKey}>
            x
          </button>
        </div>
        <div className="calc__key__base">
          <button className="calc__key__base__btn" onClick={reset}>
            RESET
          </button>
          <button
            className="calc__key__base__btn calc__key__base__btn--red"
            onClick={calculate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
