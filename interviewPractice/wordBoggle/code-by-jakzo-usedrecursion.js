function wordBoggle(board, words) {
    var found = {};

    var visit = (x, y, visited, possible, i) => {
        if (!board[y] || !board[y][x]) return;

        var key = 1 << (x * board.length + y);
        if (visited & key) return;
        visited |= key;

        possible = possible.filter(word => {
            if (word[i] === board[y][x]) {
                if (i === word.length - 1) {
                    found[word] = true;
                } else {
                    return true;
                }
            }
            return false;
        });
        if (possible.length === 0) return;

        visit(x - 1, y, visited, possible, i + 1);
        visit(x - 1, y - 1, visited, possible, i + 1);
        visit(x, y - 1, visited, possible, i + 1);
        visit(x + 1, y - 1, visited, possible, i + 1);
        visit(x + 1, y, visited, possible, i + 1);
        visit(x + 1, y + 1, visited, possible, i + 1);
        visit(x, y + 1, visited, possible, i + 1);
        visit(x - 1, y + 1, visited, possible, i + 1);
    };

    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            visit(j, i, 0, words, 0);
        }
    }

    return [...Object.keys(found)].sort();
}
