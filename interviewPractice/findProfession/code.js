/*

Consider a special family of Engineers and Doctors. This family has the following rules:

Everybody has two children.
The first child of an Engineer is an Engineer and the second child is a Doctor.
The first child of a Doctor is a Doctor and the second child is an Engineer.
All generations of Doctors and Engineers start with an Engineer.
We can represent the situation using this diagram:

                E
           /         \
          E           D
        /   \        /  \
       E     D      D    E
      / \   / \    / \   / \
     E   D D   E  D   E E   D
Given the level and position of a person in the ancestor tree above, find the profession of the person.
Note: in this tree first child is considered as left child, second - as right.

Example

For level = 3 and pos = 3, the output should be
findProfession(level, pos) = "Doctor".

Input/Output

[execution time limit] 4 seconds (js)

[input] integer level

The level of a person in the ancestor tree, 1-based.

Guaranteed constraints:
1 ≤ level ≤ 30.

[input] integer pos

The position of a person in the given level of ancestor tree, 1-based, counting from left to right.

Guaranteed constraints:
1 ≤ pos ≤ 2(level - 1).

[output] string

Return Engineer or Doctor.


*/


function findProfession(level, pos) {
    let tree = 'Etree';

    while(level>2) {
        //This is the total number of positions on a level
        const totNbrAtLvl = Math.pow(2,(level-1));

        //Find if current pos on leftHalf or righHalf of current level
        let leftHalf = true;
        if(pos>totNbrAtLvl/2) {
            leftHalf = false;
        }

        /*
         * In the problem they tell us to only consider the tree that has E at the root
         * I call this the 'Etree'
         * There is a corresponding tree though that has D at the root and I call it 'Dtree'
         * The 'Dtree' and 'Etree' will have the opposite values at the same level and pos
         *
         * I am using the fact here that if pos is on the right half
         * of the total number of positions on the current level, then
         * the profession at pos at current level is the same as the
         * profession at (pos - (total positions at current level)/2) at one level
         * less than the current level, but in the tree that starts with the root
         * value that is opposite the current tree root value
         */

        //Set new tree value and pos value if necessary
        if(leftHalf===false) {
            if(tree==='Etree') {
                tree = 'Dtree';
            }
            else {
                tree = 'Etree';
            }

            pos = pos - totNbrAtLvl/2;
        }

        level--;
    }

    if(level===1) {
        return "Engineer";
    }

    if(level===2 && pos===1 && tree==='Etree') {
        return "Engineer";
    }

    if(level===2 && pos===2 && tree==='Etree') {
        return "Doctor";
    }

    if(level===2 && pos===1 && tree==='Dtree') {
        return "Doctor";
    }

    if(level===2 && pos===2 && tree==='Dtree') {
        return "Engineer";
    }
}
