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
    function dfsSearch(word,startStackItem) {   
        //A stack item is an array with 3 elements
        //Elem 0 is the string found so far
        //Elem 1 is the coordinates of the last char in the string
        //Elem 2 is a Set of visited coordinates and contains the coordinates of the string found so far
        //Elem 3 is the index of the next char to search for in word
        const wordLen = word.length;         
        const stack = [ startStackItem ];
        

        while(stack.length>0) {
            const stackItem = stack.pop();
            const currString = stackItem[0];
            const lastCell = stackItem[1];
            const lastCellHashKey = `${lastCell[0]},${lastCell[1]}`;
            const currVisited = stackItem[2];
            const nextCharIndex = stackItem[3];
            const nextChar = word[nextCharIndex];
            const lastCellNeighbors =  neighborHT.get(lastCellHashKey);
            let continueSearch = false;

            for(let i=0; i<lastCellNeighbors.length; i++) {
                const neighbor = lastCellNeighbors[i];
                const neighHashKey = `${neighbor[0]},${neighbor[1]}`;
                if(board[neighbor[0]][neighbor[1]]===nextChar && !currVisited.has(neighHashKey)) {
                    const newString = currString + board[neighbor[0]][neighbor[1]];
                    const newNextCharIndex = nextCharIndex + 1;
                    if(newNextCharIndex===wordLen-1) return true;
                    continueSearch = true;

                    //Build the next stack item and push into stack as we have to continue searching
                    const newCurrVisted = new Set(currVisited);
                    newCurrVisted.add(neighHashKey)
                    stack.push([newString,neighbor,newCurrVisted,newNextCharIndex]);
                }
            }

            if(!continueSearch) return false;
        }
    }

    //Create hashTable of key=(board cell char), value=(array of board coord)
    const charCoordHT = new Map();
    for(let row=0; row<noRows; row++) {
        for(let col=0; col<noCols; col++) {
            const currCell = [row,col];
            const currCellChar = board[currCell[0]][currCell[1]];
            let valueContents = charCoordHT.get(currCellChar);
            if(valueContents) {
                valueContents.push(currCell);
            }
            else {
                charCoordHT.set(currCellChar,[currCell]);
            }
        }
    }

    //Main code to run the algorithm
    const output = [];
    for(const word of words) {
        const firstChar = word[0];
        const firstCharCoordAry = charCoordHT.get(firstChar);
        if(firstCharCoordAry) {
            if(word.length===1) {
                output.push(word);
            }
            else {

                for(const firstCharCord of firstCharCoordAry) {
                    const firstCharCordHashKey = `${firstCharCord[0]},${firstCharCord[1]}`;
                    const startStackItem = [firstChar,firstCharCord,new Set(firstCharCordHashKey),1];
                    const foundWord = dfsSearch(word,startStackItem);
                    if(foundWord===true) {
                        output.push(word);
                        break;
                    }
                }

            }
        }
    }
    
   
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
