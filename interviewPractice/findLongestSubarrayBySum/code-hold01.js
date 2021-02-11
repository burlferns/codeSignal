function findLongestSubarrayBySum(s, arr) {
    let frontPtr = 0;
    let backPtr = 0;
    let rollSum = arr[0];
    const arrLen = arr.length;
    let doSubtract = false;
    let doAdd = false;

    while(frontPtr<arrLen && backPtr<arrLen) {
        if(doAdd) {
            rollSum = rollSum + arr[backPtr];
            doAdd = false;
        }
        if(doSubtract) {
            rollSum = rollSum - arr[frontPtr];
            doSubtract = false;
            frontPtr++;
        }
        if(rollSum===s) {
            return [frontPtr+1,backPtr+1];
        }
        else if(rollSum>s) {
            doSubtract = true;
        }
        else {   //rollSum<s
            backPtr++;
            doAdd = true;
        }
        // console.log(`fP=${frontPtr},bP=${backPtr},doA=${doAdd},doS=${doSubtract},rS=${rollSum}`);
    }

    return [-1];
}
