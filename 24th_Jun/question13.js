const people = [ 
  { 
    name: "Alice", 
    address: { 
      city: "New York", 
      street: { name: "Broadway", number: 123 } 
    } 
  }, 
  { 
    name: "Bob", 
    address: { 
      city: "Los Angeles", 
      street: { name: "Sunset Boulevard", number: 456 } 
    } 
  } 
];


const [
  
  {name: firstName,
   address: {
     city: firstCity,
     street: {name: firstStreet, number: firstNumber}
   }  
  },
  
  {name: secName,
   address :{
     city: secCity,
     street : {name: secStreet, number: secNumber}
   }
    
  }
  
  ] = people


console.log(`${firstName} lives in ${firstCity} on ${firstStreet}`)
console.log(`${secName} lives in ${secCity} on ${secStreet}`)













