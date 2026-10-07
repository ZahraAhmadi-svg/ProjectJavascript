
/* =========================================================
   RESPAIR DAWN
   PROFILE PAGE
   Connected with AUTH system
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. GET LOGGED-IN USER
       ===================================================== */

    const user = getCurrentUser();

    /*
       getCurrentUser()
       از auth-core.js می‌آید.

       اطلاعات کاربر:

       {
           id,
           name,
           username,
           email,
           role,
           loginAt
       }
    */

    if (!user) {

        console.warn(
            "No logged-in user found."
        );

        return;
    }


    /* =====================================================
       2. GET USER DATA
       ===================================================== */

    const userData =
        getCurrentUserData() || {
            classes: [],
            favorites: [],
            saved: []
        };


    /* =====================================================
       3. USER INFORMATION
       ===================================================== */

    let name =
        user.name ||
        user.username ||
        "User";

    const username =
        user.username ||
        "username";

    let email =
        user.email ||
        "-";

    const role =
        user.role ||
        "user";


    /* =====================================================
       4. ELEMENTS - PROFILE PAGE
       ===================================================== */

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileUsername =
        document.getElementById(
            "profileUsername"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profileRole =
        document.getElementById(
            "profileRole"
        );


    /* =====================================================
       5. DISPLAY USER INFORMATION
       ===================================================== */

    if (welcomeName) {

        welcomeName.textContent =
            name;
    }

    if (profileName) {

        profileName.textContent =
            name;
    }

    if (profileUsername) {

        profileUsername.textContent =
            "@" + username;
    }

    if (profileEmail) {

        profileEmail.textContent =
            email;
    }

    if (profileRole) {

        profileRole.textContent =
            role === "admin"
                ? "Administrator"
                : "Student";
    }


    /* =====================================================
       6. PROFILE AVATAR
       ===================================================== */

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    /*
       Example:

       Zahra Ahmadi
       ↓
       Z
    */

    function getFirstLetter(userName) {

        return (
            userName
                .trim()
                .charAt(0)
                .toUpperCase() || "U"
        );
    }


    let firstLetter =
        getFirstLetter(name);


    if (profileAvatar) {

        profileAvatar.textContent =
            firstLetter;
    }


    /* =====================================================
       7. NEW NAVBAR USER MENU
       ===================================================== */

    const userMenuItem =
        document.getElementById(
            "userMenuItem"
        );

    const userMenuButton =
        document.getElementById(
            "userMenuButton"
        );

    const userMenu =
        document.getElementById(
            "userMenu"
        );

    const userAvatar =
        document.getElementById(
            "userAvatar"
        );

    const menuUserName =
        document.getElementById(
            "menuUserName"
        );

    const menuUserStatus =
        document.getElementById(
            "menuUserStatus"
        );

    const managementMenuItem =
        document.getElementById(
            "managementMenuItem"
        );

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    /* =====================================================
       8. SHOW USER IN NAVBAR
       ===================================================== */

    if (userMenuItem) {

        userMenuItem.style.display =
            "block";
    }


    if (userAvatar) {

        userAvatar.textContent =
            firstLetter;
    }


    if (menuUserName) {

        menuUserName.textContent =
            name;
    }


    if (menuUserStatus) {

        menuUserStatus.textContent =
            role === "admin"
                ? "Administrator"
                : "Welcome to Respair Dawn";
    }


    /* =====================================================
       9. ADMIN MANAGEMENT PANEL
       ===================================================== */

    if (managementMenuItem) {

        if (role === "admin") {

            managementMenuItem.style.display =
                "flex";

        } else {

            managementMenuItem.style.display =
                "none";
        }
    }


    /* =====================================================
       10. USER MENU TOGGLE
       ===================================================== */

    if (
        userMenuButton &&
        userMenu
    ) {

        userMenuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                userMenu.classList.toggle(
                    "show"
                );
            }
        );
    }


    /* =====================================================
       11. CLOSE USER MENU
       WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                userMenu &&
                userMenuButton &&
                !userMenu.contains(event.target) &&
                !userMenuButton.contains(event.target)
            ) {

                userMenu.classList.remove(
                    "show"
                );
            }
        }
    );


    /* =====================================================
       12. CLOSE MENU WHEN CLICKING LINK
       ===================================================== */

    if (userMenu) {

        const menuLinks =
            userMenu.querySelectorAll(
                "a"
            );

        menuLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        userMenu.classList.remove(
                            "show"
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       13. LOGOUT
       ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                /*
                   Remove current user
                */

                localStorage.removeItem(
                    "respairUser"
                );


                /*
                   Remove old login flag
                */

                localStorage.removeItem(
                    "respairLoggedIn"
                );


                /*
                   Remove admin session
                */

                sessionStorage.removeItem(
                    "respairAdminAuthenticated"
                );


                /*
                   Redirect to authentication page
                */

                window.location.replace(
                    "auth.html"
                );
            }
        );
    }


    /* =====================================================
       14. DATE
       ===================================================== */

    const profileDate =
        document.getElementById(
            "profileDate"
        );


    if (profileDate) {

        /*
           auth.js هنگام Registration:

           createdAt

           و هنگام Login:

           loginAt
        */

        const dateValue =
            user.createdAt ||
            user.loginAt;


        if (dateValue) {

            const date =
                new Date(
                    dateValue
                );


            if (
                !isNaN(
                    date.getTime()
                )
            ) {

                profileDate.textContent =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            year: "numeric"
                        }
                    );

            } else {

                profileDate.textContent =
                    "Recently";
            }

        } else {

            profileDate.textContent =
                "Recently";
        }
    }


    /* =====================================================
       15. STATISTICS
       ===================================================== */

    const classes =
        Array.isArray(
            userData.classes
        )
            ? userData.classes.length
            : 0;


    const favorites =
        Array.isArray(
            userData.favorites
        )
            ? userData.favorites.length
            : 0;


    const saved =
        Array.isArray(
            userData.saved
        )
            ? userData.saved.length
            : 0;


    const classesCount =
        document.getElementById(
            "classesCount"
        );

    const favoritesCount =
        document.getElementById(
            "favoritesCount"
        );

    const savedCount =
        document.getElementById(
            "savedCount"
        );


    if (classesCount) {

        classesCount.textContent =
            classes;
    }


    if (favoritesCount) {

        favoritesCount.textContent =
            favorites;
    }


    if (savedCount) {

        savedCount.textContent =
            saved;
    }


    /* =====================================================
       16. EDIT PROFILE
       ===================================================== */

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );

    const form =
        document.getElementById(
            "profileForm"
        );

    const editName =
        document.getElementById(
            "editName"
        );

    const editEmail =
        document.getElementById(
            "editEmail"
        );


    /* =====================================================
       17. OPEN EDIT PROFILE MODAL
       ===================================================== */

    if (
        editButton &&
        form
    ) {

        editButton.addEventListener(
            "click",
            function () {


                /* -----------------------------------------
                   CURRENT NAME
                   ----------------------------------------- */

                if (editName) {

                    editName.value =
                        name;
                }


                /* -----------------------------------------
                   CURRENT EMAIL
                   ----------------------------------------- */

                if (editEmail) {

                    editEmail.value =
                        email;
                }


                /* -----------------------------------------
                   MODAL
                   ----------------------------------------- */

                const modalElement =
                    document.getElementById(
                        "profileModal"
                    );


                if (
                    modalElement &&
                    typeof bootstrap !==
                        "undefined"
                ) {

                    const modal =
                        bootstrap.Modal
                            .getOrCreateInstance(
                                modalElement
                            );

                    modal.show();
                }

            }
        );


        /* =================================================
           18. SAVE PROFILE
           ================================================= */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET NEW VALUES
                   ----------------------------------------- */

                const newName =
                    editName
                        ? editName.value.trim()
                        : "";


                const newEmail =
                    editEmail
                        ? editEmail.value.trim()
                        : "";


                /* -----------------------------------------
                   VALIDATE NAME
                   ----------------------------------------- */

                if (!newName) {

                    if (editName) {

                        editName.focus();
                    }

                    return;
                }


                /* -----------------------------------------
                   VALIDATE EMAIL
                   ----------------------------------------- */

                if (!newEmail) {

                    if (editEmail) {

                        editEmail.focus();
                    }

                    return;
                }


                /* -----------------------------------------
                   UPDATE LOCAL VARIABLES
                   ----------------------------------------- */

                name =
                    newName;

                email =
                    newEmail;


                firstLetter =
                    getFirstLetter(
                        name
                    );


                /* -----------------------------------------
                   UPDATE CURRENT SESSION
                   ----------------------------------------- */

                const updatedUser = {

                    ...user,

                    name:
                        newName,

                    email:
                        newEmail
                };


                localStorage.setItem(
                    "respairUser",

                    JSON.stringify(
                        updatedUser
                    )
                );


                /* -----------------------------------------
                   UPDATE REGISTERED ACCOUNT
                   ----------------------------------------- */

                const usersRaw =
                    localStorage.getItem(
                        "respairUsers"
                    );


                if (usersRaw) {

                    try {

                        const users =
                            JSON.parse(
                                usersRaw
                            );


                        const index =
                            users.findIndex(
                                function (item) {

                                    return (
                                        item.id ===
                                        user.id
                                    );
                                }
                            );


                        if (index !== -1) {

                            users[index].name =
                                newName;

                            users[index].email =
                                newEmail;


                            localStorage.setItem(
                                "respairUsers",

                                JSON.stringify(
                                    users
                                )
                            );
                        }

                    } catch (error) {

                        console.error(
                            "Failed to update registered user:",
                            error
                        );
                    }
                }


                /* -----------------------------------------
                   UPDATE PROFILE PAGE
                   ----------------------------------------- */

                if (welcomeName) {

                    welcomeName.textContent =
                        newName;
                }


                if (profileName) {

                    profileName.textContent =
                        newName;
                }


                if (profileEmail) {

                    profileEmail.textContent =
                        newEmail;
                }


                /* -----------------------------------------
                   UPDATE PROFILE AVATAR
                   ----------------------------------------- */

                if (profileAvatar) {

                    profileAvatar.textContent =
                        firstLetter;
                }


                /* -----------------------------------------
                   UPDATE NAVBAR
                   ----------------------------------------- */

                if (userAvatar) {

                    userAvatar.textContent =
                        firstLetter;
                }


                if (menuUserName) {

                    menuUserName.textContent =
                        newName;
                }


                /*
                   Close modal after saving
                */

                const modalElement =
                    document.getElementById(
                        "profileModal"
                    );


                if (
                    modalElement &&
                    typeof bootstrap !==
                        "undefined"
                ) {

                    const modal =
                        bootstrap.Modal
                            .getOrCreateInstance(
                                modalElement
                            );

                    modal.hide();
                }

            }
        );
    }


    /* =====================================================
       19. DEBUG
       ===================================================== */

    console.log(
        "======================================"
    );

    console.log(
        "RESPAIR DAWN - PROFILE"
    );

    console.log(
        "Logged-in user:",
        user
    );

    console.log(
        "User data:",
        userData
    );

    console.log(
        "Navbar user:",
        name
    );

    console.log(
        "User role:",
        role
    );

    console.log(
        "======================================"
    );

});

