function houseRobber(nums) {
    const length = nums.length;
    if (length === 0) {
        return 0;
    } else if (length === 1) {
        return nums[0];
    } else if (length === 2) {
        return Math.max(nums[0], nums[1]);
    }

    const memo = [];
    memo[0] = nums[0];
    memo[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < length; i++) {
        memo[i] = Math.max(nums[i] + memo[i - 2], memo[i - 1]);
    }


    return memo[length - 1];
}
