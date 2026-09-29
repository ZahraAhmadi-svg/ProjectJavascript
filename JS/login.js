/* =========================================================
   RESPAIR DAWN
   LOGIN JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   GET ELEMENTS
--------------------------------------------------------- */

const loginForm =
    document.getElementById("loginform");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const passwordIcon =
    document.querySelector(".password-icon");


/* ---------------------------------------------------------
   CHECK ELEMENTS
--------------------------------------------------------- */

console.log("Login form:", loginForm);
console.log("Username:", usernameInput);
console.log("Password:", passwordInput);
console.log("Password icon:", passwordIcon);


/* ---------------------------------------------------------
   PASSWORD SHOW / HIDE
--------------------------------------------------------- */

if (passwordIcon) {

    passwordIcon.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordIcon.classList.remove(
                    "bi-eye-slash"
                );

                passwordIcon.classList.add(
                    "bi-eye"
                );

            } else {

                passwordInput.type = "password";

                passwordIcon.classList.remove(
                    "bi-eye"
                );

                passwordIcon.classList.add(
                    "bi-eye-slash"
                );

            }

        }
    );

}


/* ---------------------------------------------------------
   LOGIN
--------------------------------------------------------- */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            console.log("Login form submitted");


            /* ---------------------------------------------
               GET INPUT VALUES
            --------------------------------------------- */

            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            /* ---------------------------------------------
            ADMIN LOGIN
            --------------------------------------------- */

            const ADMIN_USERNAME = "Zahra-Ahmadi";
            const ADMIN_PASSWORD = "Ahmadi@2026";

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                const adminUser = {
                    username: ADMIN_USERNAME,
                    fullName: "Respair Dawn Admin",
                    role: "admin"
                };

                /* Save current admin */
                localStorage.setItem(
                    "respairUser",
                    JSON.stringify(adminUser)
                );

                /* Save admin status */
                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "isAdmin",
                    "true"
                );

                alert("Welcome Admin!");
                window.location.href = "index.html";

                return;
            }


            console.log(
                "Username entered:",
                username
            );

            console.log(
                "Password entered:",
                password
            );


            /* ---------------------------------------------
               GET REGISTERED USERS
            --------------------------------------------- */

            const savedUsers =
                localStorage.getItem("respairUsers");


            console.log(
                "Saved users:",
                savedUsers
            );


            /* ---------------------------------------------
               NO USERS
            --------------------------------------------- */

            if (!savedUsers) {

                alert(
                    "No registered users found. Please register first."
                );

                return;

            }


            /* ---------------------------------------------
               CONVERT JSON TO ARRAY
            --------------------------------------------- */

            let users = [];

            try {

                users =
                    JSON.parse(savedUsers);

            } catch (error) {

                console.error(
                    "Error reading users:",
                    error
                );

                alert(
                    "There is a problem with registered user data."
                );

                return;

            }


            console.log(
                "Users:",
                users
            );


            /* ---------------------------------------------
               FIND USER
            --------------------------------------------- */

            const user =
                users.find(
                    function (user) {

                        return (
                            user.username === username &&
                            user.password === password
                        );

                    }
                );


            console.log(
                "Found user:",
                user
            );


            /* ---------------------------------------------
               USER NOT FOUND
            --------------------------------------------- */

            if (!user) {

                alert(
                    "Username or password is incorrect."
                );

                return;

            }


            /* ---------------------------------------------
               SAVE CURRENT USER
            --------------------------------------------- */

            localStorage.setItem(
                "respairUser",
                JSON.stringify(user)
            );
            

            localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

            localStorage.setItem(
                "isAdmin",
                "false"
            );

            console.log(
                "Current user saved:",
                user
            );


            /* ---------------------------------------------
               WELCOME MESSAGE
            --------------------------------------------- */

            alert(
                "Welcome " +
                (
                    user.fullName ||
                    user.username
                ) +
                "!"
            );


            /* ---------------------------------------------
               REDIRECT
            --------------------------------------------- */

            const params =
                new URLSearchParams(
                    window.location.search
                );


            const redirect =
                params.get("redirect");


            if (redirect) {

                window.location.href =
                    redirect;

            } else {

                window.location.href =
                    "index.html";

            }

        }
    );

} else {

    console.error(
        "Login form was not found!"
    );

}

