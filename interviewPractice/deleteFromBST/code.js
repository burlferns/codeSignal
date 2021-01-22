/*

A tree is considered a binary search tree (BST) if for each of its nodes the following is true:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and the right subtrees must also be binary search trees.
Removing a value x from a BST t is done in the following way:

If there is no x in t, nothing happens;
Otherwise, let t' be a subtree of t such that t'.value = x.
If t' has a left subtree, remove the rightmost node from it and put it at the root of t';
Otherwise, remove the root of t' and its right subtree becomes the new t's root.
For example, removing 4 from the following tree has no effect because there is no such value in the tree:

    5
   / \
  2   6
 / \   \
1   3   8
       /
      7
Removing 5 causes 3 (the rightmost node in left subtree) to move to the root:

    3
   / \
  2   6
 /     \
1       8
       /
      7
And removing 6 after that creates the following tree:

    3
   / \
  2   8
 /   /
1   7
You're given a binary search tree t and an array of numbers queries. Your task is to remove queries[0], queries[1], etc., from t, step by step, following the algorithm above. Return the resulting BST.

Example

For

t = {
    "value": 5,
    "left": {
        "value": 2,
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
    },
    "right": {
        "value": 6,
        "left": null,
        "right": {
            "value": 8,
            "left": {
                "value": 7,
                "left": null,
                "right": null
            },
            "right": null
        }
    }
}
and queries = [4, 5, 6], the output should be

deleteFromBST(t, queries) = {
    "value": 3,
    "left": {
        "value": 2,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": null
    },
    "right": {
        "value": 8,
        "left": {
            "value": 7,
            "left": null,
            "right": null
        },
        "right": null
    }
}
Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t

A tree of integers.

Guaranteed constraints:
0 ≤ t size ≤ 1000,
-109 ≤ node value ≤ 109.

[input] array.integer queries

An array that contains the numbers to be deleted from t.

Guaranteed constraints:
1 ≤ queries.length ≤ 1000,
-109 ≤ queries[i] ≤ 109.

[output] tree.integer

The tree after removing all the numbers in queries, following the algorithm above.

*/














//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function deleteFromBST(t, queries) {
    if(t===null) {
        return t
    }

    //Helper function to find a value in the tree
    //If value exists, then returns an array where:
    //The first element is a pointer to the parent of the node that has the value
    //The second element is a pointer to the mode that has the value
    //If value does not exist, then returns null
    function findValue(x) {
        let parent = null;
        let child = t;
        while(child!==null) {
            if(child.value===x) {
                return [parent,child];
            }
            parent = child;
            if(x>child.value) {
                child = child.right;
            }
            else {
                child = child.left;
            }
        }
        return null;
    }

    //Helper function to find the rightmost node in the left sub-tree
    //This would also be the maximum value in the sub-tree
    //returns an array where:
    //The first element is a pointer to the parent of the node that has the max value
    //The second element is a pointer to the mode that has the max value
    function maxValue(parentSubTreeRoot, subTreeRoot) {
        let parent = parentSubTreeRoot;
        let child = subTreeRoot;
        while(child.right!==null) {
            parent = child;
            child = child.right;
        }
        return [parent,child];
    }



    /****************************************************************************************
     * Main code of the main function
     */

    for(let qIdx=0; qIdx<queries.length; qIdx++) {
        const query = queries[qIdx];
        const x = findValue(query);

        if(x!==null) {
            let subTreeParent = x[0];
            let subTreeChild = x[1];

            if(subTreeChild.left!==null) {
                let rightMost = maxValue(subTreeChild, subTreeChild.left);
                let rMostParent = rightMost[0];
                let rMostChild = rightMost[1];
                subTreeChild.value = rMostChild.value;
                if(rMostParent!==subTreeChild) {
                    rMostParent.right = rMostChild.left;
                }
                else {
                    if(rMostParent!==null) {
                        rMostParent.left = rMostChild.left;
                    }
                }

            }
            else {
                if(subTreeParent!==null) {
                    if(subTreeParent.right===subTreeChild) {
                        subTreeParent.right = subTreeChild.right;
                    }
                    else {
                        subTreeParent.left = subTreeChild.right;
                    }
                }
                else {
                    t = subTreeChild.right;
                }

            }

        }
    }








    return t;

}
