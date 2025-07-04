const car = {
  brand: "Toyota",
  getBrand: function () {
    return this.brand;
  }
};


const boundGetBrand = car.getBrand.bind(car);


console.log(boundGetBrand()); 
