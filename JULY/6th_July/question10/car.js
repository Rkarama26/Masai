
// car function demonstrate Car
export function Car(make, model, year, type){
         this.make = make;
         this.model = model;
         this.year = year;
         this.type = type;
         this.isAvailable = true; 
         this.maintenanceHistory = [];
}

// add maintenance to the history
Car.prototype.addMaintenance = function(date, description) {
  this.maintenanceHistory.push({ date, description });
  console.log(`Maintenance added for ${this.make} ${this.model} on ${date}`);
};

// view last maintenance
Car.prototype.viewMaintenance = function() {
  console.log(`Maintenance history for ${this.make} ${this.model}:`);
  this.maintenanceHistory.forEach((entry, i) => {
    console.log(`${i + 1}. ${entry.date} - ${entry.description}`);
  });
};





