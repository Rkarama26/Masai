
function createEmployee(name,role, salary){
  return{
    name, 
    role,
    salary,
     introduce(){
      console.log(`Hello, I am ${name}, working as a ${role}`)
    }
  }
  
}

let emp1 = createEmployee("rohit", "developer", 1000000)
console.log(emp1)
emp1.introduce()
