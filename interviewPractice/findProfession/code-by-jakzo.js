function findProfession(level, pos) {
    var isEngineer = 1,
        x = (pos - 1) % (1 << (level - 1)); // move `pos` inside tree
    while (x > 0) {
        isEngineer ^= x & 1;
        x >>= 1;
    }
    return isEngineer ? 'Engineer' : 'Doctor';
}

/*
 * The result is the Thue-Morse sequence where `pos` is the index.
 * `level` would not normally be needed at all, but because there
 * are tests where `pos` is to the right of the tree, we may need
 * to put the `pos` inside it first.
 */
