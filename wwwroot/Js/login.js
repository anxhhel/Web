document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    document.getElementById("login-form").addEventListener("submit", login);
});

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "Admin") {
        alert("Access denied. You must be logged in as an admin.");
        window.location.href = "login.html";
    }
});


// // ✅ Function to handle login
// function login(event) {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     fetch("/api/Auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.token) {
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("username", username);
//             alert("Login successful!");
//             redirectToDashboard();
//         } else {
//             alert("Invalid credentials. Please try again.");
//         }
//     })
//     .catch(error => console.error("Error during login:", error));
// }

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5145/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, passwordHash: password }) // No hashing, just send plain password
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Invalid username or password");
        }
        return response.json();
    })
    .then(data => {
        alert("Login successful!");
        window.location.href = "admin.html"; // Redirect to admin panel
    })
    .catch(error => {
        alert(error.message);
    });
});



// // ✅ Function to check if user is logged in
// function checkLoginStatus() {
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");

//     if (token) {
//         document.getElementById("login-link").style.display = "none";
//         document.getElementById("logout-link").style.display = "block";

//         if (username === "admin1" || username === "admin2") {
//             document.getElementById("admin-link").style.display = "block";
//         }
//     } else {
//         document.getElementById("login-link").style.display = "block";
//         document.getElementById("logout-link").style.display = "none";
//         document.getElementById("admin-link").style.display = "none";
//     }
// }

// ✅ Function to logout
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out successfully.");
    window.location.href = "login.html";
}

// ✅ Function to redirect user based on role
function redirectToDashboard() {
    const username = localStorage.getItem("username");

    if (username === "admin1" || username === "admin2") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "menu.html";
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.getElementById("login-form");

//     // Handle form submission
//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         handleLogin();
//     });
// });

// function handleLogin() {
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();

//     // Simulated credentials (Admin & Customer)
//     const adminCredentials = { username: "admin", password: "admin123" };
//     const customerCredentials = { username: "customer", password: "customer123" };

//     if (username === adminCredentials.username && password === adminCredentials.password) {
//         // Login as admin
//         localStorage.setItem("role", "admin");
//         alert("Logged in as Admin!");
//         window.location.href = "admin.html"; // Redirect to admin page
//     } else if (username === customerCredentials.username && password === customerCredentials.password) {
//         // Login as customer
//         localStorage.setItem("role", "customer");
//         alert("Logged in as Customer!");
//         window.location.href = "menu.html"; // Redirect to menu page
//     } else {
//         // Invalid login
//         alert("Invalid username or password!");
//     }
// }