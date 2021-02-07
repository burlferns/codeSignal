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


function mapDecoding(msg) {
    const msgL = msg.length;
    console.log('msgL=',msgL);
    
    
/***********************************************************************
    Take care of cases that won't work with closed form mathematical formula
    */
    if(msgL===0) {
        return 1
    }
    
    if(msg[0]==='0') {
        return 0;
    }
    
    if(msgL===1) {
        return 1;
    }    
    
    if(msgL===2) {
        let num2digits = parseInt(msg[0]+msg[1],10);
        
        if(msg[1]!==0) {
            if(num2digits<=26) {
                return 2;
            }
            else {
                return 1;
            }
        }
        else {
            if(num2digits<=26) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

/***********************************************************************
    If there are any zeros, remove them properly
    */
    // if(msg[0]==="0") {
    //     return 0;
    // }
        
    // let newMsg = "";
    // for(let i=0; i<msgL; i++) {
    //     if(msg[i]!==0) {
    //         newMsg = newMsg + msg[i];
    //     }
    //     else {
    //         if(parseInt(msg[0]+msg[1],10)<=26) {
    //             return 0;
    //         }
    //     }
    // }


    
/***********************************************************************
    From this point use closed form mathematical formula
    */
    //Create cache and initialize it
    let cache = [];
    if(msg[msgL-1]!==0) {
        cache[msgL-1] = 1;
        if(parseInt(msg[msgL-2]+msg[msgL-1],10)<=26) {
            cache[msgL-2] = 2;
        }
        else {
            cache[msgL-2] = 1;
        }
    }
    else {
        if(parseInt(msg[msgL-2]+msg[msgL-1],10)>26) {
            return 0;
        }
        else {
            cache[msgL-1] = null;
            cache[msgL-2] = 1;
        }
    }
    
    
    
    
    
    
    //Process rest of cache - but we don't use the following for loop as the
    //result can be too big. We use the reminder after dividing by (1e9+7)
    //See the next uncommented for loop below
    // for(let i=msgL-3; i>=0; i--) {
    //     if(parseInt(msg[i]+msg[i+1],10)<=26) {
    //         cache[i] = cache[i] + cache[i+2];
    //     }
    //     else {
    //         cache[i] = cache[i+1]);
    //     }
    // }
    
    //Process rest of cache
    for(let i=msgL-3; i>=0; i--) {
        if(msg[i]!=='0') {
            if(cache[i+2]===null) {
                cache[i] = cache[i+1] % (1e9+7);
            }
            else if(parseInt(msg[i]+msg[i+1],10)<=26) {
                cache[i] = (cache[i+1] + cache[i+2]) % (1e9+7);
            }
            else {
                cache[i] = cache[i+1] % (1e9+7);
            }
        }
        else {
            if(msg[i-1]==='0' || parseInt(msg[i-1],10)>=3) {
                return 0;
            }
            else {
                cache[i-1] = cache[i+1] % (1e9+7);
                cache[i] = null;
                i--;
            }
        }
        
    }
    
    return cache[0];
}



















