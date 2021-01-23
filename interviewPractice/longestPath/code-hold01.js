function longestPath(fileSystem) {
    //Helper function to find the level of a file/folder item
    //A file/folder level is determined by the number of '\t'
    //in front of it. No '\t' is the level 0
    //This function takes a string and returs an array, where:
    //The first element in the array is the file/folder name string
    //without any '\t' prefixes
    //The second element in the array is the level
    function getNameLevel(item) {
        let strIndx = 0;
        let level = 0;
        let name = "";
        while(item[strIndx] === "\t") {
            strIndx = strIndx + 1;
            level++;
        }
        for(let i=strIndx; i<item.length; i++) {
            name = name + item[i];
        }
        return [name,level];
    }



    //Put the string contents in an array where the seperator
    //between different items is '\f'
    const contents = fileSystem.split('\f');

    console.log('contents =',contents);

    for(let i=0; i<contents.length; i++) {
        console.log(`i=${i}, nl =`,getNameLevel(contents[i]));
    }

}
