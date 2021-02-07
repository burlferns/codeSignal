/*

Here is my code, but it is not fast enough all test cases.

It is fast enough for test case 16, but not for test case 17

Look at coputhy's solution. It seems to be a very intuitive solution without using a trie.
It uses the fact that the part length is from 1 to 5 



*/







function findSubstrings(words, parts) {
  /*******************************************************************************
   * Helper functions - These helper functions are too slow when there are many words and parts
   */
  // function checkOccur(word,part) {

  //     for(let i=0; i<word.length; i++) {
  //         if(part[0]===word[i] && checkRest(word,part,i)) {
  //             return [i,i+part.length-1];
  //         }
  //     }
  //     return null;
  // }

  // function checkRest(word,part,indexWord) {
  //     indexWord++;
  //     for(let i=1; i<part.length; i++) {
  //         if(indexWord>word.length-1) {
  //             return false;
  //         }
  //         if(part[i]!==word[indexWord]) {
  //             return false;
  //         }
  //         indexWord++;
  //     }
  //     return true;
  // }


  /*******************************************************************************
   * Helper functions - These helper functions are too slow when there are many words and parts
   */
  // function checkOccur(word,part) {
  //     if(word.length<part.length) {
  //         return null;
  //     }

  //     for(let i=0; i<word.length; i++) {
  //         if(word.length-i<part.length) {
  //             return null;
  //         }
  //         if(part[0]===word[i] && checkRest(word,part,i)) {
  //             return [i,i+part.length-1];
  //         }
  //     }
  //     return null;
  // }

  // function checkRest(word,part,indexWord) {
  //     indexWord++;
  //     for(let i=1; i<part.length; i++) {
  //         if(indexWord>word.length-1) {
  //             return false;
  //         }
  //         if(part[i]!==word[indexWord]) {
  //             return false;
  //         }
  //         indexWord++;
  //     }
  //     return true;
  // }


  /*******************************************************************************
   * Helper functions
   */
  function checkOccurFast(word,wordHash,part) {
      if(word.length<part.length) {
          return null;
      }

      //The variable arrayFirstCharIndex is an array of all the index in word that has the
      //first char of part
      let arrayFirstCharIndex = wordHash.get(part[0]);
      if(arrayFirstCharIndex===undefined) {
          return null;
      }
      else {
          for(let i=0;i<arrayFirstCharIndex.length;i++) {
              let currIdx = arrayFirstCharIndex[i]
              if(checkRest(word,part,currIdx)) {
                  return [currIdx,currIdx+part.length-1];
              }
          }
      }

      return null;
  }

  function checkRest(word,part,indexWord) {
      indexWord++;
      for(let i=1; i<part.length; i++) {
          if(indexWord>word.length-1) {
              return false;
          }
          if(part[i]!==word[indexWord]) {
              return false;
          }
          indexWord++;
      }
      return true;
  }






  /*******************************************************************************
   * Main code
   */
  const wordsOut = []; //This is the output array

  //partsHash is a hashtable of the part elements in the part array. The key is the
  //first letter of a part and the value is an array of parts that begin with the
  //first letter.
  //This hashtable is created to speed up the search of which parts can be a substring
  //of a word
  let partsHash = new Map();
  for(let i=0;i<parts.length;i++) {
    let currPart = parts[i];
    let tempArray = partsHash.get(currPart[0]);
    if(tempArray!==undefined) {
      tempArray.push(currPart);
      partsHash.set(currPart[0],tempArray);
    }
    else {
      partsHash.set(currPart[0],[currPart]);
    }
  }


  for(let i=0; i<words.length;i++) {
      let currWord = words[i];
      let longestLength = 0;
      let longestData = null;

      //Create wordHash. This is a hashtable, where the keys are the chars in word
      //and values is an array of indicies of the chars in word
      //Also fill the partsToCheck array. This is a subset of the array of parts. It
      //consists of those parts that have a first letter that is also a letter in word
      //This way we only have to check the partsToCheck subset and not the whole parts set
      //thus speeding up this function
      let wordHash = new Map();
      let partsToCheck = [];
      for(let j=0;j<currWord.length;j++) {
          let currChar = currWord[j];

          //Populate wordHash
          let tempArray = wordHash.get(currChar);
          if(tempArray!==undefined) {
              tempArray.push(j)
              wordHash.set(currChar,tempArray);
          }
          else {
              wordHash.set(currChar,[j]);
          }

          //Populate partsToCheck
          let tempArray2 = partsHash.get(currChar);
          if(tempArray2!==undefined) {
            partsToCheck = partsToCheck.concat(tempArray2);
          }
      }





      //Further trim down the partsToCheck list to speed up function
      //Reject parts whose 2nd char does not exist in wordHash
      let partsToCheckLong = partsToCheck;
      partsToCheck = [];
      for(let j=0;j<partsToCheckLong.length;j++) {
        let currPart = partsToCheckLong[j];

        if(currPart[1]===undefined) {
          partsToCheck.push(currPart);
        }
        else if(wordHash.get(currPart[1])!==undefined) {
          partsToCheck.push(currPart);
        }
      }






      //Find whether or not part exists in word
      for(let j=0;j<partsToCheck.length;j++) {
          let currPart = partsToCheck[j];
          let checkResult = checkOccurFast(currWord,wordHash,currPart);

          if(checkResult!==null) {
              if(currPart.length>longestLength) {
                  longestData = new Map([[currPart,checkResult]]);
                  longestLength = currPart.length;
              }
              else if(currPart.length===longestLength) {
                  longestData.set(currPart,checkResult)
              }
          }
      }



      //Push value in wordsOut depending on if part exists in word
      if(longestData===null) {
          wordsOut.push(currWord);
      }
      else {
          let earliestIndex = 90000; //Biggest word length will be 10000
          let earliestInfo = null;
          for(let value of longestData.values()) {
              if(value[0]<earliestIndex) {
                  earliestIndex = value[0];
                  earliestInfo = value;
              }
          }
          let wordOut = "";
          for(let i=0;i<currWord.length;i++) {
              if(i===earliestInfo[0]) {
                  wordOut = wordOut + '[';
              }
              wordOut = wordOut + currWord[i];
              if(i===earliestInfo[1]) {
                  wordOut = wordOut + ']';
              }
          }
          wordsOut.push(wordOut);
      }
  }


  return wordsOut;
}
