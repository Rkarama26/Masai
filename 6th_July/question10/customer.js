
//this is the customer function demonastrate a Customer
export function Customer(name, rentedCar = []) {
    this.name = name;
    this.rentedCar = rentedCar
}

// get a car on rent 
Customer.prototype.getCarOnRent = function (car) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (car.isAvailable) {
                this.rentedCar.push(car);
                car.isAvailable = false;
                console.log(`${this.name} has successfully rented ${car.model} car`)
                resolve(true)

            }
            else {
                console.log(`${car.model} car is already rented`)
                resolve(false)
            }
        }, 0)
    })
};
// return the rented car processing will take 2 sec
Customer.prototype.carReturns = function (usedCar) {

    return new Promise((resolve) => {
        setTimeout(() => {
            const index = this.rentedCar.indexOf(usedCar);
            if (index !== -1) {
                this.rentedCar.splice(index, 1)
                this.rentedCar.isAvailable = true
                console.log(`${usedCar.model} car available for rent`)
                resolve(true)
            }
            else {
                console.log(`${this.name} didn’t rent ${usedCar.model} car`);
                resolve(false)
            }

        }, 2000)
    })

}
