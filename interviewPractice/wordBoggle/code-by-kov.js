function wordBoggle(board, words) {
    // build a list of possible chunks and words
    s = new Set();
    words.map(w => {
        a = "";
        [...w].map(l => s.add(a += l));
    });
    t = new Set();
    // walk on board and store chucks found
    walk = (c, i, j) => {
        if (board[i] && board[i][j] && !used[i * 4 + j]) {
            c += board[i][j];
            if (s.has(c)) {
                t.add(c);
                used[i * 4 + j] = 1;
                [
                    [-1, -1], [-1, 0], [-1, 1],
                    [ 0, -1],          [ 0, 1],
                    [ 1, -1], [ 1, 0], [ 1, 1]
                ].map(next => walk(c, i + next[0], j + next[1]));
                used[i * 4 + j] = 0;
            }
        }
    }

    used = [];
    for (i = 0; i < board.length; i++)
        for (j = 0; j < board[i].length; j++)
            walk("", i, j);

    return words.filter(w => t.has(w)).sort();
}
