// ==== Module#1 Basics ====
mocha.setup('bdd');
const expect = chai.expect;

// ==== Change the capitalization of all letters in a string ====
const changeCase = (str) => { 
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if(isUpperCase(char)) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }
  return result;
};

function isUpperCase(char) {
  return char == char.toUpperCase();
}
function convertChar(c) {
  return isUpperCase(c) ? c.toLowerCase() : c.toUpperCase();
}

const changeCase2 = (str) => {
  return [...str]  //transform string to array of chars
    .map(c => convertChar(c))
    .join("");  //collect
};


describe('changeCase', () => {
  it('should change the capitalization of all letters in a given string', () => {
    expect(changeCase('21century')).to.equal('21CENTURY');
    expect(changeCase('Hybris')).to.equal('hYBRIS');
    expect(changeCase2('21century')).to.equal('21CENTURY');
    expect(changeCase2('Hybris')).to.equal('hYBRIS');
  });  
});

// ==== Filter out the non-unique values in an array ====
const filterNonUnique = (arr) => {
  let map = new Map();
  for(let elem of arr) {
    if(map.has(elem)) {
      map.set(elem, true);
    } else {
      map.set(elem, false);
    }
  }
  return [...map]
    .filter( ([key, value]) => value === false )
    .map(([key, value]) => key);
};

describe('filterNonUnique', () => {
  it('should filter out non-unique values in an array', () => {
    expect(filterNonUnique([1, 2, 2, 3, 4, 4, 5])).to.eql([1,3,5]);
    expect(filterNonUnique([1, 2, 3, 4])).to.eql([1,2,3,4]);
  });
});

// ==== Sort string in alphabetical order ====
const alphabetSort = (str) => {return[...str].sort().join("")};

describe('alphabetSort', () => {
  it('should accept a string type only', () => {
    expect(() => alphabetSort()).to.throw();
    expect(() => alphabetSort('Text')).not.to.throw();
  });

  it('should convert the letters of a given string in alphabetical order', () => {
    expect(alphabetSort('Python')).to.equal('Phnoty');
  });
});

// ==== Get min integer ====
const getSecondMinimum = (arr) => {return arr.sort()[1]};

describe('getSecondMinimum', () => {
  it('should get array of integers and return second minimum value', () => {
    expect(getSecondMinimum([5,0,7,3,8])).to.equal(3);
  });
});

// ==== Double every even integer ====
const doubleEveryEven = (arr) => { 
  return arr.map(e => e % 2 === 0 ? e*2 : e);
};

describe('doubleEveryEven', () => {
  it('should get array of integers and return another array of integers where every even number is doubled', () => {
    expect(doubleEveryEven([2,0,7,3,8,4])).to.eql([4,0,7,3,16,8]);
  });
});

// ==== Create array with all possible pairs of two arrays ====
const getArrayElementsPairs = (a1, a2) => {
  let result = new Array();
  for(let e1 of a1) {
    for(let e2 of a2) {
      result.push([e1, e2]);
    }
  }
  return result;
};

describe('getArrayElementsPairs', () => {
  it('should get two arrays and return array containing each possible pair from the arrays', () => {
    expect(getArrayElementsPairs([1,2], ['a', 'b'])).to.eql([[1, "a"], [1, "b"], [2, "a"], [2, "b"]]);
  });
});

// ==== Deep equal ====
const deepEqual = (a1 , a2) => {  
  if(Object.entries(a1).length != Object.entries(a2).length) {
    //console.log("lengths are not equal " + Object.entries(a1).length + "  "  + Object.entries(a2).length);
    return false;
  }  
  for (let [key, value] of Object.entries(a1)) {
    //console.log("iterate of " + key + " ; " + value );
    if(typeof value === 'object' && value !== null) {
      //console.log("inside comparing objects " + value + " ; " + a2[key]);      
      let innerObjTheSame = deepEqual(value, a2[key]);
      //console.log("result of comparing " + innerObjTheSame);
      if(!innerObjTheSame) {
        //console.log("returning false because of " + innerObjTheSame);
        return false;
      }
    }
    else if(value !== a2[key]) {
      //console.log("returning false because of value !== a2[key]   " + value + " ; " + a2[key]);
      return false;    
    }  
  }
  return true;
};

describe('deepEqual', () => {
  let obj = {here: {is: "an"}, object: 2};
  it('should get two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal', () => {
    expect(deepEqual(obj, obj)).to.eql(true);    
    expect(deepEqual(obj, {here: 1, object: 2})).to.eql(false);
    expect(deepEqual(obj,  {here: {is: "an"}, object: 2})).to.eql(true);
  }); 
});

function isString(input) {
  return Object.prototype.toString.call(input) === "[object String]";
}
function isArray(input) {
  return Array.isArray(input);
}
// ==== Format date ====
const formatDate = (input) => {
  if (isString(input)) {
    var date = new Date(input);
  }
  else if(Object.prototype.toString.call(input) === '[object Date]') {
    var date = input;
  }
  else if(typeof input == 'number') {
    var date = new Date();
    date.setTime(input);
  }
  else if(isArray(input)) {
    var date = new Date(...input);    
  }
  let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
  let monthUnformatted = date.getMonth()+1
  let month =  monthUnformatted < 10 ? "0"+monthUnformatted : monthUnformatted;
  let year = date.getFullYear().toString().substr(-2);
  let formatted = day+"."+month+"."+year;
  console.log(formatted);
  return formatted;
};

describe('formatDate', () => {
  it('should take parameter of different types and returns date in ‘dd.mm.yy’ format', () => {
    expect(formatDate('2011-10-02')).to.eql('02.10.11');    
    expect(formatDate(1234567890000)).to.eql('14.02.09');
    expect(formatDate([2014, 0, 1])).to.eql('01.01.14');
    expect(formatDate(new Date(2014, 0, 1))).to.eql('01.01.14');
  });
});


mocha.run();