function splitInput(str){
   let string = JSON.stringify(str)
   let numbers = string.match(/\d+/g);
   const value1 = numbers[0];
   const value2 = numbers[1];
   const operand = string.match(/[+\-*/]/g);
   return value2
}

console.log(splitInput("25*50"))

let input = document.querySelector(".current-operand")

function appendToDisplay(value){
   input.value += value;
}

function clearDisplay(){
   input.value = ""
}

function calculate(){
   result = eval(input.value);
   input.value = result;

}