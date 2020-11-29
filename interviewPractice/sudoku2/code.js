/*

Sudoku is a number-placement puzzle. The objective is to fill a 9 × 9 grid with numbers in such a way that each column, each row, and each of the nine 3 × 3 sub-grids that compose the grid all contain all of the numbers from 1 to 9 one time.

Implement an algorithm that will check whether the given grid of numbers represents a valid Sudoku puzzle according to the layout rules described above. Note that the puzzle represented by grid does not have to be solvable.

Example

For

grid = [['.', '.', '.', '1', '4', '.', '.', '2', '.'],
        ['.', '.', '6', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '1', '.', '.', '.', '.', '.', '.'],
        ['.', '6', '7', '.', '.', '.', '.', '.', '9'],
        ['.', '.', '.', '.', '.', '.', '8', '1', '.'],
        ['.', '3', '.', '.', '.', '.', '.', '.', '6'],
        ['.', '.', '.', '.', '.', '7', '.', '.', '.'],
        ['.', '.', '.', '5', '.', '.', '.', '7', '.']]
the output should be
sudoku2(grid) = true;

For

grid = [['.', '.', '.', '.', '2', '.', '.', '9', '.'],
        ['.', '.', '.', '.', '6', '.', '.', '.', '.'],
        ['7', '1', '.', '.', '7', '5', '.', '.', '.'],
        ['.', '7', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '8', '3', '.', '.', '.'],
        ['.', '.', '8', '.', '.', '7', '.', '6', '.'],
        ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
        ['.', '1', '.', '2', '.', '.', '.', '.', '.'],
        ['.', '2', '.', '.', '3', '.', '.', '.', '.']]
the output should be
sudoku2(grid) = false.

The given grid is not correct because there are two 1s in the second column. Each column, each row, and each 3 × 3 subgrid can only contain the numbers 1 through 9 one time.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.char grid

A 9 × 9 array of characters, in which each character is either a digit from '1' to '9' or a period '.'.

[output] boolean

Return true if grid represents a valid Sudoku puzzle, otherwise return false.


*/





function sudoku2(grid) {
    const digitCount_reseted = [];
    for(let i=0; i<9; i++) {
        digitCount_reseted[i] = 0;
    }

    function addToCount(countArray,digit){
        if(digit!=='.') {
            countArray[parseInt(digit,10)-1]++;
        }
    }

    function isInValid(countArray) {
        for(let i=0; i<9; i++) {
            if(countArray[i]>1) {
                return true;
            }
        }
        return false;
    }

    //Check across rows
    for(let row=0; row<9; row++) {
        const digitCount = digitCount_reseted.slice();
        for(let col=0; col<9; col++) {
            addToCount(digitCount,grid[row][col]);
        }
        if(isInValid(digitCount)) {
            return false;
        }
    }

    //Check across columns
    for(let col=0; col<9; col++) {
        const digitCount = digitCount_reseted.slice();
        for(let row=0; row<9; row++) {
            addToCount(digitCount,grid[row][col]);
        }
        if(isInValid(digitCount)) {
            return false;
        }
    }

    //Check across 3x3 sub-grids
    const subGridOrigin = [[0,0], [0,3], [0,6],
                           [3,0], [3,3], [3,6],
                           [6,0], [6,3], [6,6]];

    for(let origin=0; origin<subGridOrigin.length; origin++) {
        const digitCount = digitCount_reseted.slice();
        const rowMin = subGridOrigin[origin][0];
        const colMin = subGridOrigin[origin][1];
        for(let row=rowMin; row<rowMin+3; row++) {
            for(let col=colMin; col<colMin+3; col++)
            addToCount(digitCount,grid[row][col]);
        }
        if(isInValid(digitCount)) {
            return false;
        }
    }


    return true;
}
