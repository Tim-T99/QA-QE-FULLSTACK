/*
JavaScript String Practice Questions
1. Check String Input
○ Write a JavaScript function to check whether an 'input' is a string or not.
Test Data:
  console.log(is_string('w3resource')); // true
  console.log(is_string([1, 2, 4, 0])); // false
  
    function is_string(input){
    return typeof input === "string";
    }
 
2. Check Blank String
○ Write a JavaScript function to check whether a string is blank or not.
Test Data:
console.log(is_Blank('')); // true
○ console.log(is_Blank('abc')); // false
    function is_Blank(input){
    return input === ''
    }

3. String to Array of Words
○ Write a JavaScript function to split a string and convert it into an array of words.
○ Test Data:
console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]
    function string_to_array(input){
        return input.split(" ")
    }

4. Extract Characters
○ Write a JavaScript function to extract a specified number of characters from a
string.
○ Test Data:
console.log(truncate_string("Robin Singh", 4)); // "Robi"
    function truncate_string(input, num){
    let sliced = input.slice(0,num)
    return sliced;
    }

5. Abbreviate Name
○ Write a JavaScript function to convert a string into abbreviated form.
○ Test Data:
console.log(abbrev_name("Robin Singh")); // "Robin S."
    function abbrev_name(userName){
    let spaced = userName.indexOf(" ") + 2;
    let abbr = userName.slice(0, spaced)
    return abbr
}

6. Hide Email Address
○ Write a JavaScript function that hides email addresses to prevent unauthorized
access.
○ Test Data:
console.log(protect_email("robin_singh@example.com")); //
"robin...@example.com"

    function abbrev_name(userName){
        let isAdmin = false;
        if(!isAdmin){
            let start = userName.slice(0,5);
            let ending = userName.split("@")[1];
            let joined = start + "..." + "@" + ending;
            return joined
        }
        
    }

7. Parameterize String
○ Write a JavaScript function to parameterize a string.
○ Test Data:
console.log(string_parameterize("Robin Singh from USA.")); //
"robin-singh-from-usa"
        function string_parameterize(input){
        let words = input.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toLowerCase() + words[i].substr(1);
        }
        let result = words.join("-")
        return result
    }

8. Capitalize First Letter
○ Write a JavaScript function to capitalize the first letter of a string.
○ Test Data:
console.log(capitalize('js string exercises')); // "Js string exercises"
    function capitalize(input){
    let first = input.charAt(0)
    let capital = first.toUpperCase()
    let rest = input.slice(1)
    let joined = capital + rest
    return joined 
}

9. Capitalize Each Word
○ Write a JavaScript function to capitalize the first letter of each word in a string.
○ Test Data:
console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
    function capitalize_Words(input){
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    let result = words.join(" ")
    return result
    }

10. Swap Case
○ Write a JavaScript function that converts uppercase letters to lowercase and vice
versa.
○ Test Data:
console.log(swapcase('AaBbc')); // "aAbBC"
    function swapcase(input){
    let newLetters = " "
    for(var i = 0; i<input.length; i++){
        if(input[i] === input[i].toLowerCase()){
            newLetters += input[i].toUpperCase();
        }else {
            newLetters += input[i].toLowerCase();
        }
    }
        return newLetters
}

console.log(swapcase('AaBbc'));
11. Camelize String
○ Write a JavaScript function to convert a string into camel case.
○ Test Data:
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"
    function camelize(input){
  let first = input.split(" ")[0];
  let second = input.split(" ")[1];
  let joined = first + second
  return joined
    }

12. Uncamelize String
○ Write a JavaScript function to uncamelize a string.
Test Data:
console.log(uncamelize('helloWorld')); // "hello world"
○ console.log(uncamelize('helloWorld','-')); // "hello-world"
?   
// function uncamelize(str, separator = ' ') {
    let result = str[0]; 
    
    for(let i = 1; i < str.length; i++) {
        if(str[i] === str[i].toUpperCase()) {
            result += separator + str[i].toLowerCase();
        } else {
            result += str[i];
        }
    }
    return result;
}

 13. Repeat String
○ Write a JavaScript function to concatenate a given string n times.
○ Test Data:
console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
    function repeat(str, n){
    return str.repeat(n)
    };

14. Insert in String
○ Write a JavaScript function to insert a string within another string at a given
position.
Test Data:
console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
○ // "We are doing some JavaScript exercises."
    function insert(str, input, position){
    let result = str.substring(0, position) + input + str.slice(position);
    return result
}

15. Humanize Format
○ Write a JavaScript function that formats a number with the correct suffix (1st,
2nd, etc.).
○ Test Data:
console.log(humanize_format(301)); // "301st"
    function humanize_format(num){
 if (num % 100 >= 11 && num % 100 <= 13) return num + "th";
 
 switch (num % 10) {
   case 1: return num + "st";
   case 2: return num + "nd";
   case 3: return num + "rd";
   default: return num + "th";
 }
};

16. Truncate String with Ellipsis
○ Write a JavaScript function to truncate a string and append "...".
Test Data:
console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));
○ // "We are doing !!"
    const text_truncate = (str, length = str.length, ending = '...') =>
    str.length > length ? str.substring(0, length) + ending : str;

17. Chop String into Chunks
○ Write a JavaScript function to chop a string into chunks.
○ Test Data:
console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
    function string_chop(str, size = str.length){
    const chunks = [];
    for (let i = 0; i < str.length; i += size) {
      chunks.push(str.slice(i, i + size));
    }
    return chunks
}

18. Count Substring Occurrences
○ Write a JavaScript function to count occurrences of a substring in a string.
Test Data:
console.log(count("The quick brown fox jumps over the lazy dog", 'the'));
○ // Output: 2
    function count(str, search){
    str = str.toLowerCase();
    search = search.toLowerCase();
    return str.split(search).length - 1;
  }

19. Reverse Binary Representation
○ Write a JavaScript function that reverses the binary representation of a number
and returns its decimal form.
○ Test Data:
console.log(reverse_binary(100)); // 19
    function reverse_binary(num){
    const binary = num.toString(2);
    const reversed = binary.split('').reverse().join('');
    return parseInt(reversed,2);
   }

20. Pad String to Length
○ Write a JavaScript function to pad a string to a specified length.
○ Test Data:
console.log(formatted_string('0000', 123, 'l')); // "0123"
    function formatted_string(pad, str, dir){
    str = str.toString();
    if (str.length >= pad.length){
        return str
    }else{
        return dir === 'l' 
      ? pad.slice(0, pad.length - str.length) + str
      : str + pad.slice(0, pad.length - str.length);
    } 
   }
   console.log(formatted_string('0000', 1235484, 'l'));
*/