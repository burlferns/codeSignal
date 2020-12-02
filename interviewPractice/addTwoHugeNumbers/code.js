/*

You're given 2 huge integers represented by linked lists. Each linked list element is a number from 0 to 9999 that represents a number with exactly 4 digits. The represented number might have leading zeros. Your task is to add up these huge integers and return the result in the same format.

Example

For a = [9876, 5432, 1999] and b = [1, 8001], the output should be
addTwoHugeNumbers(a, b) = [9876, 5434, 0].

Explanation: 987654321999 + 18001 = 987654340000.

For a = [123, 4, 5] and b = [100, 100, 100], the output should be
addTwoHugeNumbers(a, b) = [223, 104, 105].

Explanation: 12300040005 + 10001000100 = 22301040105.

Input/Output

[execution time limit] 4 seconds (js)

[input] linkedlist.integer a

The first number, without its leading zeros.

Guaranteed constraints:
0 ≤ a size ≤ 104,
0 ≤ element value ≤ 9999.

[input] linkedlist.integer b

The second number, without its leading zeros.

Guaranteed constraints:
0 ≤ b size ≤ 104,
0 ≤ element value ≤ 9999.

[output] linkedlist.integer

The result of adding a and b together, returned without leading zeros in the same format.


*/




// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function addTwoHugeNumbers(a, b) {
    //Take care of edge cases
    if(a===null) {
        return b;
    }
    if(b===null) {
        return a;
    }

    //Now deal with non edge cases

    function reverseList(front) {
        //Take care of edge cases here
        if(front.next===null) {
            return front;
        }

        //Take care of non-edge cases
        let tempA = front.next;
        let tempB = front.next.next;
        front.next = null;

        while(tempA.next!==null) {
            tempA.next = front;
            front = tempA;
            tempA = tempB;
            tempB = tempB.next;
        }

        tempA.next = front;
        front = tempA;

        return front;
    }

    function printList(front) {
        let ptr = front;
        let logOut = "";

        while(ptr!==null) {
            logOut = logOut + ptr.value + "->";
            ptr = ptr.next;
        }

        return logOut;
    }

    // console.log('a original:',printList(a));
    // console.log('b original:',printList(b));

    a = reverseList(a);
    b = reverseList(b);

    // console.log('a reversed:',printList(a));
    // console.log('b reversed:',printList(b));



    //Now add the two numbers
    let ptrA = a;
    let ptrB = b;
    let c = null; //This points to the start of the sum list
    let ptrC = null; //This points to the end of the sum list
    let carry = 0;
    let sum = 0;

    sum = ptrA.value + ptrB.value + carry;
    if(sum > 9999) {
        carry = 1;
        sum = sum % 10000;
    }
    else {
        carry = 0;
    }

    c = new ListNode(sum);
    ptrC = c;

    ptrA = ptrA.next;
    ptrB = ptrB.next;


    while(ptrA!==null && ptrB!=null) {
        sum = ptrA.value + ptrB.value + carry;
        if(sum > 9999) {
            carry = 1;
            sum = sum % 10000;
        }
        else {
            carry = 0;
        }

        let newNode = new ListNode(sum);
        ptrC.next = newNode;
        ptrC = newNode;

        ptrA = ptrA.next;
        ptrB = ptrB.next;

    }

    while(ptrA!==null) {
        sum = ptrA.value + carry;
        if(sum > 9999) {
            carry = 1;
            sum = sum % 10000;
        }
        else {
            carry = 0;
        }

        let newNode = new ListNode(sum);
        ptrC.next = newNode;
        ptrC = newNode;

        ptrA = ptrA.next;
    }

    while(ptrB!==null) {
        sum = ptrB.value + carry;
        if(sum > 9999) {
            carry = 1;
            sum = sum % 10000;
        }
        else {
            carry = 0;
        }

        let newNode = new ListNode(sum);
        ptrC.next = newNode;
        ptrC = newNode;

        ptrB = ptrB.next;
    }

    if(carry===1) {
        let newNode = new ListNode(carry);
        ptrC.next = newNode;
        ptrC = newNode;
    }

    return reverseList(c);




}
