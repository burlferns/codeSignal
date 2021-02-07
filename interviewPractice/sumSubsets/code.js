/*

Given a sorted array of integers arr and an integer num, find all possible unique subsets of arr that add up to num. Both the array of subsets and the subsets themselves should be sorted in lexicographical order.

Example

For arr = [1, 2, 3, 4, 5] and num = 5, the output should be
sumSubsets(arr, num) = [[1, 4], [2, 3], [5]].

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer arr

A sorted array of integers.

Guaranteed constraints:
0 ≤ arr.length ≤ 50,
1 ≤ arr[i] ≤ num.

[input] integer num

A non-negative integer.

Guaranteed constraints:
0 ≤ num ≤ 1000.

[output] array.array.integer

A sorted array containing sorted subsets composed of elements from arr that have a sum of num. It is guaranteed that there are no more than 1000 subsets in the answer.


*/



function sumSubsets(arr, num) {
    const arrLen = arr.length;
    if(arrLen===0) return [[]];

    const allSolutions = new Map();

    function recurse(currSolution,currHashKey,currSum,indxStart) {
        for(let i=indxStart; i<arrLen; i++) {
            if(currSum+arr[i]===num) {
                const oneSolution = [...currSolution];
                oneSolution.push(arr[i]);
                const solutionHashKey = currHashKey + arr[i];
                if(!allSolutions.has(solutionHashKey)) {
                    allSolutions.set(solutionHashKey,oneSolution);
                }
                // console.log('pushedSolution =',oneSolution)
            }
            if(currSum+arr[i]<num) {
                const updatedSolution = [...currSolution];
                updatedSolution.push(arr[i]);
                const updatedHashKey = currHashKey + arr[i] + ',';
                const updatedSum = currSum+arr[i];
                const updatedIndxStart = i+1;

                // console.log('upSolution =',updatedSolution,' ** ',
                //     'upSum =',updatedSum,' ** ',
                //     'upIndxStart =',updatedIndxStart,
                // )

                recurse(updatedSolution,updatedHashKey,updatedSum,updatedIndxStart);
            }
        }


    }


    recurse([],'',0,0);

    const output = [];
    for(const [key,value] of allSolutions) {
        output.push(value);
    }

    if(output.length===0) return [[]];

    return output;
}
