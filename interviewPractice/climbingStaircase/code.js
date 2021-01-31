/*

You need to climb a staircase that has n steps, and you decide to get some extra exercise by jumping up the steps. You can cover at most k steps in a single jump. Return all the possible sequences of jumps that you could take to climb the staircase, sorted.

Example

For n = 4 and k = 2, the output should be

climbingStaircase(n, k) =
[[1, 1, 1, 1],
 [1, 1, 2],
 [1, 2, 1],
 [2, 1, 1],
 [2, 2]]
There are 4 steps in the staircase, and you can jump up 2 or fewer steps at a time. There are 5 potential sequences in which you jump up the stairs either 2 or 1 at a time.

Input/Output

[execution time limit] 4 seconds (js)

[input] integer n

Guaranteed constraints:
0 ≤ n ≤ 10.

[input] integer k

Guaranteed constraints:
0 ≤ k ≤ n.

[output] array.array.integer

An array containing all of the possible sequences in which you could climb n steps by taking them k or fewer at a time.




*/



function climbingStaircase(n, k) {
    if(n===0) {
        return [[]];
    }

    //Each element in the sack will be an array
    //Each sub-array will have 2 elements
    //The first element will be another array of steps taken so far
    //The second element will be the sum of the steps taken so far
    const stack = [];

    //Initialize the stack
    stack.push([[],0])

    //This is the array whose elements are arrays, where the
    //sub-arrays are the series of possible steps
    const outSteps = [];

    while(stack.length>0) {
        let stackItem = stack.pop();
        let currSteps = stackItem[0];
        let currSum = stackItem[1];

        for(let i=1;i<=k;i++) {
            if(currSum+i===n) {
                let solutionSteps = [...currSteps];
                solutionSteps.push(i);
                outSteps.push(solutionSteps);
            }
            else if(currSum+i<n) {
                let newSteps = [...currSteps];
                newSteps.push(i);
                let newSum = currSum + i;
                let newStackItem = [newSteps,newSum];
                stack.push(newStackItem)
            }
        }

    }



    return outSteps.reverse();
}
