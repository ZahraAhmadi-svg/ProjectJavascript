
"use strict";

/* =========================================================
   RESPAIR DAWN — SETTINGS SYSTEM
   - Account-specific settings
   - Profile editing and persistence
   - Learning preferences
   - Notification preferences
   - Appearance settings
   - Logout and preference reset
   ========================================================= */


/* =========================================================
   1. STORAGE HELPERS
   ========================================================= */

function settingsReadStorage(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return fallback;
    }
}

function settingsWriteStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Could not save ${key}:`, error);
        return false;
    }
}


/* =========================================================
   2. CURRENT USER AND STORAGE KEY
   ========================================================= */

function getSettingsCurrentUser() {
    const user = settingsReadStorage("respairUser");

    if (!user || typeof user !== "object" || Array.isArray(user)) {
        return null;
    }

    return user;
}

function getSettingsUserName(user) {
    if (!user) return "User";

    return String(
        user.fullName ||
        user.fullname ||
        user.name ||
        user.displayName ||
        user.username ||
        user.userName ||
        "User"
    ).trim() || "User";
}

function getSettingsUserEmail(user) {
    return String(user?.email || user?.userEmail || "").trim();
}

function getSettingsStorageKey(user) {
    /*
       Email is used first to preserve settings created by
       the previous version of this Settings page.
       The key remains stable when the username changes.
    */

    const identifier =
        getSettingsUserEmail(user) ||
        user?.id ||
        user?.username ||
        "default";

    return `respairSettings_${encodeURIComponent(
        String(identifier).trim().toLowerCase()
    )}`;
}

function getSettingsDefaults() {
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

function getSettingsForCurrentUser() {
    const defaults = getSettingsDefaults();

    const saved = settingsReadStorage(
        settingsStorageKey,
        {}
    );

    const data =
        saved && typeof saved === "object" && !Array.isArray(saved)
            ? saved
            : {};

    return {
        profile: {
            ...defaults.profile,
            ...(data.profile || {})
        },

        learning: {
            ...defaults.learning,
            ...(data.learning || {})
        },

        notifications: {
            ...defaults.notifications,
            ...(data.notifications || {})
        },

        appearance: {
            ...defaults.appearance,
            ...(data.appearance || {})
        }
    };
}


/* =========================================================
   3. DOM ELEMENTS
   Match both Settings IDs and the shared navbar IDs.
   ========================================================= */

const settingsElements = {
    layout: document.getElementById("settingsLayout"),
    loginNotice: document.getElementById("settingsLoginNotice"),
    status: document.getElementById("settingsStatus"),

    userButton:
        document.getElementById("settingsUserButton") ||
        document.getElementById("userMenuButton"),

    userDropdown:
        document.getElementById("settingsUserDropdown") ||
        document.getElementById("userMenu"),

    menuAvatar:
        document.getElementById("menuAvatar") ||
        document.getElementById("userAvatar"),

    menuUserName: document.getElementById("menuUserName"),

    menuUserEmail:
        document.getElementById("menuUserEmail") ||
        document.getElementById("menuUserStatus"),

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
    navbarLogout: document.getElementById("logoutButton"),
    privacyLogout: document.getElementById("privacyLogoutButton"),

    reset: document.getElementById("resetSettingsButton"),
    currentYear: document.getElementById("settingsCurrentYear")
};


/* =========================================================
   4. PAGE STATE
   ========================================================= */

let currentUser = getSettingsCurrentUser();

let settingsStorageKey = currentUser
    ? getSettingsStorageKey(currentUser)
    : "respairSettings_default";

let currentSettings = getSettingsForCurrentUser();
let settingsStatusTimeout = null;


/* =========================================================
   5. STATUS MESSAGES
   ========================================================= */

function showSettingsStatus(message, type = "success") {
    const status = settingsElements.status;

    if (!status) return;

    status.textContent = message;
    status.classList.toggle("error", type === "error");
    status.hidden = false;

    if (settingsStatusTimeout) {
        clearTimeout(settingsStatusTimeout);
    }

    settingsStatusTimeout = setTimeout(() => {
        status.hidden = true;
    }, 4000);
}


/* =========================================================
   6. ACCOUNT INITIALIZATION
   ========================================================= */

function initializeSettingsAccount() {
    if (!settingsElements.layout || !settingsElements.loginNotice) {
        console.error(
            "Settings layout elements are missing from settings.html."
        );
        return false;
    }

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

    if (settingsElements.userButton) {
        settingsElements.userButton.hidden = false;
    }

    return true;
}


/* =========================================================
   7. AVATAR AND SHARED USER MENU
   The shared index.js script handles menu opening/closing.
   ========================================================= */

function getSettingsInitials(name) {
    const words = String(name || "User")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) return "U";

    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    return (
        words[0].charAt(0) +
        words[1].charAt(0)
    ).toUpperCase();
}

function updateSettingsUserMenu() {
    if (!currentUser) return;

    const name =
        currentSettings.profile.fullName ||
        getSettingsUserName(currentUser);

    const email = getSettingsUserEmail(currentUser);

    if (settingsElements.menuUserName) {
        settingsElements.menuUserName.textContent = name;
    }

    if (settingsElements.menuUserEmail) {
        settingsElements.menuUserEmail.textContent =
            email || "Your account";
    }

    if (settingsElements.menuAvatar) {
        settingsElements.menuAvatar.textContent =
            getSettingsInitials(name);
    }
}


/* =========================================================
   8. PROFILE INFORMATION
   ========================================================= */

function updateSettingsProfilePreview() {
    const fullName =
        settingsElements.fullName?.value.trim() ||
        settingsElements.username?.value.trim() ||
        "Your Name";

    const email = settingsElements.email?.value.trim() || "";

    if (settingsElements.profilePreviewName) {
        settingsElements.profilePreviewName.textContent = fullName;
    }

    if (settingsElements.profilePreviewEmail) {
        settingsElements.profilePreviewEmail.textContent =
            email || "Your email address";
    }

    if (settingsElements.profileAvatar) {
        settingsElements.profileAvatar.textContent =
            getSettingsInitials(fullName);
    }

    if (settingsElements.bioCharacterCount) {
        settingsElements.bioCharacterCount.textContent =
            settingsElements.bio?.value.length || 0;
    }
}

function loadSettingsProfile() {
    if (!currentUser) return;

    const profile = currentSettings.profile;

    if (settingsElements.fullName) {
        settingsElements.fullName.value =
            profile.fullName || getSettingsUserName(currentUser);
    }

    if (settingsElements.username) {
        settingsElements.username.value =
            profile.username || currentUser.username || "";
    }

    if (settingsElements.email) {
        settingsElements.email.value = getSettingsUserEmail(currentUser);
    }

    if (settingsElements.bio) {
        settingsElements.bio.value = profile.bio || "";
    }

    updateSettingsProfilePreview();
}


/* =========================================================
   9. SAVE PROFILE TO SETTINGS, SESSION AND USER REGISTRY
   ========================================================= */

function saveSettingsProfile(event) {
    event.preventDefault();

    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const form = settingsElements.profileForm;

    if (form && !form.reportValidity()) return;

    const fullName = settingsElements.fullName?.value.trim() || "";
    const username = settingsElements.username?.value.trim() || "";
    const bio = settingsElements.bio?.value.trim() || "";

    if (!fullName) {
        showSettingsStatus("Please enter your full name.", "error");
        settingsElements.fullName?.focus();
        return;
    }

    if (username && !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        showSettingsStatus(
            "Username must contain 3–20 letters, numbers or underscores.",
            "error"
        );
        settingsElements.username?.focus();
        return;
    }

    /*
       Do not allow a username already assigned to another account.
       The account is matched by its stable ID whenever possible.
    */

    const users = settingsReadStorage("respairUsers", []);
    const userList = Array.isArray(users) ? users : [];
    const currentId = String(currentUser.id || "");
    const currentEmail = getSettingsUserEmail(currentUser).toLowerCase();

    const duplicateUsername = username
        ? userList.some(account => {
            const sameAccount =
                (currentId && String(account.id || "") === currentId) ||
                (
                    currentEmail &&
                    String(account.email || "").toLowerCase() === currentEmail
                );

            return !sameAccount &&
                String(account.username || "").toLowerCase() ===
                    username.toLowerCase();
        })
        : false;

    if (duplicateUsername) {
        showSettingsStatus(
            "This username is already used by another account.",
            "error"
        );
        settingsElements.username?.focus();
        return;
    }

    const nextSettings = {
        ...currentSettings,
        profile: {
            ...currentSettings.profile,
            fullName,
            username,
            bio
        }
    };

    if (!settingsWriteStorage(settingsStorageKey, nextSettings)) {
        showSettingsStatus("Could not save your profile settings.", "error");
        return;
    }

    /*
       Update the session's name as well as fullName so that
       pages using either property show the same display name.
    */

    const updatedUser = {
        ...currentUser,
        name: fullName,
        fullName,
        username
    };

    if (!settingsWriteStorage("respairUser", updatedUser)) {
        showSettingsStatus(
            "Settings were saved, but the current session could not be updated.",
            "error"
        );
        return;
    }

    /*
       Keep the registered account in sync so the updated name
       survives the next login.
    */

    const matchingIndex = userList.findIndex(account => {
        if (currentId && String(account.id || "") === currentId) {
            return true;
        }

        return currentEmail &&
            String(account.email || "").toLowerCase() === currentEmail;
    });

    if (matchingIndex !== -1) {
        userList[matchingIndex] = {
            ...userList[matchingIndex],
            name: fullName,
            username
        };

        if (!settingsWriteStorage("respairUsers", userList)) {
            showSettingsStatus(
                "Profile saved for this session, but the registered account could not be updated.",
                "error"
            );
            return;
        }
    }

    currentUser = updatedUser;
    currentSettings = nextSettings;

    updateSettingsProfilePreview();
    updateSettingsUserMenu();

    showSettingsStatus("Your profile settings have been saved.");
}

settingsElements.fullName?.addEventListener(
    "input",
    updateSettingsProfilePreview
);

settingsElements.username?.addEventListener(
    "input",
    updateSettingsProfilePreview
);

settingsElements.bio?.addEventListener("input", () => {
    if (settingsElements.bioCharacterCount) {
        settingsElements.bioCharacterCount.textContent =
            settingsElements.bio.value.length;
    }
});

settingsElements.profileForm?.addEventListener(
    "submit",
    saveSettingsProfile
);

settingsElements.profileForm?.addEventListener("reset", event => {
    event.preventDefault();

    currentSettings = getSettingsForCurrentUser();
    loadSettingsProfile();

    showSettingsStatus("Unsaved profile changes were discarded.");
});


/* =========================================================
   10. LEARNING PREFERENCES
   ========================================================= */

function loadSettingsLearning() {
    const learning = currentSettings.learning;

    if (settingsElements.preferredLearning) {
        settingsElements.preferredLearning.value =
            learning.preferredLearning;
    }

    if (settingsElements.learningGoal) {
        settingsElements.learningGoal.value = learning.learningGoal;
    }

    if (settingsElements.dailyLearningTime) {
        settingsElements.dailyLearningTime.value =
            learning.dailyLearningTime;
    }
}

function saveSettingsLearning() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    currentSettings.learning = {
        preferredLearning:
            settingsElements.preferredLearning?.value || "",

        learningGoal:
            settingsElements.learningGoal?.value || "personal-growth",

        dailyLearningTime:
            settingsElements.dailyLearningTime?.value || "30"
    };

    if (!settingsWriteStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus("Learning preferences could not be saved.", "error");
        return;
    }

    showSettingsStatus("Your learning preferences have been saved.");
}

settingsElements.saveLearning?.addEventListener(
    "click",
    saveSettingsLearning
);


/* =========================================================
   11. NOTIFICATION PREFERENCES
   ========================================================= */

const settingsNotificationElements = {
    learningReminders: settingsElements.learningReminders,
    trainingNotifications: settingsElements.trainingNotifications,
    storyNotifications: settingsElements.storyNotifications,
    researchNotifications: settingsElements.researchNotifications
};

function loadSettingsNotifications() {
    const notifications = currentSettings.notifications;

    Object.entries(settingsNotificationElements).forEach(([key, element]) => {
        if (element) {
            element.checked = Boolean(notifications[key]);
        }
    });
}

function saveSettingsNotifications() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const notifications = {};

    Object.entries(settingsNotificationElements).forEach(([key, element]) => {
        notifications[key] = element ? element.checked : false;
    });

    currentSettings.notifications = notifications;

    if (!settingsWriteStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus("Notification preferences could not be saved.", "error");
        return;
    }

    showSettingsStatus("Your notification preferences have been saved.");
}

settingsElements.saveNotifications?.addEventListener(
    "click",
    saveSettingsNotifications
);


/* =========================================================
   12. APPEARANCE
   ========================================================= */

function getSettingsSelectedTheme() {
    const selected = document.querySelector(
        'input[name="settingsTheme"]:checked'
    );

    return selected?.value === "dark" ? "dark" : "light";
}

function applySettingsTheme(theme) {
    const normalizedTheme = theme === "dark" ? "dark" : "light";

    document.body.classList.toggle(
        "settings-dark",
        normalizedTheme === "dark"
    );

    document.querySelectorAll('input[name="settingsTheme"]').forEach(radio => {
        radio.checked = radio.value === normalizedTheme;
    });
}

function loadSettingsAppearance() {
    applySettingsTheme(currentSettings.appearance.theme);
}

function saveSettingsAppearance() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const theme = getSettingsSelectedTheme();

    currentSettings.appearance = { theme };

    if (!settingsWriteStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus("Appearance preference could not be saved.", "error");
        return;
    }

    applySettingsTheme(theme);
    showSettingsStatus("Your appearance preference has been saved.");
}

settingsElements.saveAppearance?.addEventListener(
    "click",
    saveSettingsAppearance
);


/* =========================================================
   13. RESET PREFERENCES
   Keep profile information; reset other preferences.
   ========================================================= */

function resetSettingsPreferences() {
    if (!currentUser) {
        showSettingsStatus("Please log in first.", "error");
        return;
    }

    const confirmed = window.confirm(
        "Reset your learning, notification and appearance preferences? " +
        "Your profile information will remain unchanged."
    );

    if (!confirmed) return;

    const defaults = getSettingsDefaults();

    currentSettings = {
        ...defaults,
        profile: {
            ...currentSettings.profile
        }
    };

    if (!settingsWriteStorage(settingsStorageKey, currentSettings)) {
        showSettingsStatus("Preferences could not be reset.", "error");
        return;
    }

    loadSettingsLearning();
    loadSettingsNotifications();
    loadSettingsAppearance();
    loadSettingsProfile();
    updateSettingsUserMenu();

    showSettingsStatus("Your preferences have been reset.");
}

settingsElements.reset?.addEventListener(
    "click",
    resetSettingsPreferences
);


/* =========================================================
   14. LOGOUT
   Preserve accounts, classes, favorites and preferences.
   ========================================================= */

function logoutSettingsUser() {
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    try {
        localStorage.removeItem("respairUser");
        localStorage.removeItem("respairLoggedIn");
        localStorage.removeItem("loginTime");

        sessionStorage.removeItem("respairAdminAuthenticated");

        window.location.href = "login.html";
    } catch (error) {
        console.error("Could not log out:", error);
        showSettingsStatus("Could not log out. Please try again.", "error");
    }
}

settingsElements.logout?.addEventListener("click", logoutSettingsUser);
settingsElements.navbarLogout?.addEventListener("click", logoutSettingsUser);
settingsElements.privacyLogout?.addEventListener("click", logoutSettingsUser);


/* =========================================================
   15. SIDEBAR AND FOOTER
   ========================================================= */

const settingsSidebarLinks = document.querySelectorAll(
    ".settings-sidebar-link"
);

settingsSidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        settingsSidebarLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

if (settingsElements.currentYear) {
    settingsElements.currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   16. INITIALIZE PAGE
   ========================================================= */

function initializeSettingsPage() {
    if (!initializeSettingsAccount()) return;

    currentSettings = getSettingsForCurrentUser();

    updateSettingsUserMenu();
    loadSettingsProfile();
    loadSettingsLearning();
    loadSettingsNotifications();
    loadSettingsAppearance();
}

initializeSettingsPage();
