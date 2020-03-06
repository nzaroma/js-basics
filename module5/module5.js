function delay(t, s) {
  const promise = new Promise((resolve, reject) => {
   setTimeout(function() {
     if(s) console.log(s);
     resolve();
   }, t); 
  });
  return promise;
}


delay(1000).then(() => console.log('Hey!'));
delay(6000, "some").then(() => console.log("Hey!"));


function runPromisesInSeries(promises) {
  return promises.reduce((acc, value) => acc.then(value), Promise.resolve());
}

runPromisesInSeries([() => delay(1000, 'message in 1 sec'), 
                     () => delay(3000, 'message in 3 seconds')]
                   );

function Promise_all(promises) {
 return promises.reduce((acc, value) => {
   return acc.then(results => Promise.resolve(value).then(result => [...results, result]));   
 }, Promise.resolve([]))
}

Promise_all([]).then(array => {
 console.log("This should be []:", array);
});


function soon(val) {
  return new Promise(resolve => {       
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});


Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
 .catch(error => {
  if (error != "X") {
    console.log("Unexpected failure:", error);
  }
  console.log("failure:", error);
  });



let [...first10] = fibonacci(10);
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


function fibonacciPlain(number) {
  let array = Array(number).fill(0).map((v, i) => i);
  let res = array.reduce((accum, value) => {
    value <= 1 ? accum.push(value) : accum.push(accum[value - 1] + accum[value - 2]) 
    return accum
  }, []);
  return res;
}

function* fibonacciGenerator(i) {
    yield fibonacciPlain(i);  
}

function fibonacci(i) {
  return fibonacciGenerator(i).next().value;
}


const asyncTask1 = () => new Promise((resolve, reject) =>
setTimeout(() => resolve('first resolved'), 1000));
const asyncTask2 = () => new Promise((resolve, reject) =>
setTimeout(() => resolve('second resolved'), 1000));
const asyncTask3 = () => new Promise((resolve, reject) =>
setTimeout(() => reject('third rejected'), 1000));

helper(function* main() {
 try {
 const a = asyncTask1();
 yield a;
 // a.then(r => console.log(r))
   
 const b = asyncTask2();
 yield b;
 // b.then(r => console.log(r))
 
 // console.log("a=" + a);
 // console.log(b);
 const c = yield asyncTask3();
 } catch(e) {
 console.log('error happened ', e);
 }
});
// → ‘first resolved’
// → ‘second resolved’
// → ‘error happened third rejected’

async function helper(generator) {
  let gen = generator();
   gen.next().value.then(r => console.log(r))
  gen.next().value.then(r => console.log(r))
 gen.next().value.catch(r => console.log(r))
  
}
