function kthSmallestInBST(t, k) {
    var i = 0,
        parent = {},
        node = t;
    while (true) {
        if (node.left) { // enter left child
            var next = node.left;
            node.left = parent;
            parent = node;
            node = next;
        } else { // visit leftmost node
            if (++i === k) return node.value;
            var rightChild = node.right;
            node.right = parent;
            if (rightChild) { // enter right child
                parent = node;
                node = rightChild;
            } else { // backtrack to nearest unvisited parent
                while (!node.left) node = node.right;
                parent = node.left;
                node.left = null;
            }
        }
    }
}

/*
 * O(1) space (no recursion or stacks).
 *
 * This solution achieves O(1) space by reversing the direction
 * of the tree as each node is visited.
 *
 * When entering the left child of a node, the left property
 * of the node is pointed to its parent.
 *
 * This continues until we have reached the leftmost node,
 * which is then visited.
 *
 * After backtracking from the left child into the parent, the
 * left property is set to `null`, the parent is visited, and
 * then the right child is entered.
 *
 * When visiting the right child, the right is pointed to the
 * parent and the left is still `null`, so that we know not to
 * visit it again when backtracking.
 */
