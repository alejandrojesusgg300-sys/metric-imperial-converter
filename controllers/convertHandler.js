function ConvertHandler() {
  function splitInput(input) {
    input = input || '';

    const firstUnitIndex = input.search(/[a-zA-Z]/);

    if (firstUnitIndex === -1) {
      return {
        numPart: input,
        unitPart: ''
      };
    }

    return {
      numPart: input.slice(0, firstUnitIndex),
      unitPart: input.slice(firstUnitIndex)
    };
  }

  this.getNum = function(input) {
    const { numPart } = splitInput(input);

    if (numPart === '') {
      return 1;
    }

    const slashCount = (numPart.match(/\//g) || []).length;

    if (slashCount > 1) {
      return 'invalid number';
    }

    const numberPattern = /^\d*\.?\d+(\/\d*\.?\d+)?$/;

    if (!numberPattern.test(numPart)) {
      return 'invalid number';
    }

    if (numPart.includes('/')) {
      const [numerator, denominator] = numPart.split('/').map(Number);

      if (denominator === 0) {
        return 'invalid number';
      }

      return numerator / denominator;
    }

    return Number(numPart);
  };

  this.getUnit = function(input) {
    const { unitPart } = splitInput(input);

    const unit = unitPart.toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }

    if (unit === 'l') {
      return 'L';
    }

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return returnUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spelledUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return spelledUnits[unit];
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    const result = initNum * conversionRates[initUnit];

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;