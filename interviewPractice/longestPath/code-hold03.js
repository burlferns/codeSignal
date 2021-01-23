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
    //a folder. Returns true for a file and false for a
    //folder
    function isFile(item) {
        return item.includes('.');
    }



    //Put the string contents in a queue where the seperator
    //between different items in the string is '\f'
    const queue = fileSystem.split('\f');

    //This array holds the current path for the current item
    //being processed from the queue.
    const currPath = [];

    //This variable holds the sum of the string length of all the
    //elements in currPath. If there is nothing in currPath,
    //then currPathLength is 0
    let currPathLength = 0;

    //This variable hold the level of the last item of the current path
    //When there is nothing in currPath, then
    //currLvl is -1
    let currLvl = -1;

    //This holds the longest abolute path
    let maxPathLength = 0;


    // while(queue.length>0) {
    //     let queueItem = queue.shift();
    //     let nameLevel = getNameLevel(queueItem);
    //     let name = nameLevel[0];
    //     let level = nameLevel[1];
    //     let length = name.length;

    //     if(isFile(name)) {
    //         let newLength = currPathLength + length;
    //         if(newLength>maxPathLength) {
    //             maxPathLength = newLength;
    //         }
    //     }
    //     else {
    //         if(level>currLvl) {
    //             currLvl++;
    //             currPathLength = currPathLength + length;
    //             currPath[currLvl] = name;
    //         }
    //         else if(level===currLvl) {
    //             let oldItem = currPath.pop();
    //             let oldItemLength = oldItem.length;
    //             currPathLength = currPathLength - oldItemLength + length;
    //             currPath[currLvl] = name;
    //         }
    //         else {  //Runs if level<currLvl

    //         }




    //     }




    // }

    const test = [];
    console.log('1 test =',test);

    test[0] = 'a';
    console.log('2 test =',test);

    test[1] = 'b'
    console.log('3 test =',test);
    console.log('3 test[1] =',test[1]);

    test.pop();
    console.log('4 test =',test);
    console.log('4 test[1] =',test[1]);






    return maxPathLength;
}
