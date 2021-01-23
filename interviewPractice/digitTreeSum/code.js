/*

We're going to store numbers in a tree. Each node in this tree will store a single digit (from 0 to 9), and each path from root to leaf encodes a non-negative integer.

Given a binary tree t, find the sum of all the numbers encoded in it.

Example

For
t = {
    "value": 1,
    "left": {
        "value": 0,
        "left": {
            "value": 3,
            "left": null,
            "right": null
        },
        "right": {
            "value": 1,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 4,
        "left": null,
        "right": null
    }
}
the output should be
digitTreeSum(t) = 218.
There are 3 numbers encoded in this tree:

Path 1->0->3 encodes 103
Path 1->0->1 encodes 101
Path 1->4 encodes 14
and their sum is 103 + 101 + 14 = 218.
t = {
    "value": 0,
    "left": {
        "value": 9,
        "left": null,
        "right": null
    },
    "right": {
        "value": 9,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
the output should be
digitTreeSum(t) = 193.
Because 09 + 091 + 093 = 193

Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t

A tree of integers. It's guaranteed that the sum of encoded integers won't exceed 252.

Guaranteed constraints:
1 ≤ tree size ≤ 2000,
1 ≤ tree depth ≤ 9,
0 ≤ node value ≤ 9.

[output] integer64

The sum of the integers encoded in t, as described above.





*/







//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function digitTreeSum(t) {
    //The elements of the stack will be an array
    //The sub-array will have two elements:
    //The first is a string which is a sequence of digits that are the digits
    //encountered along a path in the tree from the root to the current node
    //The second is a pointer to the current node
    const stack = [];

    //initialize the stack
    stack.push(["",t]);

    let outSum = 0;

    while(stack.length>0) {
        let stackItem = stack.pop();
        let currString = stackItem[0];
        let currNode = stackItem[1];

        //If both left and right child of current node is null, then
        //we have reached the end of a path from root and found a number
        if(currNode.left===null && currNode.right===null) {
            let numString = currString + currNode.value;
            outSum = outSum + parseInt(numString,10);
        }
        else {
            let newString = currString + currNode.value;
            if(currNode.left!==null) {
                stack.push([newString,currNode.left]);
            }
            if(currNode.right!==null) {
                stack.push([newString,currNode.right]);
            }
        }

    }

    return outSum;
}
