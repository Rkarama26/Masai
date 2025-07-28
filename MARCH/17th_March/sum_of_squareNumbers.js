

/*

L1 - Sum of square number 

PT - Given a non-negative integer K , decide wheather there're two 
     integers a and b such that a^2 + b^2 = k

*/


function sumOfSquare(K){

  let left = 1;
  let right = K;

  while(left < right){

    if((left**2 + right**2) === K){
      return [left, right];
      
    }
    else if((left**2 + right**2) > K){
       right--;
    }
    else{
      left++;
    }
    
  }
return false;
}

console.log(sumOfSquare(61))