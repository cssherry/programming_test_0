'use strict'

const assert = require('assert');
const CheckOut = require('../checkout.js');

const RULES = {
  A: [
    {
      number: 3,
      cost: 130,
    },
    {
      number: 1,
      cost: 50,
    },
  ],
  B: [
    {
      number: 2,
      cost: 45,
    },
    {
      number: 1,
      cost: 30,
    },
  ],
  C: [
    {
      number: 1,
      cost: 20,
    },
  ],
  D: [
    {
      number: 1,
      cost: 15,
    },
  ],
};

function price(goods) {
  const co = new CheckOut(RULES);
  goods.split('').forEach((item) => co.scan(item));
  return co.total;
}

describe('Testing the total function', () => {
  it('total single items', () => {
    assert.equal(0, price(''));
    assert.equal(50, price('A'));
    assert.equal(80, price('AB'));
    assert.equal(115, price('CDBA'));
  });

  it('total multiple A', () => {
    assert.equal(100, price('AA'));
    assert.equal(130, price('AAA'));
    assert.equal(180, price('AAAA'));
    assert.equal(230, price('AAAAA'));
    assert.equal(260, price('AAAAAA'));
  });

  it('total multiple combinations', () => {
    assert.equal(160, price('AAAB'));
    assert.equal(175, price('AAABB'));
    assert.equal(190, price('AAABBD'));
    assert.equal(190, price('DABABA'));
  });

  describe('Test Increments', () => {
    const co = new CheckOut(RULES);
    assert.equal(0, co.total);

    co.scan('A');
    assert.equal(50, co.total);
    co.scan('B');
    assert.equal(80, co.total);
    co.scan('A');
    assert.equal(130, co.total);
    co.scan('A');
    assert.equal(160, co.total);
    co.scan('B');
    assert.equal(175, co.total);
  });
});
