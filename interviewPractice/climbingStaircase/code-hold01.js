function climbingStaircase(n, k) {
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

        if(currSum+2==n) {
            let solutionSteps = [...currSteps].push(2);
            outSteps.push(solutionSteps);
        }
        else if(currSum+2<n) {
            let newSteps = [...currSteps].push(2);
            let newSum = currSum + 2;
            let newStackItem = [newSteps,newSum];
            stack.push(newStackItem)
        }

        if(currSum+1===n) {
            let solutionSteps = [...currSteps].push(1);
            outSteps.push(solutionSteps);
        }
        else if(currSum+1<n) {
            let newSteps = [...currSteps].push(1);
            let newSum = currSum + 1;
            let newStackItem = [newSteps,newSum];
            stack.push(newStackItem)
        }
    }



    return outSteps;
}
