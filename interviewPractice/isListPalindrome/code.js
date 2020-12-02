/*

Note: Try to solve this task in O(n) time using O(1) additional space, where n is the number of elements in l, since this is what you'll be asked to do during an interview.

Given a singly linked list of integers, determine whether or not it's a palindrome.

Note: in examples below and tests preview linked lists are presented as arrays just for simplicity of visualization: in real data you will be given a head node l of the linked list

Example

For l = [0, 1, 0], the output should be
isListPalindrome(l) = true;

For l = [1, 2, 2, 3], the output should be
isListPalindrome(l) = false.

Input/Output

[execution time limit] 4 seconds (js)

[input] linkedlist.integer l

A singly linked list of integers.

Guaranteed constraints:
0 ≤ list size ≤ 5 · 105,
-109 ≤ element value ≤ 109.

[output] boolean

Return true if l is a palindrome, otherwise return false.



*/


// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function isListPalindrome(l) {
    //Take care of some edge cases first
    if(l===null || l.next===null) {
        return true;
    }

    if(l.next.next===null) {
        if(l.value===l.next.value) {
            return true;
        }
        else {
            return false;
        }
    }

    if(l.next.next.next===null) {
        if(l.value===l.next.next.value) {
            return true;
        }
        else {
            return false;
        }
    }


    // If we are here, then we don't have any edge cases

    //The clue says: "Use two pointers to reverse half of the linked list"

    //Find the second half of the linked list that we want to reverse
    //Do this in O(n) time with two pointers. One of them moving in
    //steps of 1 and the other in steps of 2
    let oneStepPtr = l;
    let twoStepPtr = l.next;
    while(twoStepPtr.next!==null && twoStepPtr.next.next!=null) {
        oneStepPtr = oneStepPtr.next;
        twoStepPtr = twoStepPtr.next.next;
    }

    let scndHalfList; //This points to the start of the second half of the list
    if(twoStepPtr.next===null) {
        scndHalfList = oneStepPtr.next;
    }
    else {
        scndHalfList = oneStepPtr.next.next;
    }

    //Now reverse the second half of the list. We will use three new pointers.
    //Two of these will be temp pointers and one will point to the begining
    //of the reversed list
    let beginRevList = scndHalfList;
    let tempA = scndHalfList.next;
    let tempB = scndHalfList.next.next;

    while(tempA.next!==null) {
        tempA.next = beginRevList;
        beginRevList = tempA;
        tempA = tempB;
        tempB = tempB.next;
    }
    tempA.next = beginRevList;
    beginRevList = tempA;

    //Now sweep across the 1st half & reversed 2nd half and check to see if each
    //value at each step is the same
    let sweepForward = l;
    let sweepReverse = beginRevList;

    while(sweepForward!==oneStepPtr) {
        if(sweepForward.value!==sweepReverse.value) {
            return false;
        }
        else {
            sweepForward = sweepForward.next;
            sweepReverse = sweepReverse.next;
        }
    }

    if(sweepForward.value!==sweepReverse.value) {
        return false;
    }
    else {
        return true;
    }
}
