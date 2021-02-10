const sumInRange = (nums, queries) => {

    // First we build a list of prefix sums. Each index i of prefixSums
    // contains the sum of the numbers nums[0] to nums[i].
    let partialSum = 0;
    const prefixSums = nums.map(n => partialSum += n);

    // For each query, find its sum by getting the difference between the
    // sum of nums[0 to query[0]] and nums[0 to query[1]].
    const mod = 1e9 + 7;
    return queries.reduce((total, query) => {
        total += prefixSums[query[1]] - (prefixSums[query[0] - 1] || 0);
        // Negative modulo works differently in JavaScript than math
        return total < 0 ? total + mod : total % mod;
    }, 0);
};

/*
 * Here is another approach which actually has a better best case time
 * complexity and the same worst case complexity as the prefix sum
 * approach. Consider the example nums = [ n ] x 10^5,
 * queries = [ [100, 100] ]. This solution would perform one iteration
 * within the nums array, whereas a prefix sum approach would have to
 * iterate over the entire nums array, even though only one number from
 * the array is being queried.
 */
const sumInRangeBetter = (nums, queries) => {

    // First we build a list to identify where the number of queries
    // to add changes. For example, if there was a query [ 2, 4 ],
    // the changes array would have a +1 at index 2 and a -1 at index 4.
    const changes = [];
    let start = Infinity,
        end = -Infinity;
    queries.forEach((query) => {
        changes[query[0]] = (changes[query[0]] || 0) + 1;
        changes[query[1] + 1] = (changes[query[1] + 1] || 0) - 1;
        // Keep track of the range covered by the queries because we may
        // not need to iterate through the entire nums array!
        if (query[0] < start) start = query[0];
        if (query[1] + 1 > end) end = query[1] + 1;
    });

    // For each value in nums, add it to the total query sum.
    // We keep a multiplier variable so we know how many queries include
    // the current index. When we come to a value in the changes array,
    // we update the multiplier.
    const mod = 1e9 + 7;
    let sum = 0,
        multiplier = 0;
    for (let i = start; i < end; i++) {
        multiplier += changes[i] || 0;
        sum += multiplier * nums[i];
        // Negative modulo works differently in JavaScript than math
        sum = sum < 0 ? sum + mod : sum % mod;
    }
    return sum;
};
