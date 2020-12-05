/*

Note: Try to solve this task in O(list size) time using O(1) additional space, since this is what you'll be asked during an interview.

Given a singly linked list of integers l and a non-negative integer n, move the last n list nodes to the beginning of the linked list.

Example

For l = [1, 2, 3, 4, 5] and n = 3, the output should be
rearrangeLastN(l, n) = [3, 4, 5, 1, 2];
For l = [1, 2, 3, 4, 5, 6, 7] and n = 1, the output should be
rearrangeLastN(l, n) = [7, 1, 2, 3, 4, 5, 6].
Input/Output

[execution time limit] 4 seconds (js)

[input] linkedlist.integer l

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 105,
-1000 ≤ element value ≤ 1000.

[input] integer n

A non-negative integer.

Guaranteed constraints:
0 ≤ n ≤ list size.

[output] linkedlist.integer

Return l with the n last elements moved to the beginning.



*/


// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function rearrangeLastN(l, n) {
    if(n===0) {
        return l;
    }

    //Count the nodes in the list
    let ptrCurrent = l;
    let count =0;
    while(ptrCurrent.next!==null) {
        count++;
        ptrCurrent = ptrCurrent.next;
    }
    count++;

    if(n===count) {
        return l;
    }


    let headNewList = l;
    let tempX;
    let moveStep = count - n - 1;

    while(moveStep>0) {
        headNewList = headNewList.next;
        moveStep--;
    }

    tempX = headNewList;
    headNewList = headNewList.next;
    tempX.next = null;

    ptrCurrent.next = l;

    return headNewList;


}
