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
   * Helper functions - These helper functions are too slow when there are many words and parts 
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
  
  for(let i=0; i<words.length;i++) {
      let currWord = words[i];
      let longestLength = 0;
      let longestData = null;

      //Create wordHash. This is a hashtable, where the keys are the chars in word 
      //and values is an array of indicies of the chars
      let wordHash = new Map();
      for(let j=0;j<currWord.length;j++) {
          let currChar = currWord[j];
          let tempArray = wordHash.get(currChar);
          // console.log('tempArray =',tempArray)
          if(tempArray!==undefined) {
              tempArray.push(j)
              wordHash.set(currChar,tempArray);
          }
          else {
              wordHash.set(currChar,[j]);
          }
          // console.log('wordHash =',wordHash)
      }

      // console.log('wordHash =',wordHash)

      //Find whether or not part exists in word
      for(let j=0; j<parts.length;j++) {
          let currPart = parts[j];
          let checkResult = checkOccurFast(currWord,wordHash,currPart);
          
          // console.log('currWord,currPart,checkResult =',currWord,currPart,checkResult)
          
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

      // console.log('currWord,longestData =',currWord,longestData)

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
