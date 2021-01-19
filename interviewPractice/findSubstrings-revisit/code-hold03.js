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
    function checkOccurFast(wordHash,part) {
        
    }
    
    
    
    
    
    


    /*******************************************************************************
     * Main code
     */
    const wordsOut = []; //This is the output array

    for(let i=0; i<words.length;i++) {
        let currWord = words[i];
        let longestLength = 0;
        let longestData = null;
        for(let j=0; j<parts.length;j++) {
            let currPart = parts[j];
            let checkResult = checkOccur(currWord,currPart);
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
