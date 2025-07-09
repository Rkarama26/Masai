


function createCar(make,model, year){
  return{
   make,
   model,
   year,
   describe(){
      console.log(`This car is a ${year} ${make} ${model}.`)
    }
  }
  
}

const car = createCar("Hundui", "SUV", 2005)
console.log(car);
car.describe()
