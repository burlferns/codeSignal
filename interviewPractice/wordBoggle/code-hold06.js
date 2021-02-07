function wordBoggle(board, words) {
    //Sort the words in words array alphabetically
    words.sort();

    //Find the number of rows and columns of the board
    const noRows = board.length;
    const noCols = board[0].length;

    //Helper function to get neighbors of a letter
    function getNeighbors(coord) {
        const inputRow = coord[0];
        const inputCol = coord[1];

        const neighborList = [];

        //Get left neighbor
        if(inputCol-1>=0) {
            neighborList.push([inputRow,inputCol-1]);
        }

        //Get right neighbor
        if(inputCol+1<noCols) {
            neighborList.push([inputRow,inputCol+1]);
        }

        //Get top neighbor
        if(inputRow-1>=0) {
            neighborList.push([inputRow-1,inputCol]);
        }

        //Get bottom neighbor
        if(inputRow+1<noRows) {
            neighborList.push([inputRow+1,inputCol]);
        }

        //Get top left diagnol neighbor
        if(inputRow-1>=0 && inputCol-1>=0) {
            neighborList.push([inputRow-1,inputCol-1]);
        }

        //Get top right diagnol neighbor
        if(inputRow-1>=0 && inputCol+1<noCols) {
            neighborList.push([inputRow-1,inputCol+1]);
        }

        //Get bottom left diagnol neighbor
        if(inputRow+1<noRows && inputCol-1>=0) {
            neighborList.push([inputRow+1,inputCol-1]);
        }

        //Get bottom right diagnol neighbor
        if(inputRow+1<noRows && inputCol+1<noCols) {
            neighborList.push([inputRow+1,inputCol+1]);
        }

        return neighborList;
    }

    //Create neighbor hashTable to make function faster
    const neighborHT = new Map();
    for(let row=0; row<noRows; row++) {
        for(let col=0; col<noCols; col++) {
            const currCell = [row,col];
            const currCellHaskKey = `${currCell[0]},${currCell[1]}`;
            const currCellNeighbors = getNeighbors(currCell);
            neighborHT.set(currCellHaskKey,currCellNeighbors);
        }
    }


    //Function to do a Depth First Search
    //The arg word is the word to search for
    //The arg startStackItem has information about wherre to start the search
    //The arg nextcharIndex is the index of the char in word that is to searched for next
    function dfsSearch(word,nextCharIndex,startStackItem) {   
        //A stack item is an array with 3 elements
        //Elem 0 is the string found so far
        //Elem 1 is the coordinates of the last char in the string
        //Elem 3 is a Set of visited coordinates and contains the coordinates of the string found so far
        //Elem 4 is the index of the next char to search for in word
        const wordLen = word.length;         
        const stack = [ startStackItem ];
        

        while(stack.length>0) {
            const stackItem = stack.pop();
            const currString = stackItem[0];
            const lastCell = stackItem[1];
            const lastCellHashKey = `${currCell[0]},${currCell[1]}`;
            const currVisited = stackItem[2];
            const lastCellNeighbors =  neighborHT.get(lastCellHashKey);
            const nextChar = word[nextCharIndex];
            const continueSearch = false;

            for(let i=0; i<currCellNeighbors.length; i++) {
                const currNeighbor = currCellNeighbors[i];
                const currNeighHashKey = `${currNeighbor[0]},${currNeighbor[1]}`;
                if(board[currNeighbor[0]][currNeighbor[1]]===nextChar && !currVisited.has(currNeighHashKey)) {
                    const newString = currString + board[currNeighbor[0]][currNeighbor[1]];
                    const newCharIndex = nextCharIndex + 1;
                    if(newCharIndex===wordLen) return true;
                    continueSearch = true;

                }


            }

            if(!continueSearch) return false;




            /*********************************************************************** */


            const newString = currString + board[currCell[0]][currCell[1]];
            if(wordsMap.has(newString)) {
                wordsMap.set(newString,true);
            }

            currVisited.add(currCellHashKey);

             
            for(let i=0; i<currCellNeighbors.length; i++) {
                const currNeighbor = currCellNeighbors[i];
                const currNeighHashKey = `${currNeighbor[0]},${currNeighbor[1]}`;

                if(!currVisited.has(currNeighHashKey)) {
                    const newVisited = new Set(currVisited);
                    newVisited.add(currNeighHashKey);
                    stack.push([newString,currNeighbor,newVisited]);
                }
            }

            // console.log('stack =',stack);
            // console.log('wordsMap =',wordsMap);

        }



        
    }

    // console.log('wordsMap =',wordsMap);


    const output = [];
    for(const [key,value] of wordsMap) {
        if(value) output.push(key);
    }
    output.sort();
    return output;
}





let board = [
    ['R', 'L', 'D'],
    ['U', 'O', 'E'],
    ['C', 'S', 'O']
];

words = ["CODE", "SOLO", "RULES", "COOL"];

output = wordBoggle(board, words);

for(let i=0; i<output.length; i++) {
    console.log(output[i]);
}
