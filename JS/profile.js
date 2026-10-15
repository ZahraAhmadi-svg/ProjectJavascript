
/* =========================================================
   RESPAIR DAWN
   PROFILE PAGE
   Connected with AUTH / USER DATA system
   ---------------------------------------------------------
   Features:
   1. Read the current logged-in user.
   2. Support numeric user roles.
   3. Display profile information.
   4. Display user statistics.
   5. Manage navbar user menu.
   6. Edit name and email.
   7. Synchronize profile changes with stored accounts.
   8. Logout and redirect to login.html.
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. STORAGE KEYS
       ===================================================== */

    const CURRENT_USER_KEY = "respairUser";
    const USERS_KEY = "respairUsers";


    /* =====================================================
       2. GET CURRENT USER
       ===================================================== */

    if (typeof getCurrentUser !== "function") {
        console.error(
            "getCurrentUser() is missing. Load auth-core.js before profile.js."
        );
        return;
    }

    const initialUser = getCurrentUser();

    if (!initialUser) {
        console.warn("No logged-in user found.");

        window.location.replace("login.html");
        return;
    }

    /*
       Keep a mutable reference to the current user.
       It will be updated after profile edits.
    */

    let user = { ...initialUser };


    /* =====================================================
       3. ROLE HELPERS
       ===================================================== */

    function normalizeRole(role) {
        if (typeof role === "number" && role >= 0 && role <= 3) {
            return role;
        }

        const value = String(role ?? "").trim().toLowerCase();

        const numericRole = Number(value);

        if (
            value !== "" &&
            Number.isInteger(numericRole) &&
            numericRole >= 0 &&
            numericRole <= 3
        ) {
            return numericRole;
        }

        const legacyRoles = {
            user: 0,
            student: 0,
            member: 0,
            manager: 1,
            editor: 2,
            admin: 3,
            administrator: 3
        };

        return Object.prototype.hasOwnProperty.call(
            legacyRoles,
            value
        ) ? legacyRoles[value] : 0;
    }

    function getRoleName(role) {
        const roleNames = {
            0: "Student",
            1: "Manager",
            2: "Editor",
            3: "Administrator"
        };

        return roleNames[normalizeRole(role)];
    }

    function canAccessManagement(role) {
        const normalizedRole = normalizeRole(role);

        return normalizedRole === 1 || normalizedRole === 3;
    }

    const roleNumber = normalizeRole(user.role);
    const roleName = getRoleName(user.role);


    /* =====================================================
       4. GET CURRENT USER DATA
       ===================================================== */

    function getSafeUserData() {
        if (typeof getCurrentUserData !== "function") {
            console.error(
                "getCurrentUserData() is missing. Check auth-core.js."
            );

            return {
                classes: [],
                favorites: [],
                saved: []
            };
        }

        const data = getCurrentUserData() || {};

        return {
            ...data,
            classes: Array.isArray(data.classes) ? data.classes : [],
            favorites: Array.isArray(data.favorites) ? data.favorites : [],
            saved: Array.isArray(data.saved) ? data.saved : []
        };
    }


    /* =====================================================
       5. PROFILE ELEMENTS
       ===================================================== */

    const welcomeName = document.getElementById("welcomeName");
    const profileName = document.getElementById("profileName");
    const profileUsername = document.getElementById("profileUsername");
    const profileEmail = document.getElementById("profileEmail");
    const profileRole = document.getElementById("profileRole");
    const profileAvatar = document.getElementById("profileAvatar");
    const profileDate = document.getElementById("profileDate");


    /* =====================================================
       6. USER INFORMATION
       ===================================================== */

    function getDisplayName() {
        return (
            String(user.name || "").trim() ||
            String(user.username || "").trim() ||
            "User"
        );
    }

    function getDisplayEmail() {
        return String(user.email || "").trim() || "-";
    }

    function getDisplayUsername() {
        return String(user.username || "").trim() || "username";
    }

    function getFirstLetter(name) {
        const cleanedName = String(name || "").trim();

        return cleanedName
            ? cleanedName.charAt(0).toUpperCase()
            : "U";
    }


    /* =====================================================
       7. DISPLAY PROFILE INFORMATION
       ===================================================== */

    function renderProfile() {
        const name = getDisplayName();
        const email = getDisplayEmail();
        const username = getDisplayUsername();
        const firstLetter = getFirstLetter(name);

        if (welcomeName) {
            welcomeName.textContent = name;
        }

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileUsername) {
            profileUsername.textContent = "@" + username;
        }

        if (profileEmail) {
            profileEmail.textContent = email;
        }

        if (profileRole) {
            profileRole.textContent = getRoleName(user.role);
        }

        if (profileAvatar) {
            profileAvatar.textContent = firstLetter;
        }

        renderNavbar(firstLetter, name);
    }


    /* =====================================================
       8. NAVBAR ELEMENTS
       ===================================================== */

    const userMenuItem = document.getElementById("userMenuItem");
    const userMenuButton = document.getElementById("userMenuButton");
    const userMenu = document.getElementById("userMenu");
    const userAvatar = document.getElementById("userAvatar");
    const menuUserName = document.getElementById("menuUserName");
    const menuUserStatus = document.getElementById("menuUserStatus");
    const managementMenuItem = document.getElementById("managementMenuItem");
    const logoutButton = document.getElementById("logoutButton");


    /* =====================================================
       9. RENDER NAVBAR
       ===================================================== */

    function renderNavbar(firstLetter, name) {
        if (userMenuItem) {
            userMenuItem.style.display = "block";
        }

        if (userAvatar) {
            userAvatar.textContent = firstLetter;
        }

        if (menuUserName) {
            menuUserName.textContent = name;
        }

        if (menuUserStatus) {
            menuUserStatus.textContent = getRoleName(user.role);
        }

        if (managementMenuItem) {
            managementMenuItem.style.display =
                canAccessManagement(user.role) ? "flex" : "none";
        }
    }


    /* =====================================================
       10. USER MENU TOGGLE
       ===================================================== */

    if (userMenuButton && userMenu) {
        userMenuButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = userMenu.classList.toggle("show");

            userMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }


    /* =====================================================
       11. CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {
        if (
            userMenu &&
            userMenuButton &&
            !userMenu.contains(event.target) &&
            !userMenuButton.contains(event.target)
        ) {
            userMenu.classList.remove("show");
            userMenuButton.setAttribute("aria-expanded", "false");
        }
    });


    /* =====================================================
       12. CLOSE MENU AFTER CLICKING A LINK
       ===================================================== */

    if (userMenu) {
        userMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                userMenu.classList.remove("show");

                if (userMenuButton) {
                    userMenuButton.setAttribute("aria-expanded", "false");
                }
            });
        });
    }


    /* =====================================================
       13. LOGOUT
       ===================================================== */

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();

            /*
               Remove only the active login session.
               Keep registered accounts and personal data.
            */

            localStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem("respairLoggedIn");

            sessionStorage.removeItem("respairAdminAuthenticated");

            window.location.replace("login.html");
        });
    }


    /* =====================================================
       14. ACCOUNT DATE
       ===================================================== */

    function renderProfileDate() {
        if (!profileDate) {
            return;
        }

        const dateValue = user.createdAt || user.loginAt;

        if (!dateValue) {
            profileDate.textContent = "Recently";
            return;
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            profileDate.textContent = "Recently";
            return;
        }

        profileDate.textContent = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });
    }


    /* =====================================================
       15. USER STATISTICS
       ===================================================== */

    function renderStatistics() {
        const data = getSafeUserData();

        const classesCount = document.getElementById("classesCount");
        const favoritesCount = document.getElementById("favoritesCount");
        const savedCount = document.getElementById("savedCount");

        if (classesCount) {
            classesCount.textContent = data.classes.length;
        }

        if (favoritesCount) {
            favoritesCount.textContent = data.favorites.length;
        }

        if (savedCount) {
            savedCount.textContent = data.saved.length;
        }
    }


    /* =====================================================
       16. EDIT PROFILE ELEMENTS
       ===================================================== */

    const editButton = document.getElementById("editProfileBtn");
    const form = document.getElementById("profileForm");
    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");
    const modalElement = document.getElementById("profileModal");


    /* =====================================================
       17. OPEN EDIT PROFILE MODAL
       ===================================================== */

    if (editButton && form) {
        editButton.addEventListener("click", function () {
            if (editName) {
                editName.value = getDisplayName();
            }

            if (editEmail) {
                editEmail.value = user.email || "";
            }

            if (
                modalElement &&
                typeof bootstrap !== "undefined" &&
                bootstrap.Modal
            ) {
                bootstrap.Modal
                    .getOrCreateInstance(modalElement)
                    .show();
            }
        });
    }


    /* =====================================================
       18. UPDATE STORED ACCOUNT
       ===================================================== */

    function updateRegisteredAccount(updatedUser) {
        const usersRaw = localStorage.getItem(USERS_KEY);

        if (!usersRaw) {
            return;
        }

        try {
            const users = JSON.parse(usersRaw);

            if (!Array.isArray(users)) {
                console.error("respairUsers must contain an array.");
                return;
            }

            const targetId = user.id;
            const targetUsername = String(user.username || "").toLowerCase();
            const targetEmail = String(user.email || "").toLowerCase();

            const index = users.findIndex(function (item) {
                if (targetId != null && item.id != null) {
                    return String(item.id) === String(targetId);
                }

                if (targetUsername && item.username) {
                    return String(item.username).toLowerCase() === targetUsername;
                }

                return (
                    targetEmail &&
                    item.email &&
                    String(item.email).toLowerCase() === targetEmail
                );
            });

            if (index !== -1) {
                users[index] = {
                    ...users[index],
                    name: updatedUser.name,
                    email: updatedUser.email
                };

                localStorage.setItem(USERS_KEY, JSON.stringify(users));
            } else {
                console.warn(
                    "Could not find the registered account to update."
                );
            }
        } catch (error) {
            console.error("Failed to update registered account:", error);
        }
    }


    /* =====================================================
       19. SAVE PROFILE
       ===================================================== */

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const newName = editName
                ? editName.value.trim()
                : "";

            const newEmail = editEmail
                ? editEmail.value.trim()
                : "";

            if (!newName) {
                if (editName) {
                    editName.setCustomValidity("Please enter your name.");
                    editName.reportValidity();
                    editName.setCustomValidity("");
                    editName.focus();
                }
                return;
            }

            if (!newEmail) {
                if (editEmail) {
                    editEmail.setCustomValidity("Please enter your email.");
                    editEmail.reportValidity();
                    editEmail.setCustomValidity("");
                    editEmail.focus();
                }
                return;
            }

            if (editEmail && !editEmail.checkValidity()) {
                editEmail.reportValidity();
                editEmail.focus();
                return;
            }

            /*
               Keep the old identity fields unchanged.
               Only name and email are editable here.
            */

            const updatedUser = {
                ...user,
                name: newName,
                email: newEmail
            };

            try {
                localStorage.setItem(
                    CURRENT_USER_KEY,
                    JSON.stringify(updatedUser)
                );

                updateRegisteredAccount(updatedUser);

                /*
                   Update the current in-memory user.
                */

                user = updatedUser;

                /*
                   Refresh profile and navbar.
                */

                renderProfile();

                /*
                   Close the modal.
                */

                if (
                    modalElement &&
                    typeof bootstrap !== "undefined" &&
                    bootstrap.Modal
                ) {
                    bootstrap.Modal
                        .getOrCreateInstance(modalElement)
                        .hide();
                }

                console.log("Profile updated successfully.");
            } catch (error) {
                console.error("Could not save profile:", error);
                alert("Your profile could not be saved. Please try again.");
            }
        });
    }


    /* =====================================================
       20. INITIALIZE PROFILE PAGE
       ===================================================== */

    renderProfile();
    renderProfileDate();
    renderStatistics();


    /* =====================================================
       21. DEBUG INFORMATION
       ===================================================== */

    console.log("======================================");
    console.log("RESPAIR DAWN - PROFILE");
    console.log("Logged-in user:", user);
    console.log("User role number:", roleNumber);
    console.log("User role name:", roleName);
    console.log("User data:", getSafeUserData());
    console.log("======================================");

});
