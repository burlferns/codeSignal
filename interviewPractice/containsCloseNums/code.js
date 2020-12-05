/*

Given an array of integers nums and an integer k, determine whether there are two distinct indices i and j in the array where nums[i] = nums[j] and the absolute difference between i and j is less than or equal to k.

Example

For nums = [0, 1, 2, 3, 5, 2] and k = 3, the output should be
containsCloseNums(nums, k) = true.

There are two 2s in nums, and the absolute difference between their positions is exactly 3.

For nums = [0, 1, 2, 3, 5, 2] and k = 2, the output should be
containsCloseNums(nums, k) = false.

The absolute difference between the positions of the two 2s is 3, which is more than k.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer nums

Guaranteed constraints:
0 ≤ nums.length ≤ 55000,
-231 - 1 ≤ nums[i] ≤ 231 - 1.

[input] integer k

Guaranteed constraints:
0 ≤ k ≤ 35000.

[output] boolean




*/


function containsCloseNums(nums, k) {
    //The key in this hashtable will be the number element from nums
    //The value will be an array storing the indicies that the element
    //is located in nums. It will be in ascending order so that the
    //delta between adjacent value array elemets can be checked if less
    //than or equal to k
    let hashTable = new Map();

    for(let i=0; i<nums.length; i++) {
        let numElem = nums[i];
        if(hashTable.has(numElem)) {
            let valueArray = hashTable.get(numElem);
            let lastValueElem = valueArray[valueArray.length-1];
            if((i-lastValueElem)<=k) {
                return true;
            }
            valueArray.push(i);
            hashTable.set(numElem,valueArray);
        }
        else {
            let valueArray = [i];
            hashTable.set(numElem,valueArray);
        }
    }

    return false;
}
