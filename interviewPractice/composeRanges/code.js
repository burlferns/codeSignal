/*

Given a sorted integer array that does not contain any duplicates, return a summary of the number ranges it contains.

Example

For nums = [-1, 0, 1, 2, 6, 7, 9], the output should be
composeRanges(nums) = ["-1->2", "6->7", "9"].

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer nums

A sorted array of unique integers.

Guaranteed constraints:
0 ≤ nums.length ≤ 15,
-(231 - 1) ≤ nums[i] ≤ 231 - 1.

[output] array.string


*/


function composeRanges(nums) {
    if(nums.length===0) {
        return [];
    }

    if(nums.length===1) {
        return [""+nums[0]];
    }

    let minVal = nums[0];
    let maxVal = minVal;
    let output = [];


    for(let i=1; i<nums.length; i++) {
        if(nums[i]===nums[i-1]+1) {
            maxVal = nums[i];
        }
        else {
            if(maxVal===minVal) {
                output.push(""+minVal);
            }
            else {
                output.push(""+minVal+"->"+maxVal);
            }
            minVal = nums[i];
            maxVal = minVal;
        }

        if(i===nums.length-1) {
            if(maxVal===minVal) {
                output.push(""+minVal);
            }
            else {
                output.push(""+minVal+"->"+maxVal);
            }
        }
    }


    return output;
}
