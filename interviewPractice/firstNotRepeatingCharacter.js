/*

Given a string s consisting of small English letters, find and return the first instance of a non-repeating character in it. If there is no such character, return '_'.

Example

For s = "abacabad", the output should be
firstNotRepeatingCharacter(s) = 'c'.

There are 2 non-repeating characters in the string: 'c' and 'd'. Return c since it appears in the string first.

For s = "abacabaabacaba", the output should be
firstNotRepeatingCharacter(s) = '_'.

There are no characters in this string that do not repeat.

Input/Output

[execution time limit] 4 seconds (js)

[input] string s

A string that contains only lowercase English letters.

Guaranteed constraints:
1 ≤ s.length ≤ 105.

[output] char

The first non-repeating character in s, or '_' if there are no characters that do not repeat.




*/



function firstNotRepeatingCharacter(s) {
  const stringLength = s.length;
  const codeForA = "a".charCodeAt(0);

  // Spec says that the chars are all lowercase English letters.
  // So initialize a 26 element long array that counts characters
  // Each element in the array is a sub-array itself. The first element
  // in the sub-array is the count of the character. The second element
  // in the sub-array is the min index that the character occurs. If
  // the character does not occur, its sub-array will be [0,-1]
  const countArray = [];
  for(let i=0; i<26; i++) {
    countArray.push([0,-1]);
  }

  //Go through the string and fill the count array
  for(let i=0; i<stringLength; i++) {
    const currentCharCode = (s.charCodeAt(i)-codeForA);
    if(countArray[currentCharCode][0]===0) {
      countArray[currentCharCode] = [1,i];
    }
    else {
      countArray[currentCharCode][0]++;
    }
  }

  let minNonRepeatingIndex = stringLength;
  let minNonRepeatingChar = '_';
  //Go to the count array and find the min repeating char
  for(let i=0; i<26; i++) {
    if( countArray[i][0]===1 && countArray[i][1]<minNonRepeatingIndex) {
      minNonRepeatingIndex = countArray[i][1];
      minNonRepeatingChar = String.fromCharCode(codeForA + i);
    }
  }

  return minNonRepeatingChar;

}
