mocha.setup('bdd');
const expect = chai.expect;

// ======================Array to List======================
const arrayToList = (array) => {
  const result = {};
  if(!array) return result;  
  let link = result;
  for(let i = 0; i < array.length; i++) {
    link.value = array[i];
    if (array[i+1]) {
      link.rest = {};
      link = link.rest;
    } else {
      link.rest = null;
    }
  }
  return result;
};

const listToArray = (list, result = []) => {
  if(!list) return result;
  const value = list.value;
  result.push(value);
  if(list.rest !== null) {
    return listToArray(list.rest, result);
  }
  return result;  
};

let array = [1, 2, 3]
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

describe('arrayToList', () => {
  it('should create linked list from array', () => {
    const result = arrayToList([10, 20]);

    expect(result).to.eql({ value: 10, rest: { value: 20, rest: null } });
  });  
});

describe('listToArray', () => {
  it('should create array from linked list', () => {
    const result = listToArray(arrayToList([10, 20, 30]));

    expect(result).to.eql([10, 20, 30]);
  });  
});

// ======================Keys and values to list======================
const getKeyValuePairs = (obj) => {
  const result = [];
  if(!obj) return result;
  for(let [key, value] of Object.entries(obj)) {
    const arrayFromElement = [key, value];
    result.push(arrayFromElement);
  }
  return result;
};

const getKeyValuePairs2 = (obj) => {  
  if(!obj) return [];
  return Object.entries(obj).map(([key, value]) => [key, value]);
};

describe('getKeyValuePairs', () => {
  it('should convert object into a list of [key, value] pairs', () => {
    const result = getKeyValuePairs({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"});
    expect(result).to.eql([["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]]);
    
    const result2 = getKeyValuePairs2({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"});
    expect(result2).to.eql([["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]]);
  });  
});

// ======================Invert keys and values======================
const invertKeyValue = (obj) => {
  const result = {};
  if(!obj) return result;
  for(let [key, value] of Object.entries(obj)) {
    const value = obj[key];
    result[value] = key;
  }
  return result;
};

const invertKeyValue2 = (obj) => {
  if(!obj) return {};
  return  Object.entries(obj)
    .reduce(function (accum, [key, value]) {
      accum[value] = key;
      return accum;
    }, {}); 
};

describe('invertKeyValue', () => {
  it('should get a copy of the object where the keys have become the values and the values the keys', () => {
    const result = invertKeyValue({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"});
    expect(result).to.eql({"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"});
    
    const result2 = invertKeyValue2({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"});
    expect(result2).to.eql({"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"});
  });  
});

// ======================Get all methods from object======================
const getAllMethodsFromObject = (obj) => {
  const result = [];
  if(!obj) return result;
  const properties = Object.getOwnPropertyNames(obj);
  for (const prop of properties) {
    if (typeof obj[prop] === 'function') result.push(prop);
  }
  return result;
};

const getAllMethodsFromObject2 = (obj) => { return Object.getOwnPropertyNames(obj)
    .filter(p => typeof obj[p] === 'function');
};

describe('getAllMethodsFromObject', () => {
  it('should get all methods from an object', () => {
    const result = getAllMethodsFromObject(Math);

    expect(result).to.eql(["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc"]);
    expect(getAllMethodsFromObject2(Math)).to.eql(result);
  });  
});

// ======================Groups======================
class Groups {
  constructor(array) { this.array = Array.from(array); }
  static from(array) { return new Groups(Array.from(array)) };
  has(value) { return this.array.some(e => e === value)};
  add(value) { if(!this.array.includes(value)) this.array.push(value) };
  delete(value) { this.array = this.array.filter(e => e !== value) };
  get length() { return this.array.length; };  
}

describe('Groups', () => {
  it('should has one static method', () => {
    expect(Groups.from).to.be.an.instanceof(Function);    
  });  

  it('should be a class which creates an instance with three methods', () => {
    const group = Groups.from([10, 20]);
    
    expect(group.has).to.be.an.instanceof(Function);
    expect(group.add).to.be.an.instanceof(Function);
    expect(group.delete).to.be.an.instanceof(Function);
  });
  
  describe('has', () => {
    it('should check if item exists in group', () => {
      const group = Groups.from([10, 20]);
      
      expect(group.has(10)).to.equal(true);
      expect(group.has(30)).to.equal(false);    
    });
    it('should check if item exists in group "string"', () => {
      const group = Groups.from('ab');
      console.log(group)
      expect(group.has('a')).to.equal(true);
      expect(group.has('c')).to.equal(false);    
    });
    it('should check if item exists in group "map"', () => {
      let map = new Map([
        ['1',  'str1'],
        [true, 'bool1']
      ]);
      const group = Groups.from(map);
      console.log(group)
      expect(group.length).to.equal(2);
    });
  });
  
  describe('add', () => {
    it('should add item into a group', () => {
      const group = Groups.from([10, 20]);
      
      group.add(50);
      expect(group.has(50)).to.equal(true);
      expect(group.length).to.equal(3);
    });
    
    it('should not add duplicates', () => {
      const group = Groups.from([10, 20]);
      
      expect(group.length).to.equal(2);
      group.add(20);
      expect(group.has(20)).to.equal(true);
      expect(group.length).to.equal(2);
    });
  }); 
  
  describe('delete', () => {
    it('should check if item exists in group', () => {
      const group = Groups.from([10, 20]);
      
      expect(group.length).to.equal(2);
      group.delete(20);      
      expect(group.has(20)).to.equal(false);
      expect(group.length).to.equal(1);
    });
  });     
});

class Clock {
  run() {
    this.interval = setInterval(function() {
      console.log(new Date().toLocaleTimeString());
    }, 1000);
  }
  stop() { clearInterval(this.interval); }
}

mocha.run();