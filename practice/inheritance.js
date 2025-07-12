
// function bankAccount(name, initialBalance, address) {

//     let account = {};

//     account.name = name;
//     account.balance = initialBalance;
//     account.address = address;

//     account.deposit = function (amount) {
//         account.balance += amount;
//         console.log(account.balance)
//     };

//     account.withdraw = function (amount) {
//         if (amount <= account.balance) {
//             account.balance -= amount;
//         }
//         console.log(account.balance)
//     }
//     return account;
// }


// now here each time i create an object of backAccount it will have the 
// deposit and withdraw methods that i don't needed at each time.......
// and that consume more memory also 
// const newAccount = bankAccount("rohit", 100, "Bhopal")



// so we can avoid this using prototypical inheritance 
// we can create a seperate obje with this funtions and ->  obj.proto = obj2
// like this we can access that methods also

//----------------------------------------------------
// const bankAccountFun = {

//     deposit: function (amount) {
//         this.balance += amount;
//         console.log(this.balance)
//     },

//     withdraw: function (amount) {
//         if (amount <= this.balance) {
//             this.balance -= amount;
//         }
//         console.log(this.balance)
//     }
// }

// function createBankAccount(name, balance){

//     const user = Object.create(bankAccountFun);
//     user.name = name,
//     user.balance = balance
//     return user;
// }

// here we created seperate object for methods
// const newAccount = createBankAccount("rohit", 100)

// newAccount.deposit(100);
// newAccount.withdraw(50);


//-----------------------------------------------
// this will also work 
// here i will put deposit function in Bank.prototype 

//  function Bank(name, balance){
//     this.name = name;
//     this.balance = balance;
//     // this.deposit = function(amount){
//     //    this.balance += amount;
//     // }
//  }

//  Bank.prototype.deposit  = function(amount){
//        this.balance += amount;
//     }


//  const user1 = new Bank("Rohit", 1000);
//  user1.deposit(500)
//  console.log(user1)


//-----------------------------------------------

// function Animal(name, isBird, legs){
//     this.name =  name;
//     this.isBird = isBird;
//     this.legs = legs

// }
// Animal.prototype.speak = function(){
//    console.log(`${this.name}, says, hello`);
// }

// let animal1 = new Animal("owl", true, 2)
// animal1.speak()
// console.log(animal1)


//Class constructor -----------------------

// class Animal {
//    constructor(name, isBird, legs) {
//       this.name = name;
//       this.isBird = isBird;
//       this.legs = legs;
//    };
//    speak() {
//       console.log(`${this.name} says , hello`)
//    }
// }

// let animal1 = new Animal("owl", true, 2);
// console.log(animal1)


//-----------------------------------------
// class Animal {
//    constructor(name, isBird, legs) {
//       this.name = name;
//       this.isBird = isBird;
//       this.legs = legs
//    }
//    speak() {
//    console.log(`${this.name}, says, hello`);
// }
// }


// class Birds extends Animal{
//    constructor(name, isBird, legs, canFly){
//       super(name, isBird, legs)
//       this.canFly= canFly;
//    }
// }

// let bird1 = new Birds("sparrow", true, 2, true)
// console.log(bird1)

//-----------Better way -> Private Fields

// class Bank{
//    //Private Fields
//    #pin
//    #kyc
//    constructor(name, aadhar, pin ){
//       this.name = name;
//       this.aadhar = aadhar;
//       this.#pin = pin;
//       this.#kyc = false
//    }
//    get pin(){
//      return this.#pin
//    }

//    set pin(cred){
//        if(cred.aadhar == this.aadhar && cred.pin == this.#pin){
//          this.#pin = cred.newPin;
//        }
//        else{
//          return "invalid";
//        }
//    }
// }
// // making fields privage 
// let account = new Bank("Bheem", "4567856789", 1234);
// // pin is not accessible now , no one can chagne it 
// //console.log(account.#pin)
// console.log(account)
// // getter and setter -> for accessing Private fileds
// console.log(account.pin)
// let obj = {
//    aadhar : "4567856789",
//    pin : 1234,
//    newPin : 5678
// }
// account.pin = obj;
// console.log(account.pin)




function Animal(){
  this.type = "animal";
}
Animal.prototype.sound = function(){
  console.log("Animal sound")
};

function Dog(){
  Animal.call(this);
  this.type = "Dog"
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.sound = function(){
  console.log("Bark");
}

const dog = new Dog("Bruno");
dog.sound()













