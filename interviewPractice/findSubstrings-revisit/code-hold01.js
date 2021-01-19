function findSubstrings(words, parts) {
    /*******************************************************************************
     * Helper functions
     */
    function checkOccur(word,part) {
        for(let i=0; i<word.length; i++) {
            if(part[0]===word[i] && checkRest(word,part,i)) {
                return [i,i+part.length-1];
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
    const wordsInfo = []; //This will be an array of the same size as words and it
                        //will contain information about whether or not a word
                        //needs brackets

    for(let i=0; i<words.length-1;i++) {
        let currWord = words[i];
        let longestLength = 0;
        let longestData = null;
        for(let j=0; j<parts.length-1;j++) {
            let currPart = parts[j];
            let checkResult = checkOccur(currWord,currPart);
            if(checkResult!==null) {
                if(currPart.length>longestLength) {
                    longestData = new Map([currPart,checkResult]);
                    longestLength = currPart.length;
                }
                else if(currPart.length===longestLength) {
                    longestData.set([currPart,checkResult])
                }
            }
        }

        if(longestData===null) {
            wordsInfo[i] = null;
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
            wordsInfo[i] = earliestInfo;
        }
    }


    const wordsOut = [];
    for(let i=0;i<words.length)





}
