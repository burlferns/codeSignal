/*

Given a string str and array of pairs that indicates which indices in the string can be swapped, return the lexicographically largest string that results from doing the allowed swaps. You can swap indices any number of times.

Example

For str = "abdc" and pairs = [[1, 4], [3, 4]], the output should be
swapLexOrder(str, pairs) = "dbca".

By swapping the given indices, you get the strings: "cbda", "cbad", "dbac", "dbca". The lexicographically largest string in this list is "dbca".

Input/Output

[execution time limit] 4 seconds (js)

[input] string str

A string consisting only of lowercase English letters.

Guaranteed constraints:
1 ≤ str.length ≤ 104.

[input] array.array.integer pairs

An array containing pairs of indices that can be swapped in str (1-based). This means that for each pairs[i], you can swap elements in str that have the indices pairs[i][0] and pairs[i][1].

Guaranteed constraints:
0 ≤ pairs.length ≤ 5000,
pairs[i].length = 2.

[output] string





*/






function swapLexOrder(str, pairs) {
    if(pairs.length===0) {
        return str
    }

    //In this function index is 0-based
    function modCharInString(str,char,index) {
        let front = "";
        if(index!==0) {
            front = str.substring(0,index);
        }
        let back = "";
        if(index!==str.length-1) {
            back = str.substring(index+1);
        }
        return front + char + back;
    }

    // console.log("modCharInString('abcdefgh','z',3) =",modCharInString('abcdefgh','z',3));
    // console.log("modCharInString('abcdefgh','z',0) =",modCharInString('abcdefgh','z',0));
    // console.log("modCharInString('abcdefgh','z',7) =",modCharInString('abcdefgh','z',7));

    let mapIndxToLbl = new Map();
    let mapLblToAry = new Map();
    let currLbl = 0;

    let pairsLength = pairs.length;
    for(let i=0; i<pairsLength; i++) {
        let pair = pairs[i];
        if(!mapIndxToLbl.has(pair[0]) && !mapIndxToLbl.has(pair[1])) {
            mapLblToAry.set(currLbl,pair);
            mapIndxToLbl.set(pair[0],currLbl);
            mapIndxToLbl.set(pair[1],currLbl);
            currLbl++;
        } else if(!mapIndxToLbl.has(pair[0]) && mapIndxToLbl.has(pair[1])) {
            let oldLbl = mapIndxToLbl.get(pair[1]);
            let currAry = mapLblToAry.get(oldLbl);
            mapLblToAry.delete(oldLbl);
            currAry.push(pair[0]);
            mapLblToAry.set(currLbl,currAry)
            currAry.forEach((key)=>{
                mapIndxToLbl.set(key,currLbl);
            });
            currLbl++;
        } else if(mapIndxToLbl.has(pair[0]) && !mapIndxToLbl.has(pair[1])) {
            let oldLbl = mapIndxToLbl.get(pair[0]);
            let currAry = mapLblToAry.get(oldLbl);
            mapLblToAry.delete(oldLbl);
            currAry.push(pair[1]);
            mapLblToAry.set(currLbl,currAry)
            currAry.forEach((key)=>{
                mapIndxToLbl.set(key,currLbl);
            });
            currLbl++;
        } else {
            let oldLbl0 = mapIndxToLbl.get(pair[0]);
            let currAry0 = mapLblToAry.get(oldLbl0);
            let oldLbl1 = mapIndxToLbl.get(pair[1]);
            let currAry1 = mapLblToAry.get(oldLbl1);
            mapLblToAry.delete(oldLbl0);
            mapLblToAry.delete(oldLbl1);
            let currAry = currAry0.concat(currAry1);

            mapLblToAry.set(currLbl,currAry)
            currAry.forEach((key)=>{
                mapIndxToLbl.set(key,currLbl);
            });
            currLbl++;
        }
    }

    // console.log('mapLblToAry =',mapLblToAry);

    let grpIndxAry = [];
    let grpLtrAry = [];
    for (let value of mapLblToAry.values()) {
        grpIndxAry.push(value);
        let ltrAry = [];
        value.forEach((val)=>{
            ltrAry.push(str.charAt(val-1))
        });
        grpLtrAry.push(ltrAry);
    }

    // console.log('b4sort grpIndxAry =',grpIndxAry);
    // console.log('b4sort grpLtrAry =',grpLtrAry);

    grpIndxAry.forEach(elem=>{
        elem.sort((a,b)=>(a-b));
    });

    grpLtrAry.forEach(elem=>{
        elem.sort((a,b)=>{
            if(a<b) {
                return 1;
            }
            if(a>b) {
                return -1;
            }
            if(a===b) {
                return 0;
            }
        });
    });

    // console.log('aftsort grpIndxAry =',grpIndxAry);
    // console.log('aftsort grpLtrAry =',grpLtrAry);

    let outStr = str;
    for(let i=0; i<grpIndxAry.length; i++) {
        let indxAry = grpIndxAry[i];
        let ltrAry = grpLtrAry[i];
        for(let j=0; j<indxAry.length; j++) {
            // modCharInString('abcdefgh','z',3)
            outStr = modCharInString(outStr,ltrAry[j],indxAry[j]-1);
        }
    }


    return outStr;

}
