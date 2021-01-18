/*

Given two binary trees t1 and t2, determine whether the second tree is a subtree of the first tree. A subtree for vertex v in a binary tree t is a tree consisting of v and all its descendants in t. Determine whether or not there is a vertex v (possibly none) in tree t1 such that a subtree for vertex v (possibly empty) in t1 equals t2.

Example

For

t1 = {
    "value": 5,
    "left": {
        "value": 10,
        "left": {
            "value": 4,
            "left": {
                "value": 1,
                "left": null,
                "right": null
            },
            "right": {
                "value": 2,
                "left": null,
                "right": null
            }
        },
        "right": {
            "value": 6,
            "left": null,
            "right": {
                "value": -1,
                "left": null,
                "right": null
            }
        }
    },
    "right": {
        "value": 7,
        "left": null,
        "right": null
    }
}
and

t2 = {
    "value": 10,
    "left": {
        "value": 4,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": {
            "value": 2,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 6,
        "left": null,
        "right": {
            "value": -1,
            "left": null,
            "right": null
        }
    }
}
the output should be isSubtree(t1, t2) = true.

This is what these trees look like:

      t1:             t2:
       5              10
      / \            /  \
    10   7          4    6
   /  \            / \    \
  4    6          1   2   -1
 / \    \
1   2   -1
As you can see, t2 is a subtree of t1 (the vertex in t1 with value 10).

For

t1 = {
    "value": 5,
    "left": {
        "value": 10,
        "left": {
            "value": 4,
            "left": {
                "value": 1,
                "left": null,
                "right": null
            },
            "right": {
                "value": 2,
                "left": null,
                "right": null
            }
        },
        "right": {
            "value": 6,
            "left": {
                "value": -1,
                "left": null,
                "right": null
            },
            "right": null
        }
    },
    "right": {
        "value": 7,
        "left": null,
        "right": null
    }
}
and

t2 = {
    "value": 10,
    "left": {
        "value": 4,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": {
            "value": 2,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 6,
        "left": null,
        "right": {
            "value": -1,
            "left": null,
            "right": null
        }
    }
}
the output should be isSubtree(t1, t2) = false.

This is what these trees look like:

        t1:            t2:
         5             10
       /   \          /  \
     10     7        4    6
   /    \           / \    \
  4     6          1   2   -1
 / \   /
1   2 -1
As you can see, there is no vertex v such that the subtree of t1 for vertex v equals t2.

For

t1 = {
    "value": 1,
    "left": {
        "value": 2,
        "left": null,
        "right": null
    },
    "right": {
        "value": 2,
        "left": null,
        "right": null
    }
}
and

t2 = {
    "value": 2,
    "left": {
        "value": 1,
        "left": null,
        "right": null
    },
    "right": null
}
the output should be isSubtree(t1, t2) = false.

Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t1

A binary tree of integers.

Guaranteed constraints:
0 ≤ tree size ≤ 6 · 104,
-1000 ≤ node value ≤ 1000.

[input] tree.integer t2

Another binary tree of integers.

Guaranteed constraints:
0 ≤ tree size ≤ 6 · 104,
-1000 ≤ node value ≤ 1000.

[output] boolean

Return true if t2 is a subtree of t1, otherwise return false.

*/




//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function isSubtree(t1, t2) {
    if(t1!==null && t2===null) {
        return true;
    }

    if(t1===null && t2!==null) {
        return false;
    }

    if(t1===null && t2===null) {
        return true
    }

    //First find root value of t2 in t1, if it exists, by BFS
    //It may occur more than once
    let rootT2inT1 = [];
    let queue = [t1];
    while(queue.length>0) {
        let current = queue.shift();
        if(current.value===t2.value) {
            rootT2inT1.push(current);
        }
        if(current.left!==null) {
            queue.push(current.left)
        }
        if(current.right!==null) {
            queue.push(current.right)
        }
    }

    //If roorT2inT1 does not exist, then t2 is not sub-tree of t1
    if(rootT2inT1.length===0) {
        return false;
    }

    //Function to check if two trees are equal
    //Does so by BFS
    function chkEqlTree(tA,tB) {
        //These hold pointers to nodes by level from left to right
        let currLevelA = [tA.left,tA.right];
        let currLevelB = [tB.left,tB.right];
        let nextLevelA = [];
        let nextLevelB = [];

        //tB is used as the reference against which tA is checked
        //while loop ends if there are no pointers in the array for B
        while(currLevelB.length>0) {
            let tBLvlAllNull = true; //Assume all pointers are null in currLevelB
            for(i=0;i<currLevelB.length;i++) {
                if(currLevelA[i]!==null && currLevelB[i]===null) {
                    return false
                }
                if(currLevelA[i]===null && currLevelB[i]!==null) {
                    return false
                }
                if(currLevelA[i]!==null && currLevelB[i]!==null) {
                    tBLvlAllNull = false;
                    if(currLevelA[i].value!==currLevelB[i].value) {
                        return false;
                    }
                }
                //No need to anything if(currLevelA[i]===null && currLevelB[i]===null)
            }

            //At this point we have 2 possibilities
            //1 = All the pointers in currLevelA & currLevelB are equal to
            //null, in which case we don't need to continue the while loop and the trees
            //are equal
            //
            //2 = All the pointers in currLevelA & currLevelB are not equal to null, but
            //corresponding pointers are equal, in which case we need to check the next
            //level
            if(tBLvlAllNull===false) {
                for(i=0;i<currLevelB.length;i++) {
                    if(currLevelA[i]===null) {
                        nextLevelA.push(null);
                        nextLevelA.push(null);
                    }
                    else {
                        nextLevelA.push(currLevelA[i].left);
                        nextLevelA.push(currLevelA[i].right);
                    }
                    if(currLevelB[i]===null) {
                        nextLevelB.push(null);
                        nextLevelB.push(null);
                    }
                    else {
                        nextLevelB.push(currLevelB[i].left);
                        nextLevelB.push(currLevelB[i].right);
                    }
                }
                currLevelA = nextLevelA;
                currLevelB = nextLevelB;
                nextLevelA = [];
                nextLevelB = [];
            }
            else {
                currLevelB = [] //This stops the while loop
            }
        }
        return true;
    }

    //Check if the subtrees found are equal
    for(let i=0;i<rootT2inT1.length;i++) {
        if(chkEqlTree(rootT2inT1[i],t2)===true) {
            return true;
        }
    }
    return false;
}
