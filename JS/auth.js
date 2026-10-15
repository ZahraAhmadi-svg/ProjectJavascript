
"use strict";

/* =========================================================
   RESPAIR DAWN — AUTHENTICATION SYSTEM
   Numeric roles:
   0 = User
   1 = Manager
   2 = Editor
   3 = Administrator

   Public registration always creates role 0.
   ========================================================= */


/* =========================================================
   1. STORAGE KEYS
   ========================================================= */

const USERS_KEY = "respairUsers";
const CURRENT_USER_KEY = "respairUser";
const USER_DATA_KEY = "respairUserData";
const ADMIN_SESSION_KEY = "respairAdminAuthenticated";


/* =========================================================
   2. HTML ELEMENTS
   ========================================================= */

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");


/* =========================================================
   3. INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeUsers();
    migrateOldUsers();
    initializeTabs();
    initializePasswordButtons();
    initializeForms();
});


/* =========================================================
   4. ROLE SYSTEM
   ========================================================= */

// Convert old string roles and numeric roles to numeric roles.
function normalizeRole(role) {
    if (typeof role === "number" &&
        Number.isInteger(role) &&
        role >= 0 &&
        role <= 3) {
        return role;
    }

    const value = String(role ?? "user")
        .trim()
        .toLowerCase();

    const roleMap = {
        "0": 0,
        "user": 0,

        "1": 1,
        "manager": 1,

        "2": 2,
        "editor": 2,

        "3": 3,
        "admin": 3,
        "administrator": 3
    };

    return Object.prototype.hasOwnProperty.call(roleMap, value)
        ? roleMap[value]
        : 0;
}


function getRoleName(role) {
    switch (normalizeRole(role)) {
        case 0:
            return "You are logged in as a User.";

        case 1:
            return "You are logged in as a Manager.";

        case 2:
            return "You are logged in as an Editor.";

        case 3:
            return "You are logged in as an Administrator.";

        default:
            return "You are logged in as a User.";
    }
}


function getRoleLabel(role) {
    switch (normalizeRole(role)) {
        case 0:
            return "User";

        case 1:
            return "Manager";

        case 2:
            return "Editor";

        case 3:
            return "Administrator";

        default:
            return "User";
    }
}


/* =========================================================
   5. INITIALIZE USER STORAGE
   ========================================================= */

function initializeUsers() {
    try {
        const savedUsers = localStorage.getItem(USERS_KEY);

        if (savedUsers === null) {
            localStorage.setItem(USERS_KEY, JSON.stringify([]));
            return;
        }

        const users = JSON.parse(savedUsers);

        if (!Array.isArray(users)) {
            localStorage.setItem(USERS_KEY, JSON.stringify([]));
        }
    } catch (error) {
        console.error("Unable to initialize users:", error);

        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
}


/* =========================================================
   6. MIGRATE OLD USERS
   Convert string roles to numbers and import old accounts.
   ========================================================= */

function migrateOldUsers() {
    let users = getUsers();

    // Normalize existing Respair accounts.
    users = users.map(function (user) {
        return {
            ...user,
            role: normalizeRole(user.role ?? user.accountType)
        };
    });

    // Import accounts from the older project storage key.
    try {
        const oldData = localStorage.getItem("aw_users");
        const oldUsers = oldData ? JSON.parse(oldData) : [];

        if (Array.isArray(oldUsers)) {
            oldUsers.forEach(function (oldUser) {
                if (!oldUser || typeof oldUser !== "object") {
                    return;
                }

                const email = String(oldUser.email || "")
                    .trim()
                    .toLowerCase();

                const username = String(oldUser.username || "")
                    .trim();

                const exists = users.some(function (user) {
                    return (
                        (email && String(user.email || "").toLowerCase() === email) ||
                        (username &&
                            String(user.username || "").toLowerCase() ===
                            username.toLowerCase())
                    );
                });

                if (exists || (!email && !username)) {
                    return;
                }

                const importedUser = {
                    id: oldUser.id || generateUserId(),
                    name: oldUser.name || oldUser.fullName || username,
                    username: username,
                    email: email,
                    password: oldUser.password || "",
                    role: normalizeRole(oldUser.role ?? oldUser.accountType),
                    createdAt: oldUser.createdAt || new Date().toISOString()
                };

                users.push(importedUser);
                createUserData(importedUser);
            });
        }
    } catch (error) {
        console.error("Unable to migrate old users:", error);
    }

    saveUsers(users);
}


/* =========================================================
   7. GET AND SAVE USERS
   ========================================================= */

function getUsers() {
    try {
        const data = localStorage.getItem(USERS_KEY);

        if (!data) {
            return [];
        }

        const users = JSON.parse(data);

        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error("Unable to read users:", error);
        return [];
    }
}


function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


/* =========================================================
   8. USER ID
   ========================================================= */

function getUserId(user) {
    return String(
        user.id ||
        user.email ||
        user.username ||
        "default-user"
    );
}


function generateUserId() {
    return "USR-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        Math.random().toString(36).substring(2, 7).toUpperCase();
}


/* =========================================================
   9. USER DATA
   Keep Favorites, Saved items and My Classes compatible.
   ========================================================= */

function createUserData(user) {
    let allData = {};

    try {
        allData = JSON.parse(
            localStorage.getItem(USER_DATA_KEY) || "{}"
        );

        if (
            !allData ||
            typeof allData !== "object" ||
            Array.isArray(allData)
        ) {
            allData = {};
        }
    } catch (error) {
        allData = {};
    }

    const userId = getUserId(user);

    if (!allData[userId]) {
        allData[userId] = {
            classes: [],
            favorites: [],
            saved: []
        };
    } else {
        allData[userId].classes ||= [];
        allData[userId].favorites ||= [];
        allData[userId].saved ||= [];
    }

    localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(allData)
    );
}


