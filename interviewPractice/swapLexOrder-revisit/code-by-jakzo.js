function swapLexOrder(str, pairs) {
    'use strict';

    /*
     * First we generate a number of disjoint graphs where edges
     * are formed by two pairs sharing a common index.
     */
    const graphs = [];
    for (let p = 0; p < pairs.length; p++) {
        const pair = pairs[p];

        // Search the existing graphs for connections
        let connected = [];
        for (let i = 0; i < 2; i++) {
            const index = pair[i];
            for (let g = 0; g < graphs.length; g++) {
                const graph = graphs[g];
                if (graph.includes(index)) {
                    connected.push([ graph, g, i ]);
                    break;
                }
            }
        }

        // Update the exisiting graphs
        if (connected.length == 2) {
            const indexA = connected[0][1],
                  indexB = connected[1][1],
                  a = connected[0][0],
                  b = connected[1][0];
            if (a != b) {
                graphs[indexA] = a.concat(b);
                graphs.splice(indexB, 1);
            }
        } else if (connected.length == 1) {
            connected[0][0].push(pair[connected[0][2] ^ 1]);
        } else {
            graphs.push(pair);
        }
    }

    /*
     * It is possible to move the characters at any index of a
     * graph to any other index which is connected.
     * This means the solution is for each graph, sort
     * its characters descending lexicographically in their
     * original positions.
     */
    const charArray = [...str];
    for (let g = 0; g < graphs.length; g++) {
        const graph = graphs[g];

        // Sort the graph first so that the indices of the sorted
        // char array match the output order
        graph.sort((a, b) => a - b);

        // Sort the characters descending
        const chars = [];
        for (let i = 0; i < graph.length; i++) {
            chars[i] = charArray[graph[i] - 1];
        }
        chars.sort((a, b) => {
            if (a < b) return 1;
            if (a > b) return -1;
            return 0;
        });
        for (let i = 0; i < graph.length; i++) {
            charArray[graph[i] - 1] = chars[i];
        }
    }
    return charArray.join('');
}
