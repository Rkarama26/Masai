// middleware.js
async function checkRoleAndRedirect() {
  const email = localStorage.getItem("email");
  if (!email) {
    alert("Unauthorized. Redirecting...");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch("https://auth-d2bdd-default-rtdb.firebaseio.com/users.json");
  const data = await res.json();

  let currentUser = null;
  for (let key in data) {
    if (data[key].email === email) {
      currentUser = data[key];
      break;
    }
  }

  if (!currentUser) {
    alert("User not found.");
    window.location.href = "index.html";
    return;
  }

  if (window.location.pathname.includes("admin-dashboard") && currentUser.role !== "admin") {
    window.location.href = "user-dashboard.html";
  }
}
checkRoleAndRedirect();
