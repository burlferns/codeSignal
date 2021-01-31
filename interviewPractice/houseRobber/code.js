/*

You are planning to rob houses on a specific street, and you know that every house on the street has a certain amount of money hidden. The only thing stopping you from robbing all of them in one night is that adjacent houses on the street have a connected security system. The system will automatically trigger an alarm if two adjacent houses are broken into on the same night.

Given a list of non-negative integers nums representing the amount of money hidden in each house, determine the maximum amount of money you can rob in one night without triggering an alarm.

Example

For nums = [1, 1, 1], the output should be
houseRobber(nums) = 2.

The optimal way to get the most money in one night is to rob the first and the third houses for a total of 2.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer nums

An array representing the amount of money that each house on the street has.

Guaranteed constraints:
0 ≤ nums.length ≤ 100,
0 ≤ nums[i] ≤ 500.

[output] integer



*/


function houseRobber(nums) {
    if(nums.length===0) {
        return 0;
    }

    if(nums.length===1) {
        return nums[0];
    }

    //Create simple cache and initialize it
    let cache = [];
    cache[nums.length-1] = nums[nums.length-1];
    cache[nums.length-2] = Math.max(nums[nums.length-1],nums[nums.length-2]);

    let maxMoney = cache[nums.length-2];

    for(let i=nums.length-3; i>=0; i--) {
        cache[i] = Math.max(nums[i]+cache[i+2], cache[i+1]);
        if(cache[i]>maxMoney) {
            maxMoney = cache[i];
        }
    }

    return maxMoney;
}
