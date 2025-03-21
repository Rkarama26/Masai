let user = { name: "Bob", role: "user", active: true };


function auth(user) {

    let result = (user.role == "admin")
        ? ((user.active == true) ? "Admin Access Granted!" : "Admin Access Revoked")
        : (user.role == "user")
            ? ((user.active == true) ? "User Access Granted!" : "User Access Revoked")
            : "Access Denied";

     return result;           
 }

 console.log(auth(user))