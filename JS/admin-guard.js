/* =========================================================
   RESPAIR DAWN
   ADMIN GUARD
   ========================================================= */


/* =========================================================
   STORAGE KEY
   ========================================================= */

const USER_STORAGE_KEY = "respairUser";


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getAdminGuardUser() {

    const savedUser =
        localStorage.getItem(USER_STORAGE_KEY);

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Invalid user session:",
            error
        );

        localStorage.removeItem(
            USER_STORAGE_KEY
        );

        return null;
    }
}


/* =========================================================
   ADMIN ACCESS CHECK
   ========================================================= */

(function checkAdminAccess() {

    const user =
        getAdminGuardUser();


    /* -----------------------------------------------------
       USER IS NOT LOGGED IN
    ----------------------------------------------------- */

    if (!user) {

        window.location.replace(
            "auth.html?redirect=management.html"
        );

        return;
    }


    /* -----------------------------------------------------
       USER IS LOGGED IN
       BUT IS NOT ADMIN
    ----------------------------------------------------- */

    if (user.role !== "admin") {

        window.location.replace(
            "index.html"
        );

        return;
    }


    /* -----------------------------------------------------
       ADMIN ACCESS GRANTED
    ----------------------------------------------------- */

    console.log(
        "Admin access granted:",
        user.username
    );

})();