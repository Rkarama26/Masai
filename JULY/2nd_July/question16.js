
/*
Create a program that simulates API calls using nested callbacks:

fetchUserData(callback):
Logs "Fetching user data..."
After 1s, calls callback with "User data received"
Inside callback, fetchUserPosts(callback):
Logs "Fetching user posts..."
After 1.5s, calls callback with "User posts received"
Finally log "All data loaded successfully!"
*/



function fetchUserData(callback) {
  console.log("Fetching user data...");
  setTimeout(() => {
    const userData = "User data received";
    console.log(userData);
    callback(userData);
  }, 1000); 
}

function fetchUserPosts(callback) {
  console.log("Fetching user posts...");
  setTimeout(() => {
    const userPosts = "User posts received";
    console.log(userPosts);
    callback(userPosts);
  }, 1500); 
}


fetchUserData(() => {
  fetchUserPosts(() => {
    console.log("All data loaded successfully!");
  });
});
