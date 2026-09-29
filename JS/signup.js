/* =========================================================
   RESPAIR DAWN
   SIGN UP JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   GET ELEMENTS
--------------------------------------------------------- */

const signupForm =
    document.getElementById("signupForm");

const fullNameInput =
    document.getElementById("fullName");

const usernameInput =
    document.getElementById("username");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const passwordIcon =
    document.getElementById("passwordIcon");

const confirmPasswordIcon =
    document.getElementById("confirmPasswordIcon");

const message =
    document.getElementById("signupMessage");


/* ---------------------------------------------------------
   GET USERS
--------------------------------------------------------- */

function getUsers() {

    const savedUsers =
        localStorage.getItem("respairUsers");

    if (!savedUsers) {

        return [];

    }

    try {

        return JSON.parse(savedUsers);

    } catch (error) {

        console.error(
            "Could not read users:",
            error
        );

        return [];

    }

}


/* ---------------------------------------------------------
   SAVE USERS
--------------------------------------------------------- */

function saveUsers(users) {

    localStorage.setItem(
        "respairUsers",
        JSON.stringify(users)
    );

}


/* ---------------------------------------------------------
   SHOW MESSAGE
--------------------------------------------------------- */

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "signup-message " + type;

}


/* ---------------------------------------------------------
   PASSWORD VISIBILITY
--------------------------------------------------------- */

function togglePassword(
    input,
    icon
) {

    icon.addEventListener(
        "click",
        function () {

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove(
                    "bi-eye-slash"
                );

                icon.classList.add(
                    "bi-eye"
                );

            } else {

                input.type = "password";

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


togglePassword(
    passwordInput,
    passwordIcon
);


togglePassword(
    confirmPasswordInput,
    confirmPasswordIcon
);


/* ---------------------------------------------------------
   REGISTER
--------------------------------------------------------- */

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Get values */

        const fullName =
            fullNameInput.value.trim();

        const username =
            usernameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        /* ---------------------------------------------
           CHECK PASSWORD
        --------------------------------------------- */

        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           CHECK PASSWORD MATCH
        --------------------------------------------- */

        if (
            password !==
            confirmPassword
        ) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           GET EXISTING USERS
        --------------------------------------------- */

        const users =
            getUsers();


        /* ---------------------------------------------
           CHECK USERNAME
        --------------------------------------------- */

        const usernameExists =
            users.some(
                function (user) {

                    return (
                        user.username.toLowerCase() ===
                        username.toLowerCase()
                    );

                }
            );


        if (usernameExists) {

            showMessage(
                "This username is already registered.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           CHECK EMAIL
        --------------------------------------------- */

        const emailExists =
            users.some(
                function (user) {

                    return (
                        user.email.toLowerCase() ===
                        email.toLowerCase()
                    );

                }
            );


        if (emailExists) {

            showMessage(
                "This email is already registered.",
                "error"
            );

            return;

        }


        /* ---------------------------------------------
           CREATE USER
        --------------------------------------------- */

        const newUser = {

            id:
                Date.now(),

            fullName:
                fullName,

            username:
                username,

            email:
                email,

            password:
                password,

            role:
                "user",

            createdAt:
                new Date().toISOString()

        };


        /* ---------------------------------------------
           ADD USER
        --------------------------------------------- */

        users.push(newUser);


        /* ---------------------------------------------
           SAVE USER
        --------------------------------------------- */

        saveUsers(users);


        console.log(
            "New user registered:",
            newUser
        );


        /* ---------------------------------------------
           SUCCESS MESSAGE
        --------------------------------------------- */

        showMessage(
            "Registration successful! Redirecting to login...",
            "success"
        );


        /* ---------------------------------------------
           GO TO LOGIN
        --------------------------------------------- */

        setTimeout(
            function () {

                window.location.href =
                    "login.html";

            },
            1200
        );

    }
);

