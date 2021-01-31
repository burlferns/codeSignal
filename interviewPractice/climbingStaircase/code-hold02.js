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




        if(currSum+1===n) {
            let solutionSteps = [...currSteps];
            solutionSteps.push(1);
            outSteps.push(solutionSteps);
        }
        else if(currSum+1<n) {
            let newSteps = [...currSteps];
            newSteps.push(1);
            let newSum = currSum + 1;
            let newStackItem = [newSteps,newSum];
            stack.push(newStackItem)
        }

        if(currSum+2==n) {
            let solutionSteps = [...currSteps];
            solutionSteps.push(2);
            outSteps.push(solutionSteps);
        }
        else if(currSum+2<n) {
            let newSteps = [...currSteps];
            newSteps.push(2);
            let newSum = currSum + 2;
            let newStackItem = [newSteps,newSum];
            stack.push(newStackItem)
        }

    }



    return outSteps.reverse();
}
