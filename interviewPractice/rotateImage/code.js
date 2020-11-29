/*
Note: Try to solve this task in-place (with O(1) additional memory), since this is what you'll be asked to do during an interview.

You are given an n x n 2D matrix that represents an image. Rotate the image by 90 degrees (clockwise).

Example

For

a = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
the output should be

rotateImage(a) =
    [[7, 4, 1],
     [8, 5, 2],
     [9, 6, 3]]
Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.integer a

Guaranteed constraints:
1 ≤ a.length ≤ 100,
a[i].length = a.length,
1 ≤ a[i][j] ≤ 104.

[output] array.array.integer
*/


/*

First part of the solution. Get the initial index correct

function rotateImage(a) {
    const len = a.length;
    let temp;

    let rowMax;
    if(len%2>0) {
        rowMax = (len-1)/2 - 1;
    }
    else {
        rowMax = len/2 - 1;
    }


    for(let row=0; row<=rowMax; row++) {
        let colMin = row;
        let currentSquareLength = len - row*2;
        let colMax = colMin + currentSquareLength - 2;
        let printOut = "";
        for(let col=colMin; col<=colMax; col++) {
            printOut = printOut + `[${row},${col}] `;
        }
        console.log(printOut);
    }
}


*/


function rotateImage(a) {
    const len = a.length;
    let e1, e1row, e1col;
    let e2, e2row, e2col;
    let e3, e3row, e3col;
    let e4, e4row, e4col;

    let rowMax;
    if(len%2>0) {
        rowMax = (len-1)/2 - 1;
    }
    else {
        rowMax = len/2 - 1;
    }

    for(let row=0; row<=rowMax; row++) {
        let colMin = row;
        let currentSquareLength = len - row*2;
        let colMax = colMin + currentSquareLength - 2;
        for(let col=colMin; col<=colMax; col++) {
            e1row = row;
            e1col = col;
            e1 = a[e1row][e1col];

            e2row = e1col;
            e2col = len-1-e1row;
            e2 = a[e2row][e2col];

            e3row = e2col;
            e3col = len-1-e2row;
            e3 = a[e3row][e3col];

            e4row = e3col;
            e4col = len-1-e3row;
            e4 = a[e4row][e4col];

            a[e1row][e1col] = e4;
            a[e2row][e2col] = e1;
            a[e3row][e3col] = e2;
            a[e4row][e4col] = e3;
        }
    }

    return a;
}
