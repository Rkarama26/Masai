// Object with a method
const user = {
  username: "Rohit",
  showUsername: function () {
    console.log("From method:", this.username);
  }
};

function showUsernameStandalone() {
  console.log("From standalone function:", this.username);
}

user.showUsername(); 

showUsernameStandalone(); 
