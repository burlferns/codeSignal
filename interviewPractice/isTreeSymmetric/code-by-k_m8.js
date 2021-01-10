//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function isTreeSymmetric(t) {
    if (!t) {
        return true;
    }
    return areTreesSymmetric(t.left, t.right);
}

function areTreesSymmetric(left, right) {
    if ((left == null) && (right == null)) {
        return true;
    }
    if ((left == null || right == null)) {
        return false;
    }
    if (left.value != right.value) {
        return false;
    }


    if (areTreesSymmetric(left.left, right.right) == false) {
        return false;
    }

    return areTreesSymmetric(left.right, right.left);
}
