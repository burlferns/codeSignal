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

    //Helper function to determine if an item is a file or
    //a folder
    fuunction isFolder(item) {

    }



    //Put the string contents in a queue where the seperator
    //between different items in the string is '\f'
    const queue = fileSystem.split('\f');

    //This array holds the current path for the current item
    //being processed from the queue.
    const currPath = [];

    //This array holds the string length of the corresponding elements
    //in currPath
    const currPathLength = [];

    //This variable hold the level of the last item of the current path
    //When there is nothing in currPath or currPathLength, then
    //currLvl is -1
    let currLvl = -1;

    //This holds the longest abolute path
    let maxPathLen = 0;


    while(queue.length>0) {

    }







}
