
/* =========================================================
   RESPAIR DAWN
   AUTHENTICATION GUARD
   ---------------------------------------------------------
   Role system:
   0 = User
   1 = Manager
   2 = Editor
   3 = Administrator
   ========================================================= */

"use strict";


/* =========================================================
   1. NORMALIZE USER ROLE
   ========================================================= */

function normalizeUserRole(role) {
    if (
        typeof role === "number" &&
        Number.isInteger(role) &&
        role >= 0 &&
        role <= 3
    ) {
        return role;
    }

    const value = String(role ?? "").trim().toLowerCase();

    if (["0", "1", "2", "3"].includes(value)) {
        return Number(value);
    }

    const roles = {
        user: 0,
        student: 0,
        member: 0,
        manager: 1,
        editor: 2,
        admin: 3,
        administrator: 3
    };

    return Object.prototype.hasOwnProperty.call(roles, value)
        ? roles[value]
        : 0;
}


/* =========================================================
   2. CHECK LOGIN STATUS
   Uses getCurrentUser() from auth-core.js.
   ========================================================= */

function isLoggedIn() {
    if (typeof getCurrentUser !== "function") {
        console.error(
            "getCurrentUser() is missing. Load auth-core.js first."
        );
        return false;
    }

    return getCurrentUser() !== null;
}


/* =========================================================
   3. REQUIRE LOGIN
   ========================================================= */

function requireLogin() {
    const user = getCurrentUser();

    if (!user) {
        const currentPage =
            window.location.pathname.split("/").pop() ||
            "index.html";

        const redirectUrl =
            "login.html?redirect=" +
            encodeURIComponent(currentPage);

        window.location.replace(redirectUrl);
        return false;
    }

    return true;
}


/* =========================================================
   4. MANAGEMENT PERMISSIONS
   Manager and Administrator only.
   ========================================================= */

function hasManagementAccess(user = getCurrentUser()) {
    if (!user) {
        return false;
    }

    const role = normalizeUserRole(user.role);

    return role === 1 || role === 3;
}


/* =========================================================
   5. REQUIRE MANAGER OR ADMINISTRATOR
   ========================================================= */

function requireAdmin() {
    const user = getCurrentUser();

    if (!user) {
        window.location.replace(
            "login.html?redirect=" +
            encodeURIComponent("management.html")
        );

        return false;
    }

    if (!hasManagementAccess(user)) {
        window.location.replace("index.html");
        return false;
    }

    return true;
}


/* =========================================================
   6. REQUIRE EDITOR OR HIGHER
   ========================================================= */

function requireEditor() {
    const user = getCurrentUser();

    if (!user) {
        window.location.replace(
            "login.html?redirect=" +
            encodeURIComponent("index.html")
        );

        return false;
    }

    const role = normalizeUserRole(user.role);

    if (![1, 2, 3].includes(role)) {
        window.location.replace("index.html");
        return false;
    }

    return true;
}


/* =========================================================
   7. GET CURRENT USER ROLE
   ========================================================= */

function getCurrentUserRole() {
    const user = getCurrentUser();

    return user ? normalizeUserRole(user.role) : null;
}


/* =========================================================
   8. AUTOMATIC LOGIN CHECK
   This file must only be loaded on protected pages.
   ========================================================= */

requireLogin();
