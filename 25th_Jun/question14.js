const userProfile = {
  name: "Alice",
  age: 28,

  details: function () {
    return `${this.name} is ${this.age} years old.`;
  },

  // Update age and log the updated user details
  updateAge(newAge) {
    if (newAge <= 0) {
      console.log("Invalid age.");
      return;
    }
    this.age = newAge;
    console.log(this.details()); // Call the method
  }
};

// Usage
userProfile.updateAge(30); 
console.log(userProfile.details()); 