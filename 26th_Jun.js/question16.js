

/*
The bankAccount function should return an object with methods:

deposit(amount) to increase the balance.
withdraw(amount) to decrease the balance.
getBalance() to return the current balance.
Bonus:
Ensure that the withdraw() method doesn't allow withdrawals that exceed the current balance.
Add a reset() method that resets the account to an initial balance.

*/
function createBankAccount(initialBalance){
  let balance = initialBalance;
  
  return {
    deposit: (amount)=> {
      balance += amount
      return balance;
    },
    
    withdraw: (amount) =>{
      
      return amount > balance ? "Insufficient Balance" : balance-= amount; 
    },
    
    getBlance: ()=> {
      return balance;
    },
    
    resetAcc: ()=> {
      return balance = initialBalance;
    }
  }
  
}

const account = createBankAccount(0);

console.log(account.deposit(100));
console.log(account.withdraw(1000));
console.log(account.getBlance())
console.log(account.resetAcc())
