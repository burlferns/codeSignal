function arrayMaxConsecutiveSum2(inputArray) {
    if(inputArray.length===0) {
        return 0;
    }

    //Go through the array and find where:
    // 1)The biggest negative number is
    // 2)The continuous range of positive numbers and the maximum sum of all the positive ranges

    let maxNum = inputArray[0]; //maximum single number of all the numbers

    let inPosNumRange = false;
    let currentPosNumRangeSum = null;
    let maxPosNumRangeSum = null;

    for(let i=0; i<inputArray.length; i++) {
        const currNum = inputArray[i];
        if(currNum>maxNum) {
            maxNum = currNum;
        }

        if(currNum>0) {
            if(!inPosNumRange) {
                currentPosNumRangeSum = currNum;
                inPosNumRange = true;
            }
            else {
                currentPosNumRangeSum = currentPosNumRangeSum + currNum;
            }
        }

        if(currNum<0) {
            if(inPosNumRange) {
                if(maxPosNumRangeSum===null) {
                    maxPosNumRangeSum = currentPosNumRangeSum;
                }
                if(currentPosNumRangeSum>maxPosNumRangeSum) {
                    maxPosNumRangeSum = currentPosNumRangeSum;
                }
                inPosNumRange = false;
            }
        }

        console.log(`inPosNumRange=${inPosNumRange}, currentPosNumRangeSum=${currentPosNumRangeSum}, maxPosNumRangeSum=${maxPosNumRangeSum}`);

    }

    if(currentPosNumRangeSum!==null) {
        if(maxPosNumRangeSum===null) {
            maxPosNumRangeSum = currentPosNumRangeSum;
        }
        else if(currentPosNumRangeSum>maxPosNumRangeSum) {
            maxPosNumRangeSum = currentPosNumRangeSum;
        }
    }

    if(maxPosNumRangeSum!==null) {
        return maxPosNumRangeSum;
    }
    else {
        return maxNum;
    }


}