/* =========================================================
   10. LOGIN AND REGISTER TABS
   ========================================================= */

function initializeTabs() {
    loginTab?.addEventListener("click", showLogin);
    registerTab?.addEventListener("click", showRegister);

    switchButton?.addEventListener("click", function () {
        const isRegistering =
            registerSection &&
            !registerSection.classList.contains("d-none");

        if (isRegistering) {
            showLogin();
        } else {
            showRegister();
        }
    });
}


function showLogin() {
    if (!loginSection || !registerSection) return;

    loginSection.classList.remove("d-none");
    registerSection.classList.add("d-none");

    loginTab?.classList.add("active");
    registerTab?.classList.remove("active");

    if (switchText) {
        switchText.textContent = "Not a member?";
    }

    if (switchButton) {
        switchButton.textContent = "Register now";
    }

    clearMessages();
    clearInputErrors();
}


function showRegister() {
    if (!loginSection || !registerSection) return;

    loginSection.classList.add("d-none");
    registerSection.classList.remove("d-none");

    loginTab?.classList.remove("active");
    registerTab?.classList.add("active");

    if (switchText) {
        switchText.textContent = "Already a member?";
    }

    if (switchButton) {
        switchButton.textContent = "Sign in";
    }

    clearMessages();
    clearInputErrors();
}


/* =========================================================
   11. SHOW / HIDE PASSWORD
   ========================================================= */

function initializePasswordButtons() {
    document.querySelectorAll(".password-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(
                button.dataset.target
            );

            const icon = button.querySelector("i");

            if (!target || !icon) return;

            const showPassword = target.type === "password";

            target.type = showPassword ? "text" : "password";

            icon.classList.toggle("bi-eye", showPassword);
            icon.classList.toggle("bi-eye-slash", !showPassword);
        });
    });
}


/* =========================================================
   12. FORM EVENTS
   ========================================================= */

function initializeForms() {
    loginForm?.addEventListener("submit", handleLogin);
    registerForm?.addEventListener("submit", handleRegister);
}


/* =========================================================
   13. REGISTER
   All public registrations receive role 0.
   No account-type selection or admin code is required.
   ========================================================= */

