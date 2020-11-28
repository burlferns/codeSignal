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
