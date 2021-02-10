/*



You have two integer arrays, a and b, and an integer target value v. Determine whether there is a pair of numbers, where one number is taken from a and the other from b, that can be added together to get a sum of v. Return true if such a pair exists, otherwise return false.

Example

For a = [1, 2, 3], b = [10, 20, 30, 40], and v = 42, the output should be
sumOfTwo(a, b, v) = true.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer a

An array of integers.

Guaranteed constraints:
0 ≤ a.length ≤ 105,
-109 ≤ a[i] ≤ 109.

[input] array.integer b

An array of integers.

Guaranteed constraints:
0 ≤ b.length ≤ 105,
-109 ≤ b[i] ≤ 109.

[input] integer v

Guaranteed constraints:
-109 ≤ v ≤ 109.

[output] boolean

true if there are two elements from a and b which add up to v, and false otherwise.







*/






function sumOfTwo(a, b, v) {
    //Make a set from the longer array
    //and make the iterInts variable point to the shorter array
    let setofInts = null;
    let iterInts = null;
    if(a.length>b.length) {
        setOfInts = new Set(a);
        iterInts = b;
    }
    else {
        setOfInts = new Set(b);
        iterInts = a;
    }

    for(let i=0; i<iterInts.length; i++) {
        const iterInt = iterInts[i];
        const delta = v - iterInt;
        if(setOfInts.has(delta)) return true;
    }

    return false;
}
