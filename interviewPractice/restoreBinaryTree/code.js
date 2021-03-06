/*

Note: Your solution should have O(inorder.length) time complexity, since this is what you will be asked to accomplish in an interview.

Let's define inorder and preorder traversals of a binary tree as follows:

Inorder traversal first visits the left subtree, then the root, then its right subtree;
Preorder traversal first visits the root, then its left subtree, then its right subtree.
For example, if tree looks like this:

    1
   / \
  2   3
 /   / \
4   5   6
then the traversals will be as follows:

Inorder traversal: [4, 2, 1, 5, 3, 6]
Preorder traversal: [1, 2, 4, 3, 5, 6]
Given the inorder and preorder traversals of a binary tree t, but not t itself, restore t and return it.

Example

For inorder = [4, 2, 1, 5, 3, 6] and preorder = [1, 2, 4, 3, 5, 6], the output should be
restoreBinaryTree(inorder, preorder) = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {
            "value": 4,
            "left": null,
            "right": null
        },
        "right": null
    },
    "right": {
        "value": 3,
        "left": {
            "value": 5,
            "left": null,
            "right": null
        },
        "right": {
            "value": 6,
            "left": null,
            "right": null
        }
    }
}
For inorder = [2, 5] and preorder = [5, 2], the output should be
restoreBinaryTree(inorder, preorder) = {
    "value": 5,
    "left": {
        "value": 2,
        "left": null,
        "right": null
    },
    "right": null
}
Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer inorder

An inorder traversal of the tree. It is guaranteed that all numbers in the tree are pairwise distinct.

Guaranteed constraints:
1 ≤ inorder.length ≤ 2 · 103,
-105 ≤ inorder[i] ≤ 105.

[input] array.integer preorder

A preorder traversal of the tree.

Guaranteed constraints:
preorder.length = inorder.length,
-105 ≤ preorder[i] ≤ 105.

[output] tree.integer

The restored binary tree.

*/







//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function restoreBinaryTree(inorder, preorder) {
    //The stack element will be an array
    //The sub-array element will have the following elements in order
    //elem 0 : current sub-tree root pointer,
    //elem 1 : 'L' or 'R' string to indicate a left or right child of root node of sub-tree
    //elem 2 :  inorder begin index of root's child's sub-tree
    //elem 3 :  inorder end index of root's child's sub-tree
    //elem 4 :  preorder begin index of root's child's sub-tree
    //elem 5 :  preorder end index of root's child's sub-tree
    //Note that index elem values 2 to 5 above are in terms of the index of the input inorder and
    //  preorder arrays
    const stack = [];

    //The problem description says : 'It is guaranteed that all numbers in the tree are
    //pairwise distinct'. This means that we can create a hashtable of the inorder array
    //to search the inorder array in O(1) time (on average) for the inorder array index at which
    //a particular table value is located. We can make the inorder element value the hashtable
    //key and the inorder element index the hastable value
    const inoHash = new Map();
    for(let i=0;i<inorder.length;i++) {
      inoHash.set(inorder[i],i);
    }

    //The rootBeginInOrder & rootEndInOrder variables hold the index range of the root's tree
    //in the inorder array.
    let rootBeginInOrder = 0;
    let rootEndInOrder = inorder.length - 1;

    //The rootBeginPreOrder & rootEndPreOrder variables hold the index range of the root's tree
    //in the preorder array.
    let rootBeginPreOrder = 0;
    let rootEndPreOrder = preorder.length - 1;

    //Create the root of the tree
    let currRootValue = preorder[rootBeginPreOrder];
    const root = new Tree(currRootValue);

    //index of current root in inorder array
    let currRootInOrder = inoHash.get(currRootValue);

    //The childBeginInOrder & childEndInOrder variables hold the index range of the current root's
    //child's sub-tree in the inorder array. This may be for the left or right child.
    let childBeginInOrder = null;
    let childEndInOrder = null;

    //The childNum is the number of values in the child's sub-tree. This may be for the left or
    //right child. It should be calculated from the inorder index range values of the child's
    //sub-tree
    let childNum = null;

    //The childBeginPreOrder & childEndPreOrder variables hold the index range of the current root's
    //child's sub-tree in the preorder array. This may be for the left or right child.
    let childBeginPreOrder = null;
    let childEndPreOrder = null;

    //Indicates whether or not the left child exists for the current root
    let leftChildExists = false;

     /**************************************************
     * First initialize the stack
     */
    //Initialize the stack with the left child sub-tree if it exists
    if(currRootInOrder-1>=rootBeginInOrder) {
      leftChildExists = true;
      childBeginInOrder = rootBeginInOrder;
      childEndInOrder = currRootInOrder-1;
      childNum = childEndInOrder - childBeginInOrder + 1;
      childBeginPreOrder = rootBeginPreOrder + 1;
      childEndPreOrder = rootBeginPreOrder + childNum;
      stack.push([root,'L',childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder]);
    }

    //Initialize the stack with the right child sub-tree if it exists
    if(currRootInOrder+1<=rootEndInOrder) {
      let leftChildNum = 0;
      if(leftChildExists) {
        leftChildNum = childNum;
      }
      childBeginInOrder = currRootInOrder + 1;
      childEndInOrder = rootEndInOrder;
      childNum = childEndInOrder - childBeginInOrder + 1;
      childBeginPreOrder = rootBeginPreOrder + leftChildNum + 1;
      childEndPreOrder = rootEndPreOrder;
      stack.push([root,'R',childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder]);
    }

    /**************************************************
     * Now process the stack and add new data to it if necessary
     */
    while(stack.length>0) {
      let popData = stack.pop();
      let parent = popData[0];
      let childType = popData[1];
      rootBeginInOrder = popData[2];
      rootEndInOrder = popData[3];
      rootBeginPreOrder = popData[4];
      rootEndPreOrder = popData[5];

      currRootValue = preorder[rootBeginPreOrder];
      let currRootPointer = new Tree(currRootValue);
      if(childType==='L') {
        parent.left = currRootPointer;
      }
      else {
        parent.right = currRootPointer;
      }

      currRootInOrder = inoHash.get(currRootValue);

      leftChildExists = false;

      if(currRootInOrder-1>=rootBeginInOrder) {
        leftChildExists = true;
        childBeginInOrder = rootBeginInOrder;
        childEndInOrder = currRootInOrder-1;
        childNum = childEndInOrder - childBeginInOrder + 1;
        childBeginPreOrder = rootBeginPreOrder + 1;
        childEndPreOrder = rootBeginPreOrder + childNum;
        stack.push([currRootPointer,'L',
            childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder]);
      }

      if(currRootInOrder+1<=rootEndInOrder) {
        let leftChildNum = 0;
        if(leftChildExists) {
          leftChildNum = childNum;
        }
        childBeginInOrder = currRootInOrder + 1;
        childEndInOrder = rootEndInOrder;
        childNum = childEndInOrder - childBeginInOrder + 1;
        childBeginPreOrder = rootBeginPreOrder + leftChildNum + 1;
        childEndPreOrder = rootEndPreOrder;
        stack.push([currRootPointer,'R',
            childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder]);
      }
    }

    return root;
}
