//      1. DECLARING VARIABLES
// 1. Declare a variable age using let and assign it the value 25.
let age = 25;
// 2. Declare a variable schoolName using const and assign it "Greenwood High".
const schoolName = "Greenwood High";
// 3. Declare an empty array called studentsList.
const studentList = [];

// 4. What is the difference between let, const, and var when declaring variables?
//  Variables declared using let can be changed later
//  Variables declared using const cannot be changed
//  var is an old school way of declaring variables before ES6

//      2. NAMING CONVENTIONS 
// 5. Which of the following variable names is invalid?
// let $price = 100;
// let 1stPlace = "John";
// let _score = 89;
// let userName = "Alice";
//      let 1stPlace = "John"; is invalid because it starts with a number

// 6. Why is the following variable name incorrect?
//    const #taxRate = 0.16;
//    because it starts with a # not a letter, _ or $

// 7. Rewrite this variable name to follow best practices:
// let MyvariableNAME = "JavaScript";
// let myVariableName = "JavaScript";

//      3. IDENTIFYING DATA TYPES
/* 8. What will be the output of the following?
console.log(typeof "Hello");
console.log(typeof 99);
console.log(typeof true);
console.log(typeof undefined);

      Output of console.log(typeof "Hello"); is string
      Output of console.log(typeof 99); is number
      Output of console.log(typeof true); is boolean
      Output of console.log(typeof undefined); is undefined
*/

// 9. Identify the data types in this array:
// let data = ["Kenya", 34, false, { country: "USA" }, null];

// Data types in the array are: string, number, boolean, object, object

// 10. How do you define a BigInt in JavaScript? Provide an example
// BigInt is defined by adding an n at the end i.e let bigNumber = 5248545566655565n;

//      4. OBJECTS AND ARRAYS
/* 11. Create an object person with properties name, age, and city.
let person = {
            name: "Tim",
            age: 25,
            city: "Nyeri"
        }
    12. Add a new property email to the person object.
    person.email = '';
*/
// 13. Declare an array fruits with three fruit names. 
// let fruits = [apples, bananas, mangoes];

// 14. Access the second item in the fruits array.
// console.log(fruits[1]);

//      5.TYPE COERCION
// 15. What will be the output of the following?
// console.log("5" + 2);
// console.log("5" - 2);
//     console.log("5" + 2); = "52"
//     console.log("5" - 2); = 3;

// 16. Convert the string "100" into a number.
// let str = "100";
// let num = Number(str);

// 17. Convert the number 50 into a string. 
// let num = 50;
// let str = num.toString();

// 18. What will be the result of this operation? 
// console.log(5 + true); 
// outputs 6 since true is converted to 1 and false would be converted to 0




