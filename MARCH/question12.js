function greetUser(){
  
    let name = prompt("Enter your name");
    
    if(!name){
      name = "Guest";
    }
    alert(`Hello, ${name}`);
    
  }
  
  greetUser();