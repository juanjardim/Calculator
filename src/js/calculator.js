"use strict";
var Calculator = function (eq, tb) {
    this.eqCtl = document.getElementById(eq);
    this.currentNumberCtl = document.getElementById(tb);
    this.operator = null;
    this.operatorSet = false;
    this.equalsPressed = false;
    this.lasNumber = null;
};

Calculator.prototype = {
    add: function (x, y) {
        return x + y;
    },

    subtract: function (x, y) {
        return x - y;
    },

    multiply: function (x, y) {
        return x * y;
    },

    divide: function (x, y) {
        if (y === 0) {
            window.alert("Can't divide by 0");
        }
        return x / y;
    },

    setValue: function (value) {
        this.eqCtl.value = value;
    },

    setEquation: function (value) {
        this.currentNumberCtl.innerHTML = value;
    },

    clearNumbers: function () {
        this.lasNumber = null;
        this.equalsPressed = this.operatorSet = false;
        this.setValue('0');
        this.setEquation('');
        return;
    },

    setOperator: function (newOperator) {
        if (newOperator === '=') {
            this.equalsPressed = true;
            this.calculate();
            this.setEquation('');
            return;
        }
        if (!this.equalsPressed) this.calculate();
        this.equalsPressed = false;
        this.operator = newOperator;
        this.operatorSet = true;
        this.lasNumber = parseFloat(this.eqCtl.value);
        var eqText = (this.eqCtl.innerHTML === '') ? this.lasNumber + ' ' + this.operator + ' ' : this.eqCtl.innerHTML + ' ' + this.operator + ' ';
        this.setEquation(eqText);
    },

    numberClick: function (e) {
        if(this.equalsPressed) {
            this.setValue('');
        }
        var button = (e.target) ? e.target : e.srcElement;
        if (this.operatorSet || this.currentNumberCtl.innerHTML === '0') {
            this.setValue('');
            this.operatorSet = false;
        }

        this.setValue(this.eqCtl.value + button.innerHTML);
        if (this.operatorSet) {
            this.setEquation(this.eqCtl.innerHTML + button.innerHTML);
        }
    },

    calculate: function () {
        if (!this.operator || this.lasNumber === null) return;
        var displayedNumber = parseFloat(this.eqCtl.value);
        var newValue = 0;
        switch (this.operator) {
            case '+':
                newValue = this.add(this.lasNumber, displayedNumber);
                break;
            case '-':
                newValue = this.subtract(this.lasNumber, displayedNumber);
                break;
            case '*':
                newValue = this.multiply(this.lasNumber, displayedNumber);
                break;
            case '/':
                newValue = this.divide(this.lasNumber, displayedNumber);
                break;
        }

        this.setValue(newValue);
        this.lasNumber = newValue;
    }
};

var myCalculator;
myCalculator = new Calculator('result', 'currentNumber');
