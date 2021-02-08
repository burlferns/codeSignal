function combinationSum(a, sum) {
    let output = '';
    const aLen = a.length;

    function createNewTermString(digit,count) {
        let outputTerm = `(${digit}`
        for(let i=1; i<count; i++) {
            outputTerm = outputTerm + ' ' + digit;
        }
        return outputTerm;
    }

    function addNewTermString(currTerm,digit,count) {
        for(let i=0; i<count; i++) {
            currTerm = currTerm + ' ' + digit;
        }
        return currTerm;
    }

    //The arg currTerm is a string that has the current sum terms so far. It
    //will start with a '(' and have digits in it seperated by spaces, but it will
    //not end with a ')'
    //The arg currSum is the current sum so far
    //The startIndex is the index of 'a' specifying the first digit to begin to use to reach the final
    //sum for the curent recurse call. The digits to try for the current recurse call are from the first to
    //the last
    function recurse(currTerm,currSum,startIndx) {
        const startDigit = a[startIndx];
        const amountLeft = sum-currSum; //Amount remaining to make the whole sum
        if(amountLeft<startDigit) {
            return;
        }

        //Number of whole startDigits in the amountLeft in the sum
        let wholeAmtLeft = Math.floor(amountLeft / startDigit);

        //Remainder left when amountLeft is divided by startDigit
        const fracPart = amountLeft % startDigit;

        console.log('startDigit =',startDigit,' ** ','wholeAmtLeft =',wholeAmtLeft,' ** ','fracPart =',fracPart);


        //If there is no fractional part, then adding only the startDigit repeatedly
        //can cover the amountLeft
        if(fracPart===0) {
            let outputTerm = '';
            if(currTerm==='') {
                outputTerm = createNewTermString(startDigit,wholeAmtLeft);
            }
            else {
                outputTerm = addNewTermString(currTerm,startDigit,wholeAmtLeft)
            }
            outputTerm = outputTerm + ')';
            output = output + outputTerm;
            wholeAmtLeft--;
        }

        if(startIndx+1===aLen) {
            return;
        }

        for(let i=wholeAmtLeft; i>=1; i--) {
            let newTerm = null;
            if(currTerm==='') {
                newTerm = createNewTermString(startDigit,i);
            }
            else {
                newTerm = addNewTermString(currTerm,startDigit,i)
            }

            const newSum = currSum + startDigit * i;
            console.log(`call recurse with: ${newTerm},${newSum},${startIndx+1}`)
            recurse(newTerm,newSum,startIndx+1);
        }
    }




    recurse('',0,0);

    console.log('output =',output)
}
