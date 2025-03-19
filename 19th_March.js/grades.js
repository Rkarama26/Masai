let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };
  
/*
John - B
Emma - A
Sam - D
Bob - F
*/
  for(let student in studentScores){
     
    let score = studentScores[student]
    if(score >= 90){
        console.log(student +" - A");
    }
    else if(score >= 80){
        console.log(student +" - B");
    }
    else if(score >= 70){
        console.log(student +" - C");
    }
    else if(score >= 60){
        console.log(student +" - D");
    }
    else{
        console.log(student +" - F");
    }
    
    
    
    
    
    //console.log(studentScores[student] + " " +student)

    
  }