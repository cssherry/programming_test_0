class CheckOut {
  constructor(RULES) {
    this._RULES = RULES;
    this._cart = {};
  }

  get total() {
    let numberTotal;


    return Object.keys(this._cart).reduce((totalForItem, currItem) => {
      numberTotal = this._cart[currItem];
      const currItemRule = this._RULES[currItem];
      return currItemRule.reduce(getTotalForItem, 0) + totalForItem;
    }, 0);

    // Helper function
    function getCurrentCost(rule) {
      const cost = Math.floor(numberTotal / rule.number) * rule.cost;
      const remainder = (numberTotal % rule.number);

      return {
        remainder,
        cost,
      };
    }

    function getTotalForItem(totalForRule, curr) {
      const result = getCurrentCost(curr);
      numberTotal = result.remainder;
      return result.cost + totalForRule;
    }
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
