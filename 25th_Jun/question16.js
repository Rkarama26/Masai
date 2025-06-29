function greetUser(name) {
  const greeting = "Hello";

  function displayGreeting() {
    console.log(`${greeting}, ${name}!`);
  }

  displayGreeting();
}

greetUser("Rohit");
