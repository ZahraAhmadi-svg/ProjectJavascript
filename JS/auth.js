/* =========================================================
   RESPAIR DAWN
   AUTH / USER DATA
   ========================================================= */

const USER_STORAGE_KEY = "respairUser";
const USER_DATA_KEY = "respairUserData";


/* =========================================================
   GET CURRENT USER
   ========================================================= */

function getCurrentUser() {

    const savedUser =
        localStorage.getItem(USER_STORAGE_KEY);

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Invalid user data:",
            error
        );

        return null;
    }
}


/* =========================================================
   GET USER ID
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
   GET ALL USERS DATA
   ========================================================= */

function getAllUserData() {

    const savedData =
        localStorage.getItem(USER_DATA_KEY);

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
   SAVE ALL USERS DATA
   ========================================================= */

function saveAllUserData(data) {

    localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(data)
    );
}


/* =========================================================
   GET CURRENT USER DATA
   ========================================================= */

function getCurrentUserData() {

    const user =
        getCurrentUser();

    if (!user) {
        return null;
    }

    const userId =
        getUserId(user);

    const allData =
        getAllUserData();


    /* Create data for new user */

    if (!allData[userId]) {

        allData[userId] = {

            classes: [],
            favorites: [],
            saved: []

        };

        saveAllUserData(allData);
    }


    return allData[userId];
}


/* =========================================================
   SAVE CURRENT USER DATA
   ========================================================= */

function saveCurrentUserData(userData) {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }

    const userId =
        getUserId(user);

    const allData =
        getAllUserData();

    allData[userId] =
        userData;

    saveAllUserData(allData);
}