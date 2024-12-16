console.log("hello");

// Declare a variable
let number = 10;
const name = "hello";
var age = 25; 


// sum function
function sum(a, b) {
    return a + b;
}
console.log(sum(5, 10));

// arrow function
const multiply = (a, b) => a * b;
console.log(multiply(5, 3));

// Anonymous Function
const divide = function(a, b) {
    return a / b;
};
console.log(divide(10, 2));

// Array Operations map
const numbers = [1, 2, 3, 4];
const squares = numbers.map(num => num * num);
console.log(squares);

// Array Operations filter
const numbers2 = [1, 2, 3, 4, 5];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log(evenNumbers);

// foreach
const numbers3 = [1, 2, 3];
numbers3.forEach(num => console.log(num));

// map,filter
const numbers4 = [1, 2, 3, 4, 5];
const result = numbers4
    .filter(num => num % 2 !== 0) 
    .map(num => num * 2); 
console.log(result); 

// sum in array
function arraySum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
const numbers5 = [10, 20, 30];
console.log(arraySum(numbers5));