function handleRegister(event) {
    event.preventDefault();

    clearMessages();
    clearInputErrors();

    const name =
        document.getElementById("registerName")?.value.trim() || "";

    const username =
        document.getElementById("registerUsername")?.value.trim() || "";

    const email =
        document.getElementById("registerEmail")?.value.trim().toLowerCase() || "";

    const password =
        document.getElementById("registerPassword")?.value || "";

    const confirmPassword =
        document.getElementById("registerConfirmPassword")?.value || "";

    const terms =
        document.getElementById("terms");

    const termsAccepted = terms ? terms.checked : true;

    if (!name) {
        return registerError(
            "Please enter your full name.",
            "registerName"
        );
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return registerError(
            "Username must contain 3–20 letters, numbers or underscores.",
            "registerUsername"
        );
    }

    if (!isValidEmail(email)) {
        return registerError(
            "Please enter a valid email address.",
            "registerEmail"
        );
    }

    if (password.length < 8) {
        return registerError(
            "Password must contain at least 8 characters.",
            "registerPassword"
        );
    }

    if (password !== confirmPassword) {
        return registerError(
            "Passwords do not match.",
            "registerConfirmPassword"
        );
    }

    if (!termsAccepted) {
        showRegisterError(
            "Please agree to the Terms & Conditions."
        );
        return;
    }

    const users = getUsers();

    const usernameExists = users.some(function (user) {
        return String(user.username || "").toLowerCase() ===
            username.toLowerCase();
    });

    if (usernameExists) {
        return registerError(
            "This username is already registered.",
            "registerUsername"
        );
    }

    const emailExists = users.some(function (user) {
        return String(user.email || "").toLowerCase() === email;
    });

    if (emailExists) {
        return registerError(
            "This email is already registered.",
            "registerEmail"
        );
    }

    // IMPORTANT: Public registrations always receive role 0.
    const newUser = {
        id: generateUserId(),
        name: name,
        username: username,
        email: email,
        password: password,
        role: 0,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUsers(users);
    createUserData(newUser);

    showRegisterSuccess(
        "Your account has been created successfully. You can now sign in."
    );

    registerForm.reset();

    setTimeout(function () {
        showLogin();

        const loginUsername =
            document.getElementById("loginUsername");

        const loginPassword =
            document.getElementById("loginPassword");

        if (loginUsername) {
            loginUsername.value = username;
        }

        loginPassword?.focus();
    }, 1000);
}


/* =========================================================
   14. LOGIN
   Login using username or email.
   ========================================================= */

function handleLogin(event) {
    event.preventDefault();

    clearMessages();
    clearInputErrors();

    const loginValue =
        document.getElementById("loginUsername")?.value.trim().toLowerCase() || "";

    const password =
        document.getElementById("loginPassword")?.value || "";

    if (!loginValue) {
        return loginError(
            "Please enter your username or email.",
            "loginUsername"
        );
    }

    if (!password) {
        return loginError(
            "Please enter your password.",
            "loginPassword"
        );
    }

    const users = getUsers();

    const user = users.find(function (account) {
        const username =
            String(account.username || "").toLowerCase();

        const email =
            String(account.email || "").toLowerCase();

        return username === loginValue || email === loginValue;
    });

    if (!user) {
        return loginError(
            "Account not found. Please check your details or register first.",
            "loginUsername"
        );
    }

    if (user.password !== password) {
        return loginError(
            "Incorrect password.",
            "loginPassword"
        );
    }

    // Normalize legacy roles and store numeric roles.
    user.role = normalizeRole(user.role ?? user.accountType);
    saveUsers(users);

    const currentUser = {
        id: getUserId(user),
        name: user.name || user.username,
        username: user.username || "",
        email: user.email || "",
        role: user.role,
        accountType: getRoleLabel(user.role),
        loginAt: new Date().toISOString()
    };

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(currentUser)
    );

    localStorage.setItem(
        "respairLoggedIn",
        "true"
    );

    localStorage.setItem(
        "loginTime",
        currentUser.loginAt
    );

    if (user.role === 1 || user.role === 3) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    } else {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }

    createUserData(user);

    showLoginSuccess(
        "Welcome back, " + currentUser.name + "! " +
        getRoleName(currentUser.role)
    );

    const redirect = getRedirectPage();

    setTimeout(function () {
        window.location.href = redirect;
    }, 700);
}


/* =========================================================
   15. REDIRECT
   ========================================================= */

function getRedirectPage() {
    const params = new URLSearchParams(window.location.search);
    const requestedPage = params.get("redirect");

    if (
        requestedPage &&
        !requestedPage.includes("login.html") &&
        !requestedPage.includes("auth.html") &&
        !requestedPage.includes("signup.html") &&
        !requestedPage.startsWith("//") &&
        !requestedPage.includes("://")
    ) {
        return requestedPage;
    }

    return "index.html";
}


/* =========================================================
   16. VALIDATION HELPERS
   ========================================================= */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function registerError(message, inputId) {
    showRegisterError(message);
    markError(inputId);
}


function loginError(message, inputId) {
    showLoginError(message);
    markError(inputId);
}


function markError(id) {
    const element = document.getElementById(id);

    if (element) {
        element.classList.add("input-error");
        element.focus();
    }
}


function clearInputErrors() {
    document.querySelectorAll(".input-error").forEach(function (element) {
        element.classList.remove("input-error");
    });
}


/* =========================================================
   17. STATUS MESSAGES
   ========================================================= */

function showLoginError(message) {
    if (!loginMessage) return;

    loginMessage.className = "auth-message error";
    loginMessage.textContent = message;
}


function showLoginSuccess(message) {
    if (!loginMessage) return;

    loginMessage.className = "auth-message success";
    loginMessage.textContent = message;
}


function showRegisterError(message) {
    if (!registerMessage) return;

    registerMessage.className = "auth-message error";
    registerMessage.textContent = message;
}


function showRegisterSuccess(message) {
    if (!registerMessage) return;

    registerMessage.className = "auth-message success";
    registerMessage.textContent = message;
}


function clearMessages() {
    if (loginMessage) {
        loginMessage.className = "auth-message";
        loginMessage.textContent = "";
    }

    if (registerMessage) {
        registerMessage.className = "auth-message";
        registerMessage.textContent = "";
    }
}


/* =========================================================
   18. LOGOUT
   ========================================================= */

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem("respairLoggedIn");
    localStorage.removeItem("loginTime");

    sessionStorage.removeItem(ADMIN_SESSION_KEY);

    window.location.href = "index.html";
}
