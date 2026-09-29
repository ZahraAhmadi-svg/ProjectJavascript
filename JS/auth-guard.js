/* =========================================================
   RESPAIR DAWN
   AUTHENTICATION GUARD
   ========================================================= */

const USER_STORAGE_KEY =
    "respairUser";


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    const savedUser =
        localStorage.getItem(
            USER_STORAGE_KEY
        );


    if (!savedUser) {

        return null;

    }


    try {

        return JSON.parse(
            savedUser
        );

    } catch (error) {

        localStorage.removeItem(
            USER_STORAGE_KEY
        );

        return null;

    }

}


/* =========================================================
   REQUIRE LOGIN
   ========================================================= */

function requireLogin() {

    const user =
        getCurrentUser();


    if (!user) {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop();


        window.location.href =
            "login.html?redirect=" +
            encodeURIComponent(
                currentPage
            );

        return false;

    }


    return true;

}


/* =========================================================
   REQUIRE ADMIN
   ========================================================= */

function requireAdmin() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html";

        return false;

    }


    if (
        user.role !== "admin" &&
        user.role !== "manager"
    ) {

        window.location.href =
            "index.html";

        return false;

    }


    return true;

}


/* =========================================================
   RUN
   ========================================================= */

requireLogin();