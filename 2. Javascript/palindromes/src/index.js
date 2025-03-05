// 1. Check if a String is a Palindrome
// Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).

function isPalindrome(str){
    let clean = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    return clean === clean.split('').reverse().join('')
}
console.log(isPalindrome('a man, a plan, a canal, panama'));
console.log(isPalindrome('Was it a car or a cat I saw?'));
console.log(isPalindrome('Hello, World!'));

// 2. Reverse a String
// Write a function to reverse a given string.

function reversed(str){
    return str.split('').reverse().join('')
}
console.log(reversed('a man, a plan, a canal, panama'));

// 3. Find the Longest Palindromic Substring
// Write a function to find the longest palindromic substring in a given string.

function is_Palindrome(str) {
    return str === str.split('').reverse().join('');
}

function longestPalindromicSubstring(str) {
    let longest = '';

    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) { 
            let substring = str.substring(i, j + 1); 

            if (is_Palindrome(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }

    return longest;
}

console.log(longestPalindromicSubstring('babad'));
console.log(longestPalindromicSubstring('cbbd'));



// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.
function areAnagrams(str1, str2){
    let clean1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '')
    let clean2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '')
    if(clean1.length !== clean2.length){
        return false
    }
    clean1 = clean1.split('').sort().join('')
    clean2 = clean2.split('').sort().join('')

    return clean1 === clean2
}

console.log(areAnagrams('Listen', 'Silent'));
console.log(areAnagrams('Hello', 'World'));

// 5. Remove Duplicates from a String
// Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.

function removeDuplicates(str){
    let result = "";
    let found = new Set();
    for(let i=0; i < str.length; i++){
        let char = str[i];
        
        if(!found.has(char)){
            result += char
            found.add(char)
        }
    }
    return result;
}
console.log(removeDuplicates('programming'));
console.log(removeDuplicates('hello world'));
console.log(removeDuplicates('aaaaa'));
console.log(removeDuplicates('abcd'));
console.log(removeDuplicates('aabbcc'));

// 6. Count Palindromes in a String
// Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.

function isAPalindrome(str){
const cleanString = str.toLowerCase().replace(/[^a-z0-9]/g, '');
return cleanString === cleanString.split('').reverse().join('')
} 

function countPalindromes(str){
    let count = 0;
    for(let i=0; i < str.length; i++){
        for(let j=i +1; j <= str.length; j++){
            let substring = str.substring(i, j);
            if(isAPalindrome(substring)){
                count++
            }
        }
    }
     return count;
}

console.log(countPalindromes('ababa'));
console.log(countPalindromes('racecar'));
console.log(countPalindromes('aabb'));
console.log(countPalindromes('a'));
console.log(countPalindromes('abc'));

// 7. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

function longestCommonPrefix(arr){

    arr.sort();

    let first = arr[0];
    let last = arr[arr.length - 1];
    let minLength = Math.min(first.length, last.length);
    let i = 0;
    
    while (i < minLength && first[i] === last[i]) {
        i++;
    }

    return first.substring(0, i);
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']) );
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate']));
console.log(longestCommonPrefix(['prefix', 'prefixes', 'preform']));
console.log(longestCommonPrefix(['apple', 'banana', 'cherry']));

// 8. Case Insensitive Palindrome
// Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.

function isCaseSensitivePalindrome(str){
    let clean = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    return clean === clean.split('').reverse().join('')
}
console.log(isCaseSensitivePalindrome('Aba'));
console.log(isCaseSensitivePalindrome('Racecar'));
console.log(isCaseSensitivePalindrome('Palindrome'));
console.log(isCaseSensitivePalindrome('Madam'));
console.log(isCaseSensitivePalindrome('Hello'));