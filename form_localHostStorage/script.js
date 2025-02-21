document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const toggleLogin = document.getElementById("toggleLogin");
    const toggleSignup = document.getElementById("toggleSignup");
    const formTitle = document.getElementById("formTitle");

    toggleLogin.addEventListener("click", function (e) {
        e.preventDefault();
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        formTitle.textContent = "Login";
    });

    toggleSignup.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        formTitle.textContent = "Sign Up";
    });

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (name && email && password.length >= 6) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            alert("Signup successful! Please login.");
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
            formTitle.textContent = "Login";
        } else {
            alert("Please enter valid details (Password must be at least 6 characters)");
        }
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Login successful!");
        } else {
            alert("Invalid email or password!");
        }
    });
});
