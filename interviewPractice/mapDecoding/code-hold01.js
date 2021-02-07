function mapDecoding(msg) {
    const msgL = msg.length;
    console.log('msgL=',msgL);


/***********************************************************************
    Take care of cases that won't work with closed form mathematical formula
    */
    if(msgL===0) {
        return 1
    }

    if(msgL===1) {
        if(msg==="0") {
            return 0;
        }
        else {
            return 1;
        }
    }

    if(msgL===2) {
        if(parseInt(msg[0]+msg[1],10)<=26) {
            return 2;
        }
        else {
            return 1;
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
    cache[msgL-1] = 1;
    if(parseInt(msg[msgL-2]+msg[msgL-1],10)<=26) {
        cache[msgL-2] = 2;
    }
    else {
        cache[msgL-2] = 1;
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
        if(parseInt(msg[i]+msg[i+1],10)<=26) {
            cache[i] = (cache[i+1] + cache[i+2]) % (1e9+7);
        }
        else {
            cache[i] = cache[i+1] % (1e9+7);
        }
    }

    return cache[0];
}
