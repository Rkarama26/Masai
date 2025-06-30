
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
    }
  }
  
}

const account = createBankAccount(0);

console.log(account.deposit(100));
console.log(account.withdraw(10));
console.log(account.getBlance())
