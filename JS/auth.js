/* =========================================================
   RESPAIR DAWN
   AUTHENTICATION SYSTEM
   LOGIN + REGISTER
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const USERS_KEY = "respairUsers";

const CURRENT_USER_KEY = "respairUser";

const USER_DATA_KEY = "respairUserData";


/* =========================================================
   ADMIN VERIFICATION CODE
   =========================================================
   
   IMPORTANT:
   Because there is no backend, this is client-side
   protection only. It is NOT real server authentication.
   ========================================================= */

const ADMIN_VERIFICATION_CODE = "RD-ADMIN-2026";


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginTab =
    document.getElementById("loginTab");

const registerTab =
    document.getElementById("registerTab");

const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");

const switchText =
    document.getElementById("switchText");

const switchButton =
    document.getElementById("switchButton");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const loginMessage =
    document.getElementById("loginMessage");

const registerMessage =
    document.getElementById("registerMessage");

const adminVerification =
    document.getElementById("adminVerification");

const adminCode =
    document.getElementById("adminCode");


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeUsers();

        migrateOldUser();

        initializeTabs();

        initializeAccountTypes();

        initializePasswordButtons();

        initializeForms();

        checkRedirect();

    }
);


/* =========================================================
   INITIALIZE USERS
   ========================================================= */

function initializeUsers() {

    const users =
        localStorage.getItem(USERS_KEY);


    if (!users) {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify([])
        );

    }

}


/* =========================================================
   MIGRATE OLD USER
   =========================================================
   
   This helps preserve an old account if it already exists
   in respairUser.
   ========================================================= */

function migrateOldUser() {

    const oldUser =
        localStorage.getItem(
            CURRENT_USER_KEY
        );


    if (!oldUser) {

        return;

    }


    try {

        const parsedUser =
            JSON.parse(oldUser);


        if (
            !parsedUser.username ||
            !parsedUser.password
        ) {

            return;

        }


        const users =
            getUsers();


        const alreadyExists =
            users.some(
                function (user) {

                    return (
                        user.username &&
                        user.username.toLowerCase() ===
                        parsedUser.username.toLowerCase()
                    );

                }
            );


        if (!alreadyExists) {

            users.push({

                id:
                    parsedUser.id ||
                    generateUserId(
                        parsedUser.role === "admin"
                            ? "admin"
                            : "user"
                    ),

                name:
                    parsedUser.name ||
                    parsedUser.fullName ||
                    parsedUser.username,

                username:
                    parsedUser.username,

                email:
                    parsedUser.email ||
                    "",

                password:
                    parsedUser.password,

                role:
                    parsedUser.role === "admin"
                        ? "admin"
                        : "user",

                createdAt:
                    parsedUser.createdAt ||
                    new Date().toISOString()

            });


            saveUsers(users);

        }

    } catch (error) {

        console.error(
            "Old user migration failed:",
            error
        );

    }

}


/* =========================================================
   TABS
   ========================================================= */

