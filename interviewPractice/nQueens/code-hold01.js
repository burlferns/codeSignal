function nQueens(n) {
    const output = [];

    function recurse(currSolution,validPositions) {

        //Create the validPositions 2D array if it does not exist
        //which will be the case for the initial run of the
        //recurse function
        if(validPositions===undefined) {
            //This is a 2D array of the same size as the chess board.
            //It indicates currently valid and invalid positions.
            //A valid position is specifed with a 1
            //An invalid position is specified with a 0
            //A subarray within the main array is the data for a column
            validPositions = [];

            //Initialize the 2D validPositions array
            const initializeColArray = [];
            for(let i=0; i<n; i++) {
                initializeColArray[i] = 1;
            }
            for(let i=0; i<n; i++) {
                validPositions.push([...initializeColArray]);
            }
        }

        //Create the currentSolution array if it does not exist
        //which will be the case for the initial run of the
        //recurse function
        if(currSolution===undefined) {
            currSolution = [];
        }

        const currSolLen = currSolution.length;

        while(currSolLen < n) {
            //Gather all the valid row index positions in the
            //current column
            //The current column index is the value of currSolLen
            const validRowPositions = [];
            for(let i=0; i<n; i++) {
                if(validPositions[currSolLen][i]===1) {
                    validPositions.push(i);
                }
            }

            //If there are no valid positions then terminate recursive
            //function
            if(validRowPositions.length===0) {
                return;
            }
            else {
                for(let i=0; i<validRowPositions.length; i++) {
                    currSolution.push(validRowPositions[i]);

                    //Find the invalid positions for rest of the
                    //columns after the current
                    
                }
            }

        }



    }





    console.log(validPositions);



}
