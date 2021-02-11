/*
    This funciton chooses the answer with the highest left bound
*/
// function findLongestSubarrayBySum(s, arr) {
//     let frontPtr = 0;
//     let backPtr = 0;
//     let rollSum = arr[0];
//     const arrLen = arr.length;
//     let doSubtract = false;
//     let doAdd = false;

//     const resultMap = new Map();
//     let maxLowerBound = 0;

//     while(frontPtr<arrLen && backPtr<arrLen) {
//         if(doAdd) {
//             rollSum = rollSum + arr[backPtr];
//             doAdd = false;
//         }
//         if(doSubtract) {
//             rollSum = rollSum - arr[frontPtr];
//             doSubtract = false;
//             frontPtr++;
//         }
//         if(rollSum===s) {
//             while(rollSum+arr[backPtr+1]===s) {
//                 backPtr++;
//             }
//             maxLowerBound = frontPtr;
//             resultMap.set(frontPtr,[frontPtr+1,backPtr+1]);
//             rollSum = rollSum - arr[frontPtr];
//             frontPtr++;
//             continue;
//         }
//         else if(rollSum>s) {
//             doSubtract = true;
//         }
//         else {   //rollSum<s
//             backPtr++;
//             doAdd = true;
//         }
//         // console.log(`fP=${frontPtr},bP=${backPtr},doA=${doAdd},doS=${doSubtract},rS=${rollSum}`);
//     }

//     if(resultMap.size===0) {
//         return [-1];
//     }
//     else {
//         return resultMap.get(maxLowerBound);
//     }
// }



/*
    This funciton chooses the answer with the lowest left bound
*/
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
            while(rollSum+arr[backPtr+1]===s) {
                backPtr++;
            }
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
