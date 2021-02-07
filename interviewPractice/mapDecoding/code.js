/*

A top secret message containing uppercase letters from 'A' to 'Z' has been encoded as numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
You are an FBI agent and you need to determine the total number of ways that the message can be decoded.

Since the answer could be very large, take it modulo 109 + 7.

Example

For message = "123", the output should be
mapDecoding(message) = 3.

"123" can be decoded as "ABC" (1 2 3), "LC" (12 3) or "AW" (1 23), so the total number of ways is 3.

Input/Output

[execution time limit] 4 seconds (js)

[input] string message

A string containing only digits.

Guaranteed constraints:
0 ≤ message.length ≤ 105.

[output] integer

The total number of ways to decode the given message.

*/


/***********************************************************************
This version has no cache
*/
function mapDecoding(message) {
    const divVal = 1e9+7;

    function recurse(msg) {
        if(msg==='') {
            return 1;
        }

        if(msg[0]==='0') {
            return 0
        }

        const msgL = msg.length;

        if(msgL===1) {
            return 1;
        }

        if(msgL===2) {
            if(msg[1]==='0') {
                if(msg[0]==='1' || msg[0]==='2') {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                if(parseInt(msg[0]+msg[1],10)<=26) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
        }

        //First get the ways if the first two digits can be decoded together
        let ways2digits = 0;
        if(parseInt(msg[0]+msg[1],10)<=26) {
            ways2digits = recurse(msg.slice(2));
        }

        //Then get the ways for only the first digit decoded
        let ways1digit = recurse(msg.slice(1));

        return (ways1digit + ways2digits) % divVal;
    }

    return recurse(message);
}




/***********************************************************************
This version has a cache
*/
function mapDecoding(message) {
    const divVal = 1e9+7;

    const cache = new Map();

    function recurse(msg) {
        if(msg==='') {
            return 1;
        }

        if(msg[0]==='0') {
            return 0
        }

        const msgL = msg.length;

        if(msgL===1) {
            return 1;
        }

        if(msgL===2) {
            if(msg[1]==='0') {
                if(msg[0]==='1' || msg[0]==='2') {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                if(parseInt(msg[0]+msg[1],10)<=26) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
        }

        //First get the ways if the first two digits can be decoded together
        let ways2digits = 0;
        if(parseInt(msg[0]+msg[1],10)<=26) {
            const checkCache2 = cache.get(msg.slice(2));
            if(checkCache2) {
                ways2digits = checkCache2;
            }
            else {
                ways2digits = recurse(msg.slice(2));
                cache.set(msg.slice(2),ways2digits);
            }
        }

        //Then get the ways for only the first digit decoded
        let ways1digit = 0;
        const checkCache1 = cache.get(msg.slice(1));
        if(checkCache1) {
            ways1digit = checkCache1;
        }
        else {
            ways1digit = recurse(msg.slice(1));
            cache.set(msg.slice(1),ways1digit);
        }

        return (ways1digit + ways2digits) % divVal;
    }

    return recurse(message);
}
