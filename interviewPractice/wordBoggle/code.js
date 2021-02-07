/*


Boggle is a popular word game in which players attempt to find words in sequences of adjacent letters on a rectangular board.

Given a two-dimensional array board that represents the character cells of the Boggle board and an array of unique strings words, find all the possible words from words that can be formed on the board.

Note that in Boggle when you're finding a word, you can move from a cell to any of its 8 neighbors, but you can't use the same cell twice in one word.

Example

For

board = [
    ['R', 'L', 'D'],
    ['U', 'O', 'E'],
    ['C', 'S', 'O']
]
and words = ["CODE", "SOLO", "RULES", "COOL"], the output should be
wordBoggle(board, words) = ["CODE", "RULES"].

Example

Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.char board

A two-dimensional array of uppercase English characters representing a rectangular Boggle board.

Guaranteed constraints:
2 ≤ board.length ≤ 4,
2 ≤ board[i].length ≤ 4,
'A' ≤ board[i][j] ≤ 'Z'.

[input] array.string words

An array of unique English words composed only of uppercase English characters.

Guaranteed constraints:
0 ≤ words.length ≤ 100,
2 ≤ words[i].length ≤ 16,
'A' ≤ words[i][j] ≤ 'Z'.

[output] array.string

Words from words that can be found on the Boggle board without duplicates and sorted lexicographically in ascending order.





*/




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
        // console.log('stack =',stack);

        while(stack.length>0) {
            const stackItem = stack.pop();
            const currString = stackItem[0];
            const lastCell = stackItem[1];
            const lastCellHashKey = `${lastCell[0]},${lastCell[1]}`;
            const currVisited = stackItem[2];
            const nextCharIndex = stackItem[3];
            const nextChar = word[nextCharIndex];
            const lastCellNeighbors =  neighborHT.get(lastCellHashKey);

            for(let i=0; i<lastCellNeighbors.length; i++) {
                const neighbor = lastCellNeighbors[i];
                const neighHashKey = `${neighbor[0]},${neighbor[1]}`;
                if(board[neighbor[0]][neighbor[1]]===nextChar && !currVisited.has(neighHashKey)) {
                    const newString = currString + board[neighbor[0]][neighbor[1]];
                    const newNextCharIndex = nextCharIndex + 1;
                    if(newNextCharIndex===wordLen) return true;

                    //Build the next stack item and push into stack as we have to continue searching
                    const newCurrVisted = new Set(currVisited);
                    newCurrVisted.add(neighHashKey)
                    stack.push([newString,neighbor,newCurrVisted,newNextCharIndex]);
                }
                // console.log('neighborChar =',board[neighbor[0]][neighbor[1]]);
                // console.log('stack =',stack);
            }

        }

        return false;
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

    // const tempSet = new Set();
    // tempSet.add('2,2')
    // const startStackItem = ['A',[2,2],tempSet,1];
    // const foundWord = dfsSearch('APTER',startStackItem);
    // console.log('foundWord =',foundWord)

    return output;
}
