/* =========================================================
   RESPAIR DAWN
   MANAGEMENT PANEL
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const MANAGEMENT_USER_KEY = "respairUser";

const MANAGEMENT_USERS_KEY = "respairUsers";

const MANAGEMENT_STORIES_KEY =
    "respairAdminStories";

const MANAGEMENT_USER_DATA_KEY =
    "respairUserData";


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getManagementAdmin() {

    const savedUser =
        localStorage.getItem(
            MANAGEMENT_USER_KEY
        );

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

        return null;
    }
}


/* =========================================================
   GET ALL USERS
   ========================================================= */

function getManagementUsers() {

    const savedUsers =
        localStorage.getItem(
            MANAGEMENT_USERS_KEY
        );

    if (!savedUsers) {

        return [];
    }

    try {

        const users =
            JSON.parse(savedUsers);

        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

        console.error(
            "Invalid users data:",
            error
        );

        return [];
    }
}


/* =========================================================
   GET ADMIN STORIES
   ========================================================= */

function getManagementStories() {

    const savedStories =
        localStorage.getItem(
            MANAGEMENT_STORIES_KEY
        );

    if (!savedStories) {

        return [];
    }

    try {

        const stories =
            JSON.parse(savedStories);

        return Array.isArray(stories)
            ? stories
            : [];

    } catch (error) {

        console.error(
            "Invalid stories data:",
            error
        );

        return [];
    }
}


/* =========================================================
   GET USER DATA
   ========================================================= */

function getManagementUserData() {

    const savedData =
        localStorage.getItem(
            MANAGEMENT_USER_DATA_KEY
        );

    if (!savedData) {

        return {};
    }

    try {

        return JSON.parse(savedData);

    } catch (error) {

        console.error(
            "Invalid user data:",
            error
        );

        return {};
    }
}


/* =========================================================
   DISPLAY ADMIN
   ========================================================= */

function displayAdminInformation() {

    const admin =
        getManagementAdmin();

    if (!admin) {

        return;
    }


    const adminName =
        document.getElementById(
            "adminName"
        );

    const adminUsername =
        document.getElementById(
            "adminUsername"
        );

    const adminRole =
        document.getElementById(
            "adminRole"
        );


    if (adminName) {

        adminName.textContent =
            admin.name ||
            "Administrator";
    }


    if (adminUsername) {

        adminUsername.textContent =
            admin.username
                ? "@" + admin.username
                : "@admin";
    }


    if (adminRole) {

        adminRole.textContent =
            admin.role === "admin"
                ? "Admin"
                : "User";
    }

}


/* =========================================================
   USER COUNT
   ========================================================= */

function updateUserStatistics() {

    const users =
        getManagementUsers();

    const totalUsers =
        document.getElementById(
            "totalUsers"
        );


    if (totalUsers) {

        totalUsers.textContent =
            users.length;
    }

}


/* =========================================================
   STORY COUNT
   ========================================================= */

function updateStoryStatistics() {

    const stories =
        getManagementStories();

    const totalStories =
        document.getElementById(
            "totalStories"
        );


    if (totalStories) {

        totalStories.textContent =
            stories.length;
    }

}


/* =========================================================
   TRAINING COUNT
   ========================================================= */

function updateTrainingStatistics() {

    const totalTrainings =
        document.getElementById(
            "totalTrainings"
        );


    let trainingCount = 0;


    const savedTrainings =
        localStorage.getItem(
            "respairTrainings"
        );


    if (savedTrainings) {

        try {

            const trainings =
                JSON.parse(
                    savedTrainings
                );


            if (
                Array.isArray(
                    trainings
                )
            ) {

                trainingCount =
                    trainings.length;
            }

        } catch (error) {

            console.error(
                "Invalid training data:",
                error
            );

        }

    }


    /*
       Respair Dawn currently has
       24 training programs.
    */

    if (
        trainingCount === 0
    ) {

        trainingCount = 24;
    }


    if (totalTrainings) {

        totalTrainings.textContent =
            trainingCount;
    }

}


/* =========================================================
   UPDATE STATISTICS
   ========================================================= */

