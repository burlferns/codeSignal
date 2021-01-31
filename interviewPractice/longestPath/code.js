/*

Suppose we represent our file system as a string. For example, the string "user\n\tpictures\n\tdocuments\n\t\tnotes.txt" represents:

user
    pictures
    documents
        notes.txt
The directory user contains an empty sub-directory pictures and a sub-directory documents containing a file notes.txt.

The string "user\n\tpictures\n\t\tphoto.png\n\t\tcamera\n\tdocuments\n\t\tlectures\n\t\t\tnotes.txt" represents:

user
    pictures
        photo.png
        camera
    documents
        lectures
            notes.txt
The directory user contains two sub-directories pictures and documents. pictures contains a file photo.png and an empty second-level sub-directory camera. documents contains a second-level sub-directory lectures containing a file notes.txt.

We want to find the longest (as determined by the number of characters) absolute path to a file within our system. For example, in the second example above, the longest absolute path is "user/documents/lectures/notes.txt", and its length is 33 (not including the double quotes).

Given a string representing the file system in this format, return the length of the longest absolute path to a file in the abstracted file system. If there is not a file in the file system, return 0.

Note: Due to system limitations, test cases use form feeds ('\f', ASCII code 12) instead of newline characters.

Example

For fileSystem = "user\f\tpictures\f\tdocuments\f\t\tnotes.txt", the output should be
longestPath(fileSystem) = 24.

The longest path is "user/documents/notes.txt", and it consists of 24 characters.

Input/Output

[execution time limit] 4 seconds (js)

[input] string fileSystem

File system in the format described above. It is guaranteed that:

the name of a file contains at least a . and an extension;
the name of a directory or sub-directory does not contain a ..
Note: Due to system limitations, newline characters are given as form feeds ('\f', ASCII code 12) in our test cases.

Guaranteed constraints:
1 ≤ fileSystem.length ≤ 6310.

[output] integer




*/








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
    //being processed from the queue. Note that this is effectively a stack
    //and currLvl defined below is a pointer to the top of the stack
    const currPath = [];

    //This variable holds the sum of the string length of all the
    //elements in currPath. If there is nothing in currPath,
    //then currPathLength is 0
    let currPathLength = 0;

    //This variable hold the level of the last item of the current path
    //When there is nothing in currPath, then
    //currLvl is -1
    //See the comment on currPath above for info on currLvl
    let currLvl = -1;

    //This holds the longest abolute path
    let maxPathLength = 0;


    while(queue.length>0) {
        let queueItem = queue.shift();
        let nameLevel = getNameLevel(queueItem);
        let name = nameLevel[0];
        let level = nameLevel[1];
        let length = name.length;



        if(isFile(name)) {
            //If there is leading whitespace in the file name, then according
            //to test 10, it means that the white space is equivalent to
            //one '\t' prefix. So remove the leading whitespace and
            //add one to the level
            let noWhiteSpace = name.trim();
            if(noWhiteSpace.length<length) {
                name = noWhiteSpace;
                length = name.length;
                level++;
            }


            if(level>currLvl) {
                //Remove leading and ending whitespace from name
                name = name.trim();
                length = name.length;

                let slashes = 0; //These are the '/' in the path
                if(currLvl>=0) {
                    slashes = currLvl + 1;
                }

                let newLength = currPathLength + length + slashes;
                if(newLength>maxPathLength) {
                    maxPathLength = newLength;
                }
            }
            else {
                while(currLvl>=level) {
                    currLvl--;
                    let oldItem = currPath.pop();
                    let oldItemLength = oldItem.length;
                    currPathLength = currPathLength - oldItemLength;
                }

                let slashes = 0; //These are the '/' in the path
                if(currLvl>=0) {
                    slashes = currLvl + 1;
                }

                let newLength = currPathLength + length + slashes;
                if(newLength>maxPathLength) {
                    maxPathLength = newLength;
                }
            }
        }
        else {
            if(level>currLvl) {
                currLvl++;
                currPathLength = currPathLength + length;
                currPath[currLvl] = name;
            }
            else if(level===currLvl) {
                let oldItem = currPath.pop();
                let oldItemLength = oldItem.length;
                currPathLength = currPathLength - oldItemLength + length;
                currPath[currLvl] = name;
            }
            else {  //Runs if level<currLvl
                while(currLvl>level) {
                    currLvl--;
                    let oldItem = currPath.pop();
                    let oldItemLength = oldItem.length;
                    currPathLength = currPathLength - oldItemLength;
                }
                let oldItem = currPath.pop();
                let oldItemLength = oldItem.length;
                currPathLength = currPathLength - oldItemLength + length;
                currPath[currLvl] = name;
            }
        }

    }


    return maxPathLength;
}
