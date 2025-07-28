
//square

// let ans = "";
// for(let i = 0; i<5; i++){

//   for(let j = 0; j<5; j++){
//     ans += "* "
//   }
//   ans += "\n"
// }

// console.log(ans)


//----------CROSS----------------

let n = 5

function drawCross(n) {
    for (let i = 0; i < n; i++) {
        let pattern = "";
        for (let j = 0; j <= n; j++) {
            if (i === j || i + j === n - 1) {
                pattern += "* ";
            }
            else {
                pattern += " ";
            }

        }
        console.log(pattern);
    }
   
}

drawCross(5);