const user = {
    name: "Rohit",
    age: 25,
    email: "rohit@example.com",
    isAdmin: true
};

const jsonString = JSON.stringify(user);

const parsedUser = JSON.parse(jsonString);

console.log(parsedUser.name);     
console.log(parsedUser.age);      
console.log(parsedUser.email);   
console.log(parsedUser.isAdmin); 