function updateManagementStatistics() {

    updateUserStatistics();

    updateStoryStatistics();

    updateTrainingStatistics();

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutAdmin() {

    const confirmed =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {

        return;
    }


    localStorage.removeItem(
        MANAGEMENT_USER_KEY
    );


    sessionStorage.removeItem(
        "respairAdminAuthenticated"
    );


    window.location.href =
        "auth.html";

}


/* =========================================================
   ACTIVITY OVERVIEW
   ========================================================= */

function showActivityOverview() {

    const users =
        getManagementUsers();

    const stories =
        getManagementStories();

    const userData =
        getManagementUserData();


    let favoriteCount = 0;

    let savedCount = 0;

    let classCount = 0;


    Object.values(
        userData
    ).forEach(
        function (data) {

            if (!data) {

                return;
            }


            if (
                Array.isArray(
                    data.favorites
                )
            ) {

                favoriteCount +=
                    data.favorites.length;
            }


            if (
                Array.isArray(
                    data.saved
                )
            ) {

                savedCount +=
                    data.saved.length;
            }


            if (
                Array.isArray(
                    data.classes
                )
            ) {

                classCount +=
                    data.classes.length;
            }

        }
    );


    alert(

        "Respair Dawn Activity\n\n" +

        "Registered Users: " +
        users.length +

        "\nStories: " +
        stories.length +

        "\nFavorite Items: " +
        favoriteCount +

        "\nSaved Items: " +
        savedCount +

        "\nClasses Selected: " +
        classCount

    );

}


/* =========================================================
   MANAGEMENT BUTTONS
   ========================================================= */

function setupManagementButtons() {


    /* -----------------------------------------------------
       USERS
    ----------------------------------------------------- */

    const usersButton =
        document.getElementById(
            "manageUsersBtn"
        );


    if (usersButton) {

        usersButton.addEventListener(
            "click",
            function () {

                alert(
                    "User Management is ready to be connected."
                );

            }
        );

    }


    /* -----------------------------------------------------
       STORIES
    ----------------------------------------------------- */

    const storiesButton =
        document.getElementById(
            "manageStoriesBtn"
        );


    if (storiesButton) {

        storiesButton.addEventListener(
            "click",
            function () {

                alert(
                    "Stories Management is ready to be connected."
                );

            }
        );

    }


    /* -----------------------------------------------------
       TRAININGS
    ----------------------------------------------------- */

    const trainingsButton =
        document.getElementById(
            "manageTrainingsBtn"
        );


    if (trainingsButton) {

        trainingsButton.addEventListener(
            "click",
            function () {

                alert(
                    "Training Management is ready to be connected."
                );

            }
        );

    }


    /* -----------------------------------------------------
       RESEARCH
    ----------------------------------------------------- */

    const researchButton =
        document.getElementById(
            "manageResearchBtn"
        );


    if (researchButton) {

        researchButton.addEventListener(
            "click",
            function () {

                alert(
                    "Research Management is ready to be connected."
                );

            }
        );

    }


    /* -----------------------------------------------------
       SETTINGS
    ----------------------------------------------------- */

    const settingsButton =
        document.getElementById(
            "manageSettingsBtn"
        );


    if (settingsButton) {

        settingsButton.addEventListener(
            "click",
            function () {

                alert(
                    "Website Settings are ready to be connected."
                );

            }
        );

    }


    /* -----------------------------------------------------
       ACTIVITY
    ----------------------------------------------------- */

    const activityButton =
        document.getElementById(
            "activityBtn"
        );


    if (activityButton) {

        activityButton.addEventListener(
            "click",
            showActivityOverview
        );

    }

}


/* =========================================================
   LOGOUT BUTTON
   ========================================================= */

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "adminLogoutBtn"
        );


    if (!logoutButton) {

        return;
    }


    logoutButton.addEventListener(
        "click",
        logoutAdmin
    );

}


/* =========================================================
   VERIFY ADMIN
   ========================================================= */

function verifyManagementAdmin() {

    const admin =
        getManagementAdmin();


    if (!admin) {

        window.location.replace(
            "auth.html?redirect=management.html"
        );

        return false;
    }


    if (
        admin.role !== "admin"
    ) {

        window.location.replace(
            "index.html"
        );

        return false;
    }


    return true;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeManagementPanel() {

    if (
        !verifyManagementAdmin()
    ) {

        return;
    }


    displayAdminInformation();

    updateManagementStatistics();

    setupManagementButtons();

    setupLogout();


    console.log(
        "Respair Dawn Management Panel initialized."
    );

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeManagementPanel
);