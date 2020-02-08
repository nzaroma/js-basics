// ==== Module#2 Functions ====
mocha.setup('bdd');
const expect = chai.expect;

// ==== Currying ====

function curry(f) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return f(a, b, c, d);
        };
      };
    };
  };
};

function joinFunction(...args) {
  return args.join(' ');
}

const mergeWords =  curry(joinFunction);

describe('mergeWords', () => {
  it('should merge words into sentence', () => {
    const result = mergeWords('GNU')('is')('not')('Unix.'); //removed function call, is it ok?

    expect(result).to.equal('GNU is not Unix.');
  });  
});

// ==== Every/Some ====
const goodUsers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
];

// `checkUsersValid` is the function you'll define
const checkUsersValid = (goodUsers) => {
  return function(usersToTest) {
    let absentUsers = usersToTest.filter( (user) => filterAbsentUser(user, goodUsers))
    return absentUsers.length === 0; 
  };
};

function filterAbsentUser(user, goodUsers) {
  if (goodUsers.some(e => e.id === user.id)) {
    return false;
  }
  return true;
}

const testAllValid = checkUsersValid(goodUsers);


describe('checkUsersValid', () => {
  it('#case 1', () => {
    const result = testAllValid([
      { id: 2 },
      { id: 1 },
    ]);

    expect(result).to.equal(true);
  });
  it('#case 2', () => {
    const result = testAllValid([
      { id: 2 },
      { id: 4 },
      { id: 1 },
    ]);

    expect(result).to.equal(false);
  });
});

// ==== Reduce ====
const reducer = (accumulator, currentValue) => { 
  if(accumulator[currentValue] === undefined) {
    accumulator[currentValue] = 1;
    return accumulator;
  }
  accumulator[currentValue] =accumulator[currentValue]+ 1;
  return accumulator;
}

const countWords = (words) => {
  return words.reduce(reducer, {})
};

describe('reduce', () => {
  it('should return an object which contains the number of times each string occured in the array', () => {
    const inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian'];
    const result = countWords(inputWords);
    expect(result).to.eql({ 'Apple': 2, 'Banana': 1, 'Durian': 3 });
  });  
});

// ==== Palindrome ====
function reverse(word) {
  return word.split('').reverse().join('');
}

const isPalindrome = (word) => {
  return word === reverse(word) ? 'The entry is a palindrome' : 'Entry is not a palindrome';
}

describe('isPalindrome', () => {
  it('should check whether a passed string is palindrome or not', () => {
    expect(isPalindrome('madam')).to.equal('The entry is a palindrome');
    expect(isPalindrome('fox')).to.equal('Entry is not a palindrome');
  });
});

// ==== Recursion ====
const factorial = (n) => {
  if(n < 0) return null;
  if(n===0 || n===1) {
    return 1;
  }
  return n*factorial(n - 1);
};

const amountToCoins = (n, coins, result=[]) => {    
  const fittedCoins = coins.filter( c => n/c >= 1);
  const maxCoin = Math.max(...fittedCoins);
  if (maxCoin === undefined || n === 0) return result;
  result.push(maxCoin);
  return amountToCoins(n-maxCoin, coins, result);  
};

const repeat = (fn, times) => {
  if(times === 0) return;
  fn();
  return repeat(fn, times - 1);
};

const reduce = (array, f, initialValue) => {
  var value = initialValue;
  for(let i = 0; i < array.length; i++) {
    value = f(value, array[i], i, array); 
  }
  return value; 
};

const reduce2 = (array, f, value, index=0) => {
  if(index >= array.length) return value;
  const newValue = f(value, array[index], index, array);
  return reduce2(array, f, newValue, ++index);
};


describe('Recursion', () => {
  describe('reduce', () => {
    it('should implement an Array reduce function', () => {
      const reduceFunction = function(prev, curr, index, arr) {
        return prev + curr;
      };
      const result = reduce([1,2,3], reduceFunction, 0);
      expect(result).to.equal(6);
      
      const result2 = reduce2([1,2,3], reduceFunction, 0);
      expect(result2).to.equal(6);
    });
  });
  
  describe('factorial', () => {
    it('should take a positive integer N as a parameter and print the result of N! (factorial)', () => {
      expect(factorial(1)).to.equal(1);
      expect(factorial(5)).to.equal(120);
    });
  });
  
  describe('amountToCoins', () => {
    it('should convert an amount to coins', () => {
      expect(amountToCoins(46, [25, 10, 5, 2, 1]))
         .to.eql([25, 10, 10, 1]);
    });
  });
  
  describe('repeat', () => {
    it('should take a function as its first argument, a number num as its second argument, then execute the passed in function num times', () => {
      sinon.spy(console, 'log');
      repeat(() => console.log('Wassup'), 5);
      const expected = [['Wassup'], ['Wassup'], ['Wassup'], ['Wassup'], ['Wassup']];

      expect(console.log.args).to.eql(expected);
    });
  });
  
  
});


mocha.run();