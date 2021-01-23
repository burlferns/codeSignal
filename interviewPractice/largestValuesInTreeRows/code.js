/*

You have a binary tree t. Your task is to find the largest value in each row of this tree. In a tree, a row is a set of nodes that have equal depth. For example, a row with depth 0 is a tree root, a row with depth 1 is composed of the root's children, etc.

Return an array in which the first element is the largest value in the row with depth 0, the second element is the largest value in the row with depth 1, the third element is the largest element in the row with depth 2, etc.

Example

For

t = {
    "value": -1,
    "left": {
        "value": 5,
        "left": null,
        "right": null
    },
    "right": {
        "value": 7,
        "left": null,
        "right": {
            "value": 1,
            "left": null,
            "right": null
        }
    }
}
the output should be largestValuesInTreeRows(t) = [-1, 7, 1].

The tree in the example looks like this:

    -1
   / \
  5   7
       \
        1
In the row with depth 0, there is only one vertex - the root with value -1;
In the row with depth 1, there are two vertices with values 5 and 7, so the largest value here is 7;
In the row with depth 2, there is only one vertex with value 1.
Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t

A binary tree of integers.

Guaranteed constraints:
0 ≤ tree size ≤ 5 · 104,
-1000 ≤ node value ≤ 1000.

[output] array.integer

An array of the largest values in each row of t.



*/




//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function largestValuesInTreeRows(t) {
    if(t===null) {
        return [];
    }


    //The element in a queue is an array. This sub-array has
    //two elements:
    //The first is a pointer to a node of the tree
    //The second is the row depth of the node in the tree
    const queue = [];

    const outAry = [];

    //Initialize queue
    queue.push([t,0]);

    while(queue.length>0) {
        let queueItem = queue.shift();
        let currNode = queueItem[0];
        let currNodeDpth = queueItem[1];

        let currOutAryVal = outAry[currNodeDpth];

        if(currOutAryVal===undefined) {
            outAry[currNodeDpth] = currNode.value;
        }
        else {
            if(currNode.value>currOutAryVal) {
                outAry[currNodeDpth] = currNode.value;
            }
        }

        if(currNode.left!==null) {
            queue.push([currNode.left,currNodeDpth+1])
        }

        if(currNode.right!==null) {
            queue.push([currNode.right,currNodeDpth+1])
        }
    }


    return outAry;
}
