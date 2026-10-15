/* =========================================================
   RESPAIR DAWN — SETTINGS SYSTEM
   ---------------------------------------------------------
   Features:
   1. Load the current user.
   2. Save profile settings.
   3. Save learning preferences.
   4. Save notification preferences.
   5. Save light/dark appearance.
   6. Persist settings in localStorage.
   7. Manage user menu and logout.
   ========================================================= */

"use strict";


/* =========================================================
   1. STORAGE HELPERS
   ========================================================= */

function readStorage(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.warn(`Could not read ${key}:`, error);
        return fallback;
    }
}


function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Could not save ${key}:`, error);
        return false;
    }
}


/* =========================================================
   2. GET CURRENT USER
   ========================================================= */

function getCurrentUser() {
    const user = readStorage("respairUser");

    // The current account should be an object.
    if (!user || typeof user !== "object" || Array.isArray(user)) {
        return null;
    }

    return user;
}




function getUserDisplayName(user) {
    if (!user) {
        return "User";
    }

    const name =
        user.fullName ||
        user.fullname ||
        user.name ||
        user.displayName ||
        user.username ||
        user.userName ||
        "";

    return String(name).trim() || "User";
}



function getUserEmail(user) {
    if (!user) {
        return "";
    }

    return user.email || user.userEmail || "";
}


function getUserSettingsKey(user) {
    // Keep each account's settings separate.
    const identifier = (
        getUserEmail(user) ||
        user.id ||
        user.username ||
        "default"
    ).toString().trim().toLowerCase();

    return `respairSettings_${encodeURIComponent(identifier)}`;
}


/* =========================================================
   3. DEFAULT SETTINGS
   ========================================================= */

function getDefaultSettings() {
    return {
        profile: {
            fullName: "",
            username: "",
            bio: ""
        },

        learning: {
            preferredLearning: "",
            learningGoal: "personal-growth",
            dailyLearningTime: "30"
        },

        notifications: {
            learningReminders: false,
            trainingNotifications: false,
            storyNotifications: false,
            researchNotifications: false
        },

        appearance: {
            theme: "light"
        }
    };
}


function getCurrentSettings() {
    const saved = readStorage(settingsStorageKey, {});
    const defaults = getDefaultSettings();

    const settings = (
        saved &&
        typeof saved === "object" &&
        !Array.isArray(saved)
    ) ? saved : {};

    return {
        profile: {
            ...defaults.profile,
            ...(settings.profile || {})
        },

        learning: {
            ...defaults.learning,
            ...(settings.learning || {})
        },

        notifications: {
            ...defaults.notifications,
            ...(settings.notifications || {})
        },

        appearance: {
            ...defaults.appearance,
            ...(settings.appearance || {})
        }
    };
}


/* =========================================================
   4. DOM ELEMENTS
   ========================================================= */

const settingsElements = {
    layout: document.getElementById("settingsLayout"),
    loginNotice: document.getElementById("settingsLoginNotice"),
    status: document.getElementById("settingsStatus"),

    userButton: document.getElementById("settingsUserButton"),
    userDropdown: document.getElementById("settingsUserDropdown"),

    menuAvatar: document.getElementById("menuAvatar"),
    menuUserName: document.getElementById("menuUserName"),
    menuUserEmail: document.getElementById("menuUserEmail"),

    profileForm: document.getElementById("profileSettingsForm"),
    fullName: document.getElementById("settingsFullName"),
    username: document.getElementById("settingsUsername"),
    email: document.getElementById("settingsEmail"),
    bio: document.getElementById("settingsBio"),

    profileAvatar: document.getElementById("profileAvatar"),
    profilePreviewName: document.getElementById("profilePreviewName"),
    profilePreviewEmail: document.getElementById("profilePreviewEmail"),
    bioCharacterCount: document.getElementById("bioCharacterCount"),

    preferredLearning: document.getElementById("preferredLearning"),
    learningGoal: document.getElementById("learningGoal"),
    dailyLearningTime: document.getElementById("dailyLearningTime"),

    learningReminders: document.getElementById("learningReminders"),
    trainingNotifications: document.getElementById("trainingNotifications"),
    storyNotifications: document.getElementById("storyNotifications"),
    researchNotifications: document.getElementById("researchNotifications"),

    saveLearning: document.getElementById("saveLearningSettings"),
    saveNotifications: document.getElementById("saveNotificationSettings"),
    saveAppearance: document.getElementById("saveAppearanceSettings"),

    logout: document.getElementById("settingsLogoutButton"),
    privacyLogout: document.getElementById("privacyLogoutButton"),
    reset: document.getElementById("resetSettingsButton"),

    currentYear: document.getElementById("settingsCurrentYear")
};


/* =========================================================
   5. INITIALIZE ACCOUNT
   ========================================================= */

let currentUser = getCurrentUser();

let settingsStorageKey = currentUser
    ? getUserSettingsKey(currentUser)
    : "respairSettings_default";

let currentSettings = getCurrentSettings();


function initializeAccount() {
    if (!currentUser) {
        settingsElements.layout.hidden = true;
        settingsElements.loginNotice.hidden = false;

        if (settingsElements.userButton) {
            settingsElements.userButton.hidden = true;
        }

        return false;
    }

    settingsElements.layout.hidden = false;
    settingsElements.loginNotice.hidden = true;

    return true;
}


/* =========================================================
   6. STATUS MESSAGE
   ========================================================= */

let statusTimeout = null;


function showSettingsStatus(message, type = "success") {
    const status = settingsElements.status;

    status.textContent = message;
    status.classList.toggle("error", type === "error");
    status.hidden = false;

    if (statusTimeout) {
        clearTimeout(statusTimeout);
    }

    statusTimeout = setTimeout(() => {
        status.hidden = true;
    }, 4000);
}


/* =========================================================
   7. AVATAR AND USER MENU
   ========================================================= */

function getInitials(name) {
    const words = String(name || "User")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "U";
    }

    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    return (
        words[0].charAt(0) +
        words[1].charAt(0)
    ).toUpperCase();
}



function updateUserMenu() {
    if (!currentUser) {
        return;
    }

    const savedProfile = currentSettings.profile || {};

    const name =
        savedProfile.fullName ||
        currentUser.fullName ||
        currentUser.fullname ||
        currentUser.name ||
        currentUser.displayName ||
        currentUser.username ||
        currentUser.userName ||
        "User";

    const email = getUserEmail(currentUser);

    if (settingsElements.menuUserName) {
        settingsElements.menuUserName.textContent = name;
    }

    if (settingsElements.menuUserEmail) {
        settingsElements.menuUserEmail.textContent =
            email || currentUser.role || "Your account";
    }

    if (settingsElements.menuAvatar) {
        settingsElements.menuAvatar.textContent = getInitials(name);
    }
}


function toggleUserMenu(forceState) {
    const button = settingsElements.userButton;
    const dropdown = settingsElements.userDropdown;

    if (!button || !dropdown) {
        return;
    }

    const shouldOpen = typeof forceState === "boolean"
        ? forceState
        : dropdown.hidden;

    dropdown.hidden = !shouldOpen;

    button.setAttribute(
        "aria-expanded",
        String(shouldOpen)
    );
}


if (settingsElements.userButton) {
    settingsElements.userButton.addEventListener("click", () => {
        toggleUserMenu();
    });
}


document.addEventListener("click", (event) => {
    const menu = document.querySelector(".settings-user-menu");

    if (menu && !menu.contains(event.target)) {
        toggleUserMenu(false);
    }
});


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        toggleUserMenu(false);
    }
});


/* =========================================================
   8. LOAD PROFILE INFORMATION
   ========================================================= */

function loadProfileSettings() {
    if (!currentUser) {
        return;
    }

    const profile = currentSettings.profile;

    const fullName =
    profile.fullName ||
    currentUser.fullName ||
    currentUser.fullname ||
    currentUser.name ||
    currentUser.displayName ||
    currentUser.username ||
    currentUser.userName ||
    "";

    const username = (
        profile.username ||
        currentUser.username ||
        ""
    );

    const email = getUserEmail(currentUser);

    settingsElements.fullName.value = fullName;
    settingsElements.username.value = username;
    settingsElements.email.value = email;
    settingsElements.bio.value = profile.bio || "";

    updateProfilePreview();
}


function updateProfilePreview() {
    const fullName = (
        settingsElements.fullName.value.trim() ||
        settingsElements.username.value.trim() ||
        "Your Name"
    );

    const email = settingsElements.email.value.trim();

    settingsElements.profilePreviewName.textContent = fullName;
    settingsElements.profilePreviewEmail.textContent =
        email || "Your email address";

    settingsElements.profileAvatar.textContent = getInitials(fullName);

    settingsElements.bioCharacterCount.textContent =
        settingsElements.bio.value.length;
}


settingsElements.fullName.addEventListener("input", updateProfilePreview);
settingsElements.username.addEventListener("input", updateProfilePreview);

settingsElements.bio.addEventListener("input", () => {
    settingsElements.bioCharacterCount.textContent =
        settingsElements.bio.value.length;
});


/* =========================================================
   9. SAVE PROFILE
   ========================================================= */

function saveProfileSettings(event) {
    event.preventDefault();

    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    if (!settingsElements.profileForm.reportValidity()) {
        return;
    }

    const fullName = settingsElements.fullName.value.trim();
    const username = settingsElements.username.value.trim();
    const bio = settingsElements.bio.value.trim();

    if (!fullName) {
        showSettingsStatus("Please enter your full name.", "error");
        return;
    }

    // Preserve the existing settings.
    currentSettings.profile = {
        fullName,
        username,
        bio
    };

    if (!writeStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus(
            "Could not save your profile. Check browser storage.",
            "error"
        );
        return;
    }

    /*
       Update the current session object while preserving
       any other properties used by the existing project.
    */

    const updatedUser = {
        ...currentUser,
        fullName,
        username
    };

    if (!writeStorage("respairUser", updatedUser)) {
        showSettingsStatus(
            "Your settings were saved, but the session profile could not be updated.",
            "error"
        );
        return;
    }

    currentUser = updatedUser;

    updateProfilePreview();
    updateUserMenu();

    showSettingsStatus("Your profile settings have been saved.");
}


settingsElements.profileForm.addEventListener(
    "submit",
    saveProfileSettings
);


/*
   Cancel restores the last saved profile instead of
   leaving unsaved input in the form.
*/

settingsElements.profileForm.addEventListener("reset", (event) => {
    event.preventDefault();

    currentSettings = getCurrentSettings();

    loadProfileSettings();

    showSettingsStatus("Unsaved profile changes were discarded.");
});


/* =========================================================
   10. LOAD LEARNING PREFERENCES
   ========================================================= */

function loadLearningSettings() {
    const learning = currentSettings.learning;

    settingsElements.preferredLearning.value =
        learning.preferredLearning;

    settingsElements.learningGoal.value =
        learning.learningGoal;

    settingsElements.dailyLearningTime.value =
        learning.dailyLearningTime;
}


/* =========================================================
   11. SAVE LEARNING PREFERENCES
   ========================================================= */

function saveLearningSettings() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    currentSettings.learning = {
        preferredLearning:
            settingsElements.preferredLearning.value,

        learningGoal:
            settingsElements.learningGoal.value,

        dailyLearningTime:
            settingsElements.dailyLearningTime.value
    };

    if (!writeStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus(
            "Learning preferences could not be saved.",
            "error"
        );
        return;
    }

    showSettingsStatus("Your learning preferences have been saved.");
}


settingsElements.saveLearning.addEventListener(
    "click",
    saveLearningSettings
);


/* =========================================================
   12. LOAD NOTIFICATIONS
   ========================================================= */

const notificationElements = {
    learningReminders: settingsElements.learningReminders,
    trainingNotifications: settingsElements.trainingNotifications,
    storyNotifications: settingsElements.storyNotifications,
    researchNotifications: settingsElements.researchNotifications
};


function loadNotificationSettings() {
    const notifications = currentSettings.notifications;

    Object.entries(notificationElements).forEach(([key, element]) => {
        element.checked = Boolean(notifications[key]);
    });
}


/* =========================================================
   13. SAVE NOTIFICATIONS
   ========================================================= */

function saveNotificationSettings() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const notifications = {};

    Object.entries(notificationElements).forEach(([key, element]) => {
        notifications[key] = element.checked;
    });

    currentSettings.notifications = notifications;

    if (!writeStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus(
            "Notification preferences could not be saved.",
            "error"
        );
        return;
    }

    showSettingsStatus("Your notification preferences have been saved.");
}


settingsElements.saveNotifications.addEventListener(
    "click",
    saveNotificationSettings
);


/* =========================================================
   14. APPEARANCE
   ========================================================= */

function getSelectedTheme() {
    const selected = document.querySelector(
        'input[name="settingsTheme"]:checked'
    );

    return selected ? selected.value : "light";
}


function applyAppearance(theme) {
    document.body.classList.toggle(
        "settings-dark",
        theme === "dark"
    );

    const lightThemeRadio = document.querySelector(
        'input[name="settingsTheme"][value="light"]'
    );

    const darkThemeRadio = document.querySelector(
        'input[name="settingsTheme"][value="dark"]'
    );

    if (lightThemeRadio && darkThemeRadio) {
        lightThemeRadio.checked = theme === "light";
        darkThemeRadio.checked = theme === "dark";
    }
}


function loadAppearanceSettings() {
    const theme = currentSettings.appearance.theme === "dark"
        ? "dark"
        : "light";

    applyAppearance(theme);
}


function saveAppearanceSettings() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const theme = getSelectedTheme();

    currentSettings.appearance = { theme };

    if (!writeStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus(
            "Appearance preference could not be saved.",
            "error"
        );
        return;
    }

    applyAppearance(theme);

    showSettingsStatus(
        `Your appearance preference has been saved.`
    );
}


settingsElements.saveAppearance.addEventListener(
    "click",
    saveAppearanceSettings
);


/* =========================================================
   15. RESET PREFERENCES
   ========================================================= */

function resetPreferences() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const confirmed = window.confirm(
        "Reset your learning, notification, and appearance preferences? " +
        "Your profile information will not be deleted."
    );

    if (!confirmed) {
        return;
    }

    const defaults = getDefaultSettings();

    // Keep the profile but reset other preferences.
    currentSettings = {
        ...defaults,
        profile: {
            ...currentSettings.profile
        }
    };

    if (!writeStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus(
            "Preferences could not be reset.",
            "error"
        );
        return;
    }

    loadProfileSettings();
    loadLearningSettings();
    loadNotificationSettings();
    loadAppearanceSettings();

    showSettingsStatus("Your preferences have been reset.");
}


settingsElements.reset.addEventListener(
    "click",
    resetPreferences
);


/* =========================================================
   16. LOG OUT
   ========================================================= */

function logoutCurrentUser() {
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmed) {
        return;
    }

    /*
       Remove only the active session key.
       Keep profile data and saved preferences.
    */

    try {
        localStorage.removeItem("respairUser");
    } catch (error) {
        console.error("Could not clear the session:", error);

        showSettingsStatus(
            "Could not log out. Please try again.",
            "error"
        );

        return;
    }

    window.location.href = "login.html";
}


settingsElements.logout.addEventListener(
    "click",
    logoutCurrentUser
);

settingsElements.privacyLogout.addEventListener(
    "click",
    logoutCurrentUser
);


/* =========================================================
   17. SIDEBAR NAVIGATION
   ========================================================= */

const sidebarLinks = document.querySelectorAll(
    ".settings-sidebar-link"
);


sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        sidebarLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});


/* =========================================================
   18. FOOTER YEAR
   ========================================================= */

settingsElements.currentYear.textContent =
    new Date().getFullYear();


/* =========================================================
   19. INITIALIZE PAGE
   ========================================================= */

function initializeSettingsPage() {
    if (!initializeAccount()) {
        return;
    }

    currentSettings = getCurrentSettings();

    updateUserMenu();

    loadProfileSettings();
    loadLearningSettings();
    loadNotificationSettings();
    loadAppearanceSettings();
}


initializeSettingsPage();