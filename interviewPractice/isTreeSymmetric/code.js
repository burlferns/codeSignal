/*

Given a binary tree t, determine whether it is symmetric around its center, i.e. each side mirrors the other.

Example

For

t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {
            "value": 3,
            "left": null,
            "right": null
        },
        "right": {
            "value": 4,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": {
            "value": 4,
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
the output should be isTreeSymmetric(t) = true.

Here's what the tree in this example looks like:

    1
   / \
  2   2
 / \ / \
3  4 4  3
As you can see, it is symmetric.

For

t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
the output should be isTreeSymmetric(t) = false.

Here's what the tree in this example looks like:

    1
   / \
  2   2
   \   \
   3    3
As you can see, it is not symmetric.

Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t

A binary tree of integers.

Guaranteed constraints:
0 ≤ tree size < 5 · 104,
-1000 ≤ node value ≤ 1000.

[output] boolean

Return true if t is symmetric and false otherwise.


*/


//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function isTreeSymmetric(t) {
    if(t===null) {
        return true
    }

    if(t.left===null && t.right===null) {
        return true
    }

    let currentLvlNodes = [t.left,t.right];
    let nextLvlNodes = []; //Holds the next value of currentLvlNodes

    while(true) {
        //Check if all current nodes are null, then exit as true
        let allNull = true; //assume all current nodes are null
        for(i=0; i<currentLvlNodes.length; i++) {
            if(currentLvlNodes[i]!==null) {
                allNull = false;
            }
        }
        if(allNull===true) {
            return true;
        }

        //At this point current nodes are not all null, so check if
        //they are asymmetric and exit as false
        for(i=0; i<currentLvlNodes.length/2; i++) {
            const leftSideNode = currentLvlNodes[i];
            const rightSideNode = currentLvlNodes[currentLvlNodes.length-1-i];
            if(leftSideNode===null && rightSideNode!==null) {
                return false;
            }
            if(leftSideNode!==null && rightSideNode===null) {
                return false;
            }
            if(leftSideNode!==null && rightSideNode!==null) {
                if(leftSideNode.value !== rightSideNode.value) {
                    return false;
                }
            }

        }

        //At this point current nodes are not all null
        //and they are symmetric, so make next level of nodes
        for(i=0; i<currentLvlNodes.length; i++) {
            const currNode = currentLvlNodes[i];
            if(currNode===null) {
                nextLvlNodes.push(null);
                nextLvlNodes.push(null);
            }
            else {
                nextLvlNodes.push(currNode.left);
                nextLvlNodes.push(currNode.right);
            }
        }
        currentLvlNodes = nextLvlNodes;
        nextLvlNodes = [];
    }
}
