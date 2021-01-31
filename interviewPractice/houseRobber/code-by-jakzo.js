var houseRobber = nums =>
    nums.reduce((res, n) => [Math.max(res[0], n + res[1]), res[0]], [0, 0])[0];

// No DP required!
// res[0] = max result up to current point (max of robbing previous and skipping
//          current or skipping current and robbing previous)
// res[1] = result after skipping the previous house