function initializeTabs() {

    loginTab.addEventListener(
        "click",
        showLogin
    );


    registerTab.addEventListener(
        "click",
        showRegister
    );


    switchButton.addEventListener(
        "click",
        function () {

            if (
                loginSection.classList.contains(
                    "d-none"
                )
            ) {

                showLogin();

            } else {

                showRegister();

            }

        }
    );

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLogin() {

    loginSection.classList.remove(
        "d-none"
    );

    registerSection.classList.add(
        "d-none"
    );


    loginTab.classList.add(
        "active"
    );

    registerTab.classList.remove(
        "active"
    );


    switchText.textContent =
        "Not a member?";


    switchButton.textContent =
        "Register now";


    clearMessages();

}


/* =========================================================
   SHOW REGISTER
   ========================================================= */

function showRegister() {

    loginSection.classList.add(
        "d-none"
    );

    registerSection.classList.remove(
        "d-none"
    );


    loginTab.classList.remove(
        "active"
    );

    registerTab.classList.add(
        "active"
    );


    switchText.textContent =
        "Already a member?";


    switchButton.textContent =
        "Sign in";


    clearMessages();

}


/* =========================================================
   ACCOUNT TYPE
   ========================================================= */

function initializeAccountTypes() {

    const accountTypes =
        document.querySelectorAll(
            'input[name="accountType"]'
        );


    accountTypes.forEach(
        function (input) {

            input.addEventListener(
                "change",
                updateAdminField
            );

        }
    );


    updateAdminField();

}


/* =========================================================
   ADMIN FIELD
   ========================================================= */

function updateAdminField() {

    const selected =
        document.querySelector(
            'input[name="accountType"]:checked'
        );


    if (!selected) {

        return;

    }


    if (selected.value === "admin") {

        adminVerification.classList.remove(
            "d-none"
        );

        adminCode.required = true;

    } else {

        adminVerification.classList.add(
            "d-none"
        );

        adminCode.required = false;

        adminCode.value = "";

    }

}


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function initializePasswordButtons() {

    const buttons =
        document.querySelectorAll(
            ".password-toggle"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const target =
                        document.getElementById(
                            button.dataset.target
                        );


                    const icon =
                        button.querySelector("i");


                    if (
                        target.type === "password"
                    ) {

                        target.type = "text";


                        icon.classList.remove(
                            "bi-eye-slash"
                        );

                        icon.classList.add(
                            "bi-eye"
                        );

                    } else {

                        target.type = "password";


                        icon.classList.remove(
                            "bi-eye"
                        );

                        icon.classList.add(
                            "bi-eye-slash"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   FORMS
   ========================================================= */

function initializeForms() {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );


    registerForm.addEventListener(
        "submit",
        handleRegister
    );

}


/* =========================================================
   REGISTER
   ========================================================= */

function handleRegister(event) {

    event.preventDefault();


    clearMessages();

    clearInputErrors();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const username =
        document
            .getElementById("registerUsername")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById(
                "registerConfirmPassword"
            )
            .value;


    const accountType =
        document.querySelector(
            'input[name="accountType"]:checked'
        ).value;


    const terms =
        document.getElementById(
            "terms"
        ).checked;


    /* -----------------------------------------------------
       NAME
       ----------------------------------------------------- */

    if (!name) {

        showRegisterError(
            "Please enter your full name."
        );

        markError("registerName");

        return;

    }


    /* -----------------------------------------------------
       USERNAME
       ----------------------------------------------------- */

    if (!username) {

        showRegisterError(
            "Please enter a username."
        );

        markError("registerUsername");

        return;

    }


    if (
        !/^[a-zA-Z0-9_]{3,20}$/.test(
            username
        )
    ) {

        showRegisterError(
            "Username must contain 3–20 letters, numbers or underscores."
        );

        markError("registerUsername");

        return;

    }


    /* -----------------------------------------------------
       EMAIL
       ----------------------------------------------------- */

    if (
        !isValidEmail(email)
    ) {

        showRegisterError(
            "Please enter a valid email."
        );

        markError("registerEmail");

        return;

    }


    /* -----------------------------------------------------
       PASSWORD
       ----------------------------------------------------- */

    if (password.length < 8) {

        showRegisterError(
            "Password must contain at least 8 characters."
        );

        markError("registerPassword");

        return;

    }


    if (
        password !== confirmPassword
    ) {

        showRegisterError(
            "Passwords do not match."
        );

        markError(
            "registerConfirmPassword"
        );

        return;

    }


    /* -----------------------------------------------------
       TERMS
       ----------------------------------------------------- */

    if (!terms) {

        showRegisterError(
            "Please agree to the Terms & Conditions."
        );

        return;

    }


    /* -----------------------------------------------------
       USERS
       ----------------------------------------------------- */

    const users =
        getUsers();


    /* -----------------------------------------------------
       USERNAME CHECK
       ----------------------------------------------------- */

    const usernameExists =
        users.some(
            function (user) {

                return (
                    String(
                        user.username || ""
                    )
                    .trim()
                    .toLowerCase()
                    ===
                    username
                        .trim()
                        .toLowerCase()
                );

            }
        );


    if (usernameExists) {

        showRegisterError(
            "This username is already registered."
        );

        markError(
            "registerUsername"
        );

        return;

    }


    /* -----------------------------------------------------
       EMAIL CHECK
       ----------------------------------------------------- */

    const emailExists =
        users.some(
            function (user) {

                return (
                    String(
                        user.email || ""
                    )
                    .trim()
                    .toLowerCase()
                    ===
                    email
                        .trim()
                        .toLowerCase()
                );

            }
        );


    if (emailExists) {

        showRegisterError(
            "This email is already registered."
        );

        markError(
            "registerEmail"
        );

        return;

    }


    /* -----------------------------------------------------
       ADMIN VERIFICATION
       ----------------------------------------------------- */

    if (
        accountType === "admin"
    ) {

        const enteredCode =
            adminCode.value.trim();


        if (!enteredCode) {

            showRegisterError(
                "Admin verification code is required."
            );

            markError(
                "adminCode"
            );

            return;

        }


        if (
            enteredCode !==
            ADMIN_VERIFICATION_CODE
        ) {

            showRegisterError(
                "The admin verification code is incorrect."
            );

            markError(
                "adminCode"
            );

            return;

        }

    }


    /* -----------------------------------------------------
       CREATE USER
       ----------------------------------------------------- */

    const newUser = {

        id:
            generateUserId(
                accountType
            ),

        name:
            name,

        username:
            username,

        email:
            email,

        password:
            password,

        role:
            accountType,

        createdAt:
            new Date().toISOString()

    };


    users.push(
        newUser
    );


    saveUsers(
        users
    );


    /* -----------------------------------------------------
       CREATE EMPTY USER DATA
       ----------------------------------------------------- */

    createUserData(
        newUser
    );


    /* -----------------------------------------------------
       SUCCESS
       ----------------------------------------------------- */

    showRegisterSuccess(
        accountType === "admin"
            ? "Admin account created successfully. You can now sign in."
            : "Account created successfully. You can now sign in."
    );


    registerForm.reset();


    document.querySelector(
        'input[name="accountType"][value="user"]'
    ).checked = true;


    updateAdminField();


    /* -----------------------------------------------------
       GO TO LOGIN
       ----------------------------------------------------- */

    setTimeout(
        function () {

            showLogin();


            document.getElementById(
                "loginUsername"
            ).value =
                username;


        },
        1000
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

function handleLogin(event) {

    event.preventDefault();


    clearMessages();

    clearInputErrors();


    const username =
        document
            .getElementById(
                "loginUsername"
            )
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    if (!username) {

        showLoginError(
            "Please enter your username."
        );

        markError(
            "loginUsername"
        );

        return;

    }


    if (!password) {

        showLoginError(
            "Please enter your password."
        );

        markError(
            "loginPassword"
        );

        return;

    }


    const users =
        getUsers();


    /* =====================================================
       FIND USERNAME
       ===================================================== */

    const user =
        users.find(
            function (account) {

                const savedUsername =
                    String(
                        account.username || ""
                    )
                    .trim()
                    .toLowerCase();


                return (
                    savedUsername ===
                    username
                );

            }
        );


    /* =====================================================
       USER NOT FOUND
       ===================================================== */

    if (!user) {

        showLoginError(
            "Username not found. Please check your username or register first."
        );

        markError(
            "loginUsername"
        );

        return;

    }


    /* =====================================================
       PASSWORD
       ===================================================== */

    if (
        user.password !==
        password
    ) {

        showLoginError(
            "Incorrect password."
        );

        markError(
            "loginPassword"
        );

        return;

    }


    /* =====================================================
       CURRENT USER
       ===================================================== */

    const currentUser = {

        id:
            user.id,

        name:
            user.name,

        username:
            user.username,

        email:
            user.email,

        role:
            user.role,

        loginAt:
            new Date().toISOString()

    };


    /* =====================================================
       IMPORTANT
       -----------------------------------------------------
       We use localStorage because your existing Respair
       Dawn files already use respairUser.
       ===================================================== */

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(
            currentUser
        )
    );


    /* =====================================================
       SAVE FULL USER DATA
       ===================================================== */

    localStorage.setItem(
        "respairLoggedIn",
        "true"
    );


    /* =====================================================
       ADMIN SESSION FLAG
       ===================================================== */

    if (
        user.role === "admin"
    ) {

        sessionStorage.setItem(
            "respairAdminAuthenticated",
            "true"
        );

    } else {

        sessionStorage.removeItem(
            "respairAdminAuthenticated"
        );

    }


    /* =====================================================
       SUCCESS
       ===================================================== */

    showLoginSuccess(
        user.role === "admin"
            ? "Admin authentication successful."
            : "Login successful. Welcome back!"
    );


    /* =====================================================
       REDIRECT
       ===================================================== */

    const redirect =
        getRedirectPage();


    setTimeout(
        function () {

            window.location.href =
                redirect;

        },
        700
    );

}


/* =========================================================
   GET USERS
   ========================================================= */

function getUsers() {

    try {

        const data =
            localStorage.getItem(
                USERS_KEY
            );


        if (!data) {

            return [];

        }


        const users =
            JSON.parse(data);


        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

        console.error(
            "Unable to read users:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE USERS
   ========================================================= */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/* =========================================================
   CREATE USER DATA
   ========================================================= */

function createUserData(user) {

    let allData = {};


    try {

        const existing =
            localStorage.getItem(
                USER_DATA_KEY
            );


        if (existing) {

            allData =
                JSON.parse(existing);

        }

    } catch (error) {

        allData = {};

    }


    const userId =
        getUserId(user);


    if (!allData[userId]) {

        allData[userId] = {

            classes: [],

            favorites: [],

            saved: []

        };

    }


    localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(
            allData
        )
    );

}


/* =========================================================
   USER ID
   ========================================================= */

function getUserId(user) {

    return (
        user.id ||
        user.email ||
        user.username ||
        "default-user"
    );

}


/* =========================================================
   GENERATE ID
   ========================================================= */

function generateUserId(role) {

    const prefix =
        role === "admin"
            ? "ADM"
            : "USR";


    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    return (
        prefix +
        "-" +
        random
    );

}


/* =========================================================
   EMAIL
   ========================================================= */

function isValidEmail(email) {
 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showLoginError(message) {

    loginMessage.className =
        "auth-message error";

    loginMessage.textContent =
        message;

}


function showLoginSuccess(message) {

    loginMessage.className =
        "auth-message success";

    loginMessage.textContent =
        message;

}


function showRegisterError(message) {

    registerMessage.className =
        "auth-message error";

    registerMessage.textContent =
        message;

}


function showRegisterSuccess(message) {

    registerMessage.className =
        "auth-message success";

    registerMessage.textContent =
        message;

}


/* =========================================================
   CLEAR MESSAGES
   ========================================================= */

function clearMessages() {

    loginMessage.className =
        "auth-message";

    loginMessage.textContent =
        "";


    registerMessage.className =
        "auth-message";

    registerMessage.textContent =
        "";

}


/* =========================================================
   INPUT ERROR
   ========================================================= */

function markError(id) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.classList.add(
            "input-error"
        );

    }

}


function clearInputErrors() {

    document
        .querySelectorAll(
            ".input-error"
        )
        .forEach(
            function (element) {

                element.classList.remove(
                    "input-error"
                );

            }
        );

}


/* =========================================================
   REDIRECT
   ========================================================= */

function getRedirectPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const redirect =
        params.get(
            "redirect"
        );


    if (
        redirect &&
        !redirect.includes("auth.html") &&
        !redirect.includes("login.html") &&
        !redirect.includes("signup.html")
    ) {

        return redirect;

    }


    return "index.html";

}