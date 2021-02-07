
//Basic idea:
// The recursive function below indicates how the problem
//  would be naievely solved.
// However, that would take *forever.*
// Therefore, we use DP instead!

//NOTE:
// This function is not used.
// It is only to demonstrate how the DP works.
function recurse(message) {
    //There's one way to write an empty message
    if(message == '')
        return 1;
    //There are no ways to write a message starting with 0
    if(message[0] == '0')
        return 0;

    return (
        //If the first two values are a valid symbol, try removing them
        (message.length>1 && +message.slice(0,2) < 27 ? recurse(message.slice(2)) : 0) +
        //And also try removing the first character
        recurse(message.slice(1))
    ) % (1e9+7);
}


//The for loop here encodes the recursive function above
function mapDecoding(message) {
    var DP = [],
        len = message.length,
        mod = 1e9+7;

    //As above, there is one way to decode the end of the string
    DP[len] = 1;
    //And no ways to decode past the end of the string
    DP[len+1] = 0;

    for(var i=len; i--; )
        DP[i] = message[i] == '0' ? 0 :
            (DP[i+1] + (+message.substr(i,2) < 27 ? DP[i+2] : 0)) % mod;
    return DP[0];
}
