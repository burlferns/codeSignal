/*

This is a combo of the code from k_m8  &  eduard_p_2


*/

function isTreeSymmetric(t) {
  if (!t) {
      return true;
  }

  function areTreesSymmetric(left, right) {
    if ((left === null) && (right === null)) {
      return true;
    }
    if ((left === null || right === null)) {
      return false;
    }
    if (left.value !== right.value) {
      return false;
    }

    return areTreesSymmetric(left.left, right.right) && areTreesSymmetric(left.right, right.left);
  }

  return areTreesSymmetric(t.left, t.right);
}
