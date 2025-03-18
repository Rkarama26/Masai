


/*
Title - L0- Reverse the number 
 

reverse the given number

*/

function reverseNumber(num){
    
    let ans = 0;

    while(num > 0){
        let n = num % 10;
        num = Math.floor(num /10);
    
         ans = (ans * 10) + n;
    }

    return ans;
}

let num = 971;
console.log(reverseNumber(6789));