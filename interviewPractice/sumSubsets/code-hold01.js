function sumSubsets(arr, num) {
    const arrLen = arr.length;
    if(arrLen===0) return [[]];

    const output = [];

    function recurse(currSolution,currSum,indxStart) {
        for(let i=indxStart; i<arrLen; i++) {
            if(currSum+arr[i]===num) {
                const oneSolution = [...currSolution];
                oneSolution.push(arr[i]);
                output.push(oneSolution);
                // console.log('pushedSolution =',oneSolution)
            }
            if(currSum+arr[i]<num) {
                const updatedSolution = [...currSolution];
                updatedSolution.push(arr[i]);
                const updatedSum = currSum+arr[i];
                const updatedIndxStart = i+1;

                // console.log('upSolution =',updatedSolution,' ** ',
                //     'upSum =',updatedSum,' ** ',
                //     'upIndxStart =',updatedIndxStart,
                // )

                recurse(updatedSolution,updatedSum,updatedIndxStart);
            }
        }



    }


    recurse([],0,0);
    return output;
}
