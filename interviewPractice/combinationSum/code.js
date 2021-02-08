/*



Given an array of integers a and an integer sum, find all of the unique combinations in a that add up to sum.
The same number from a can be used an unlimited number of times in a combination.
Elements in a combination (a1 a2 … ak) must be sorted in non-descending order, while the combinations themselves must be sorted in ascending order.
If there are no possible combinations that add up to sum, the output should be the string "Empty".

Example

For a = [2, 3, 5, 9] and sum = 9, the output should be
combinationSum(a, sum) = "(2 2 2 3)(2 2 5)(3 3 3)(9)".

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer a

An array of positive integers.

Guaranteed constraints:
2 ≤ a.length ≤ 11,
1 ≤ a[i] ≤ 9.

[input] integer sum

Guaranteed constraints:
1 ≤ sum ≤ 25.

[output] string

All possible combinations that add up to a given sum, or "Empty" if there are no possible combinations.









*/




function combinationSum(inputArray, sum) {
    //Sort the inputArray and remove duplicates
    inputArray.sort((a,b)=>a-b);
    const a = [inputArray[0]];
    for(let i=1; i<inputArray.length; i++) {
        if(inputArray[i]!==inputArray[i-1]) {
            a.push(inputArray[i]);
        }
    }


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

        // console.log('startDigit =',startDigit,' ** ','wholeAmtLeft =',wholeAmtLeft,' ** ','fracPart =',fracPart);


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

            for(let newStartIndex=startIndx+1; newStartIndex<aLen; newStartIndex++) {
                // console.log(`call recurse with: ${newTerm},${newSum},${newStartIndex}`)
                recurse(newTerm,newSum,newStartIndex);
            }
        }
    }


    for(let i=0; i<aLen; i++) {
        recurse('',0,i);
    }

    if(output==='') {
        output='Empty';
    }

    // console.log('output =',output);
    return output;
}
