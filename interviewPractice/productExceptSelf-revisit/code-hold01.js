function productExceptSelf(nums, m) {
    const numsLen = nums.length;
    let allSum = 1;

    //Find the sum of all the elements in nums
    for(let i=0; i<numsLen; i++) {
        allSum = allSum * nums[i];
    }

    console.log('allSum =',allSum)

    let g = 0;
    //Find g(nums)
    for(let i=0; i<numsLen; i++) {
        const currNum = nums[i];
        const f_i = allSum / currNum;
        const f_i_mod = f_i % m;
        g = g + (f_i % m);
        // console.log(`fi=${f_i},fiMod=${f_i_mod},g=${g}`)
    }

    // console.log('g =',g)

    return g % m;


}
