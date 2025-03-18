

/*
Title - L0-Happy number
*/

function happyNumber(num){

    while(num !== 1){
        let sum = 0;
        let digits = num.toString().split('').map(Number);
        for(let digit of digits){
            sum += digit**2;
        }
        console.log("Current Value of Num "+ num)
        num = sum;
    }
    return num;
}

let num = 19
console.log(happyNumber(num));