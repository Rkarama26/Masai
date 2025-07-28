
function largest(a, b, c){

   return largest = (a > b) 
                    ? (a > c ? a : c)
                    : (b > c ? b : c);
       
}

console.log(largest(4, 34, 32));