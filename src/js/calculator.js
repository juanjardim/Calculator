"use strict";
var Calculator = function (eq, tb) {
    this.eqCtl = document.getElementById(eq);
    this.currentNumberCtl = document.getElementById(tb);
    this.operator = null;
    this.operatorSet = false;
    this.equalsPressed = false;
    this.lasNumber = null;
};
Calculator.prototype = function () {
    var add = function (x, y) {
            return x + y;
        },
        subtract = function (x, y) {
            return x - y;
        },

        multiply = function (x, y) {
            return x * y;
        },

        divide = function (x, y) {
            if (y === 0) {
                window.alert("Can't divide by 0");
            }
            return x / y;
        },

        setValue = function (value) {
            this.eqCtl.value = value;
        },

        setEquation = function (value) {
            this.currentNumberCtl.innerHTML = value;
        },

        clearNumbers = function () {
            this.lasNumber = null;
            this.equalsPressed = this.operatorSet = false;
            setValue.call(this, '0');
            setEquation.call(this,'');
        },

        calculate = function () {
            if (!this.operator || this.lasNumber === null) return;
            var displayedNumber = parseFloat(this.eqCtl.value);
            var newValue = 0;
            switch (this.operator) {
                case '+':
                    newValue = add.call(this, this.lasNumber, displayedNumber);
                    break;
                case '-':
                    newValue = subtract.call(this, this.lasNumber, displayedNumber);
                    break;
                case '*':
                    newValue = multiply.call(this, this.lasNumber, displayedNumber);
                    break;
                case '/':
                    newValue = divide.call(this, this.lasNumber, displayedNumber);
                    break;
            }

            setValue.call(this, newValue);
            this.lasNumber = newValue;
        },

        setOperator = function (newOperator) {
            if (newOperator === '=') {
                this.equalsPressed = true;
                calculate.call(this);
                setEquation.call(this,'');
                return;
            }
            if (!this.equalsPressed) calculate.call(this);
            this.equalsPressed = false;
            this.operator = newOperator;
            this.operatorSet = true;
            this.lasNumber = parseFloat(this.eqCtl.value);
            var eqText = (this.eqCtl.innerHTML === '') ? this.lasNumber + ' ' + this.operator + ' ' : this.eqCtl.innerHTML + ' ' + this.operator + ' ';
            setEquation.call(this, eqText);
        },

        numberClick = function (e) {
            if (this.equalsPressed) {
                setValue.call(this, '');
            }
            var button = (e.target) ? e.target : e.srcElement;
            if (this.operatorSet || this.currentNumberCtl.innerHTML === '0') {
                setValue.call(this, '');
                this.operatorSet = false;
            }

            setValue.call(this, this.eqCtl.value + button.innerHTML);
            if (this.operatorSet) {
                setEquation.call(this, this.eqCtl.innerHTML + button.innerHTML);
            }
        };



    return {
        numberClick : numberClick,
        setOperator : setOperator,
        clearNumbers : clearNumbers
    };
}();

var myCalculator;
myCalculator = new Calculator('result', 'currentNumber');
