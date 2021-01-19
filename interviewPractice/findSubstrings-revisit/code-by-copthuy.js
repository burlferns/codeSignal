function findSubstrings(words, parts){
    var set = new Set(parts),
        res = [],
        i, l, k, part, cur, longest;

    for(i = 0; i < words.length;i++){
        cur = res[i] = words[i];
        longest = 0;
        for(l = 5; l >= 0; l--) {
            for (k = 0; k + l <= cur.length; k++) {
                part = cur.slice(k, k + l);
                if (set.has(part) && part.length > longest) {
                    longest = part.length;
                    res[i] = cur.replace(part, '[' + part + ']');
                    break;
                }
            }

        }
    }
    return res;
}
