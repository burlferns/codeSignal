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
            //A subarray within the main array is the data for a row
            validPositions = [];

            //Initialize the 2D validPositions array
            const initializeRowArray = [];
            for(let i=0; i<n; i++) {
                initializeRowArray[i] = 1;
            }
            for(let i=0; i<n; i++) {
                validPositions.push([...initializeRowArray]);
            }
        }

        //Create the currentSolution array if it does not exist
        //which will be the case for the initial run of the
        //recurse function
        if(currSolution===undefined) {
            currSolution = [];
        }

        const currSolLen = currSolution.length;

        if(currSolLen===n) {
            output.push(currSolLen);
            return
        }


        //Gather all the valid row index positions in the
        //current column
        //The current column index is the value of currSolLen
        const validRowPositions = [];
        for(let i=0; i<n; i++) {
            if(validPositions[i][currSolLen]===1) {
                validRowPositions.push(i);
            }
        }

        //If there are no valid positions then terminate recursive
        //function
        if(validRowPositions.length===0) {
            return;
        }
        else {
            for(let i=0; i<validRowPositions.length; i++) {
                let currValidRowPos = validRowPositions[i];
                currSolution.push(currValidRowPos);

                //Mark the positions on the current row for
                //the rest of the columns as invalid due to
                //a placing of a queen on the current row and
                //current column
                let nextColumn = currSolLen + 1;
                while(nextColumn<n) {
                    validPositions[currValidRowPos][nextColumn];
                    nextColumn++;
                }

                //Mark the positions on the descending diagnol
                //for the rest of the columns as invalid due to
                //a placing of a queen on the current row and
                //current column
                let nextRow = currValidRowPos + 1;
                let nextColumn = currSolLen + 1;
                while(nextRow<n && nextColumn<n) {
                    validPositions[nextRow][nextColumn];
                    nextRow++;
                    nextColumn++;
                }

                //Mark the positions on the ascending diagnol
                //for the rest of the columns as invalid due to
                //a placing of a queen on the current row and
                //current column
                nextRow = currValidRowPos - 1;
                nextColumn = currSolLen + 1;
                while(nextRow>=0 && nextColumn<n) {
                    validPositions[nextRow][nextColumn];
                    nextRow++;
                    nextColumn++;
                }

                recurse(currSolution,validPositions);
            }

        }




    }

    recurse();
    return output;
}