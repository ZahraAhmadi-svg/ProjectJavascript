/* =========================================================
   RESPAIR DAWN
   ADMIN GUARD
   ========================================================= */

const USER_STORAGE_KEY =
    "respairUser";


const savedUser =
    localStorage.getItem(
        USER_STORAGE_KEY
    );


if (!savedUser) {

    window.location.href =
        "login.html";

} else {

    try {

        const user =
            JSON.parse(savedUser);


        if (
            user.role !== "admin" &&
            user.role !== "manager"
        ) {

            window.location.href =
                "index.html";

        }

    } catch (error) {

        localStorage.removeItem(
            USER_STORAGE_KEY
        );

        window.location.href =
            "login.html";

    }

}