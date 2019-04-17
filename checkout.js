class CheckOut {
  constructor(RULES) {
    this._RULES = RULES;
    this._cart = {};
  }

  get total() {
    // Helper function
    function getCurrentCost(rule, numberItems) {
      const cost = Math.floor(numberItems / rule.number) * rule.cost;
      const remainder = (numberItems % rule.number);

      return {
        remainder,
        cost,
      }
    }

    return Object.keys(this._cart).reduce((totalForItem, currItem) => {
      let numberTotal = this._cart[currItem];
      const currItemRule = this._RULES[currItem];
      return currItemRule.reduce((totalForRule, curr) => {
        const result = getCurrentCost(curr, numberTotal);
        numberTotal = result.remainder;
        return result.cost + totalForRule;
      }, 0) + totalForItem;
    }, 0);
  }

  // Add items to cart
  scan(item) {
    if (this._cart[item]) {
      this._cart[item] += 1;
    } else {
      this._cart[item] = 1;
    }
  }
}

module.exports = CheckOut;
