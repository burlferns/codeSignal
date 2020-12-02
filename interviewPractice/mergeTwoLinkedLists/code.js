/*

Note: Your solution should have O(l1.length + l2.length) time complexity, since this is what you will be asked to accomplish in an interview.

Given two singly linked lists sorted in non-decreasing order, your task is to merge them. In other words, return a singly linked list, also sorted in non-decreasing order, that contains the elements from both original lists.

Example

For l1 = [1, 2, 3] and l2 = [4, 5, 6], the output should be
mergeTwoLinkedLists(l1, l2) = [1, 2, 3, 4, 5, 6];
For l1 = [1, 1, 2, 4] and l2 = [0, 3, 5], the output should be
mergeTwoLinkedLists(l1, l2) = [0, 1, 1, 2, 3, 4, 5].
Input/Output

[execution time limit] 4 seconds (js)

[input] linkedlist.integer l1

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 104,
-109 ≤ element value ≤ 109.

[input] linkedlist.integer l2

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 104,
-109 ≤ element value ≤ 109.

[output] linkedlist.integer

A list that contains elements from both l1 and l2, sorted in non-decreasing order.

*/




// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function mergeTwoLinkedLists(l1, l2) {
    //Take care of edge cases first
    if(l1===null) {
        return l2;
    }

    if(l2===null) {
        return l1;
    }

    //Now take care of non-edge cases
    let ptrL1 = l1;
    let ptrL2 = l2;

    let lout; // This points to the start of the output list
    let ptrLout;
    let newNode;

    if(ptrL1.value<=ptrL2.value) {
        newNode = new ListNode(ptrL1.value);
        ptrL1 = ptrL1.next;
    }
    else {
        newNode = new ListNode(ptrL2.value);
        ptrL2 = ptrL2.next;
    }

    lout = newNode;
    ptrLout = newNode;

    while(ptrL1!==null && ptrL2!=null) {
        if(ptrL1.value<=ptrL2.value) {
            newNode = new ListNode(ptrL1.value);
            ptrL1 = ptrL1.next;
        }
        else {
            newNode = new ListNode(ptrL2.value);
            ptrL2 = ptrL2.next;
        }
        ptrLout.next = newNode;
        ptrLout = newNode;
    }

    while(ptrL1!==null) {
        newNode = new ListNode(ptrL1.value);
        ptrL1 = ptrL1.next;
        ptrLout.next = newNode;
        ptrLout = newNode;
    }

    while(ptrL2!==null) {
        newNode = new ListNode(ptrL2.value);
        ptrL2 = ptrL2.next;
        ptrLout.next = newNode;
        ptrLout = newNode;
    }

    return lout;

}
