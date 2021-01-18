//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function restoreBinaryTree(inorder, preorder) {
    /**********************************************************************************************
     * Helper functions
     */
   




    /**********************************************************************************************
     * Main code
     */
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

    const root = new Tree(preorder[0]);

    //The problem description says : 'It is guaranteed that all numbers in the tree are 
    //pairwise distinct'. This means that we can create a hashtable of the inorder array
    //to search the inorder array in O(1) time (on average) for the inorder array index at which
    //a particular table value is located. We can make the inorder element value the hashtable
    //key and the inorder element index the hastable value
    const inoHash = new Map();
    for(let i=0;i<inorder.length;i++) {
      inoHash.set(inorder[i],i);
    } 
    
    /**************************************************
     * First initialize the stack
     */
    //Current root's data
    let currRoot = preorder[0];
    let currRootInOrder = inoHash.get(currRoot); //index of current root in inorder array
    let currRootPreOrder = 0; //index of current root in preorder array

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

    //Initialize the stack with the left child sub-tree if it exists
    if(currRootInOrder-1>=0) {
      leftChildExists = true;
      childBeginInOrder = 0;
      childEndInOrder = currRootInOrder-1;
      childNum = childEndInOrder - childBeginInOrder + 1;
      childBeginPreOrder = currRootPreOrder + 1;
      childEndPreOrder = currRootPreOrder + childNum;
      stack.push(root,'L',childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder);
    }

    if(currRootInOrder+1<=inorder.lenght-1) {
      let leftChildNum = 0;
      if(leftChildExists) {
        leftChildNum = childNum;
      }
      childBeginInOrder = currRootInOrder + 1;
      childEndInOrder = inorder.length - 1;
      childNum = childEndInOrder - childBeginInOrder + 1;
      childBeginPreOrder = currRootPreOrder + leftChildNum + 1;
      childEndPreOrder = preorder.length - 1;
      stack.push(root,'R',childBeginInOrder,childEndInOrder,childBeginPreOrder,childEndPreOrder);
    }

    while(stack.length>0) {
          = stack
       currRoot = 

      leftChildExists = false;
















    }






    return root;
}
