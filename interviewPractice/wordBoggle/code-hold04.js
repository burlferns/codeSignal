/*



This works, but it is too slow for test 8

Also even though I am using a Depth First Search, I
called the data structure I am using in the core algorithm
a queue. It is fixed in the next version





*/












function wordBoggle(board, words) {
    //Put the words in a map so lookup time is O(n)
    //The key in the map is the word
    //If a word does not exist, then its value in the map is false
    const wordsMap = new Map();
    for(let i=0; i<words.length; i++) {
        wordsMap.set(words[i],false);
    }

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


    //Main for loops to start search
    for(let startRow=0; startRow<noRows; startRow++) {
        for(let startCol=0; startCol<noCols; startCol++) {
            const startCell = [startRow,startCol];
            const visited = new Set();
            const queue = [ ['',startCell,visited] ];

            while(queue.length>0) {
                const queueItem = queue.pop();
                const currString = queueItem[0];
                const currCell = queueItem[1];
                const currCellHashKey = `${currCell[0]},${currCell[1]}`;
                let currVisited = queueItem[2];

                const newString = currString + board[currCell[0]][currCell[1]];
                if(wordsMap.has(newString)) {
                    wordsMap.set(newString,true);
                }

                currVisited.add(currCellHashKey);

                const currCellNeighbors = getNeighbors(currCell);
                for(let i=0; i<currCellNeighbors.length; i++) {
                    const currNeighbor = currCellNeighbors[i];
                    const currNeighHashKey = `${currNeighbor[0]},${currNeighbor[1]}`;

                    if(!currVisited.has(currNeighHashKey)) {
                        const newVisited = new Set(currVisited);
                        newVisited.add(currNeighHashKey);
                        queue.push([newString,currNeighbor,newVisited]);
                    }
                }

                // console.log('queue =',queue);
                // console.log('wordsMap =',wordsMap);

            }



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
