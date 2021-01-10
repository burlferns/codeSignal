//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

function check(t1, t2) {
    if (t1 == null && t2 == null) {
        return true;
    }
    if (t1 == null || t2 == null || t1.value != t2.value) {
        return false;
    }
    return check(t1.left, t2.right) && check (t1.right, t2.left);
}

function isTreeSymmetric(t) {
    return check(t, t);
}
