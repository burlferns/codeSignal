/*

Note: Your solution should have O(n) time complexity, where n is the number of elements in l, and O(1) additional space complexity, since this is what you would be asked to accomplish in an interview.

Given a linked list l, reverse its nodes k at a time and return the modified list. k is a positive integer that is less than or equal to the length of l. If the number of nodes in the linked list is not a multiple of k, then the nodes that are left out at the end should remain as-is.

You may not alter the values in the nodes - only the nodes themselves can be changed.

Example

For l = [1, 2, 3, 4, 5] and k = 2, the output should be
reverseNodesInKGroups(l, k) = [2, 1, 4, 3, 5];
For l = [1, 2, 3, 4, 5] and k = 1, the output should be
reverseNodesInKGroups(l, k) = [1, 2, 3, 4, 5];
For l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] and k = 3, the output should be
reverseNodesInKGroups(l, k) = [3, 2, 1, 6, 5, 4, 9, 8, 7, 10, 11].



*/


// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function reverseNodesInKGroups(l, k) {
    if(k===1) {
        return l;
    }

    //Count the number of elements in l
    let count = 0;
    let ptrCurrent = l;
    while(ptrCurrent!==null) {
        count++;
        ptrCurrent = ptrCurrent.next;
    }

    if(k>count) {
        return l;
    }

    let numReversals = Math.floor(count / k);

    function revK(ptrA,countK) {
        let ptrB = ptrA;
        let ptrC = ptrA.next;
        let tempX = ptrA.next.next;

        ptrA.next = null;
        countK--;

        while(countK>0) {
            ptrC.next = ptrA;
            countK--;
            ptrA = ptrC;
            ptrC = tempX;
            if(tempX!==null) {
                tempX = tempX.next;
            }
        }

        return [ptrA, ptrB, ptrC];
    }

    let tempA, tempB, tempC;

    // console.log('ptA l = ',printList(l))

    let revKreturnValue = revK(l,k);
    tempA = revKreturnValue[0];
    tempB = revKreturnValue[1];
    tempC = revKreturnValue[2];
    tempB.next = tempC;
    l = tempA;
    numReversals--;

    // console.log('ptB l = ',printList(l))

    let tempZ = tempB;
    while(numReversals>0) {
        revKreturnValue = revK(tempC,k);
        tempA = revKreturnValue[0];
        tempB = revKreturnValue[1];
        tempC = revKreturnValue[2];
        tempB.next = tempC;
        tempZ.next = tempA;
        tempZ = tempB;
        numReversals--;
    }

    return l;

    function printList(front) {
        let ptr = front;
        let logOut = "";

        while(ptr!==null) {
            logOut = logOut + ptr.value + "->";
            ptr = ptr.next;
        }

        return logOut;
    }
}
