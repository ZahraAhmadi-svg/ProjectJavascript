
/* =========================================================
   RESPAIR DAWN
   FAVORITES PAGE
   ========================================================= */


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let allFavorites = [];

let filteredFavorites = [];

let currentFilter = "all";


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFavorites();

    }
);


/* =========================================================
   INITIALIZE PAGE
   ========================================================= */

function initializeFavorites() {

    const user = getCurrentUser();

    if (!user) {
        return;
    }

    setupUserMenu(user);

    loadFavorites();

    setupFilters();

    setupSearch();

    applyFilters();

}


/* =========================================================
   USER MENU
   ========================================================= */

function setupUserMenu(user) {

    const userMenuButton =
        document.getElementById("userMenuButton");

    const userMenu =
        document.getElementById("userMenu");

    const userAvatar =
        document.getElementById("userAvatar");

    const menuUserName =
        document.getElementById("menuUserName");

    const menuUserStatus =
        document.getElementById("menuUserStatus");

    const managementMenuItem =
        document.getElementById("managementMenuItem");

    const logoutButton =
        document.getElementById("logoutButton");


    /* =====================================================
       USER NAME
       ===================================================== */

    if (menuUserName) {

        menuUserName.textContent =
            user.name ||
            user.username ||
            "User";

    }


    /* =====================================================
       USER STATUS
       ===================================================== */

    if (menuUserStatus) {

        menuUserStatus.textContent =
            user.role === "admin"
                ? "Administrator"
                : "Student";

    }


    /* =====================================================
       AVATAR
       ===================================================== */

    if (userAvatar) {

        const name =
            user.name ||
            user.username ||
            "User";

        userAvatar.textContent =
            name.charAt(0).toUpperCase();

    }


    /* =====================================================
       ADMIN MENU
       ===================================================== */

    if (
        managementMenuItem &&
        user.role === "admin"
    ) {

        managementMenuItem.style.display = "block";

    }


    /* =====================================================
       MENU TOGGLE
       ===================================================== */

    if (
        userMenuButton &&
        userMenu
    ) {

        userMenuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    userMenu.classList.toggle("show");

                userMenuButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !userMenu.contains(event.target) &&
                    !userMenuButton.contains(event.target)
                ) {

                    userMenu.classList.remove("show");

                    userMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutUser
        );

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    localStorage.removeItem("respairUser");

    localStorage.removeItem("respairLoggedIn");

    sessionStorage.removeItem(
        "respairAdminAuthenticated"
    );

    window.location.href = "auth.html";

}


/* =========================================================
   LOAD FAVORITES
   ========================================================= */

function loadFavorites() {

    const userData =
        getCurrentUserData();


    if (
        !userData ||
        !Array.isArray(userData.favorites)
    ) {

        allFavorites = [];

        filteredFavorites = [];

        updateFavoriteCount();

        return;

    }


    allFavorites =
        userData.favorites
            .map(normalizeFavorite)
            .filter(Boolean);


    filteredFavorites =
        [...allFavorites];


    updateFavoriteCount();

}


/* =========================================================
   NORMALIZE FAVORITE

   مهم:
   این تابع فقط اطلاعات را برای صفحه Favorites
   آماده می‌کند.

   هیچ چیزی در Training / Stories تغییر نمی‌دهد.
   ========================================================= */

function normalizeFavorite(item) {

    if (!item) {
        return null;
    }


    /* =====================================================
       IF ONLY AN ID WAS SAVED
       ===================================================== */

    if (typeof item === "string") {

        return {

            id: item,

            title: item,

            type: "training",

            category: "Training",

            description:
                "Discover this learning opportunity on Respair Dawn.",

            image:
                "images/training-default.jpg",

            year: "",

            author: ""

        };

    }


    /* =====================================================
       DETERMINE TYPE
       ===================================================== */

    let type =
        item.type ||
        (
            item.storyId
                ? "story"
                : "training"
        );


    type =
        String(type).toLowerCase();


    /* =====================================================
       ONLY ACCEPT OUR TWO FAVORITE TYPES
       ===================================================== */

    if (
        type !== "story" &&
        type !== "training"
    ) {

        type = item.storyId
            ? "story"
            : "training";

    }


    /* =====================================================
       RETURN NORMALIZED COPY

       Important:
       We create a NEW object.
       We do NOT modify the original item.
       ===================================================== */

    return {

        id:
            item.id ||
            item.courseId ||
            item.storyId ||
            item.title ||
            "",

        title:
            item.title ||
            item.name ||
            "Untitled",

        type: type,

        category:
            item.category ||
            (
                type === "story"
                    ? "Inspiring Talk"
                    : "Training"
            ),

        description:
            item.description ||
            "Discover more on Respair Dawn.",

        image:
            item.image ||
            item.thumbnail ||
            (
                type === "story"
                    ? "images/stories/default.jpg"
                    : "images/training-default.jpg"
            ),

        year:
            item.year ||
            "",

        author:
            item.author ||
            ""

    };

}


/* =========================================================
   UPDATE FAVORITE COUNT
   ========================================================= */

function updateFavoriteCount() {

    const countElement =
        document.getElementById("favoriteCount");


    if (countElement) {

        countElement.textContent =
            allFavorites.length;

    }

}


/* =========================================================
   FILTER TABS
   ========================================================= */

function setupFilters() {

    const buttons =
        document.querySelectorAll(".favorite-tab");


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add("active");


                    currentFilter =
                        button.dataset.filter ||
                        "all";


                    applyFilters();

                }
            );

        }
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {

    const searchInput =
        document.getElementById("favoriteSearch");


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            applyFilters();

        }
    );

}


/* =========================================================
   APPLY FILTERS
   ========================================================= */

function applyFilters() {

    const searchInput =
        document.getElementById("favoriteSearch");


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    filteredFavorites =
        allFavorites.filter(
            function (favorite) {

                /* -----------------------------------------
                   TYPE FILTER
                   ----------------------------------------- */

                const matchesFilter =
                    currentFilter === "all" ||
                    favorite.type === currentFilter;


                if (!matchesFilter) {
                    return false;
                }


                /* -----------------------------------------
                   SEARCH
                   ----------------------------------------- */

                if (!searchValue) {
                    return true;
                }


                const title =
                    String(
                        favorite.title || ""
                    ).toLowerCase();


                const category =
                    String(
                        favorite.category || ""
                    ).toLowerCase();


                const description =
                    String(
                        favorite.description || ""
                    ).toLowerCase();


                const author =
                    String(
                        favorite.author || ""
                    ).toLowerCase();


                return (
                    title.includes(searchValue) ||
                    category.includes(searchValue) ||
                    description.includes(searchValue) ||
                    author.includes(searchValue)
                );

            }
        );


    renderFavorites();

}


/* =========================================================
   RENDER FAVORITES
   ========================================================= */

function renderFavorites() {

    const grid =
        document.getElementById("favoritesGrid");

    const emptyState =
        document.getElementById("emptyState");

    const noResultsState =
        document.getElementById("noResultsState");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    /* =====================================================
       NO FAVORITES
       ===================================================== */

    if (allFavorites.length === 0) {

        grid.style.display = "none";


        if (emptyState) {
            emptyState.style.display = "flex";
        }


        if (noResultsState) {
            noResultsState.style.display = "none";
        }


        return;

    }


    /* =====================================================
       NO FILTER RESULTS
       ===================================================== */

    if (filteredFavorites.length === 0) {

        grid.style.display = "none";


        if (emptyState) {
            emptyState.style.display = "none";
        }


        if (noResultsState) {
            noResultsState.style.display = "flex";
        }


        return;

    }


    /* =====================================================
       SHOW GRID
       ===================================================== */

    grid.style.display = "grid";


    if (emptyState) {
        emptyState.style.display = "none";
    }


    if (noResultsState) {
        noResultsState.style.display = "none";
    }


    filteredFavorites.forEach(
        function (favorite) {

            const card =
                createFavoriteCard(favorite);

            grid.appendChild(card);

        }
    );

}


/* =========================================================
   CREATE FAVORITE CARD
   ========================================================= */

function createFavoriteCard(favorite) {

    const card =
        document.createElement("article");


    card.className = "favorite-card";


    const isStory =
        favorite.type === "story";


    card.innerHTML = `

        <div class="favorite-cover">

            <img
                src="${escapeHTML(
                    favorite.image
                )}"
                alt="${escapeHTML(
                    favorite.title
                )}"
            >


            <span class="favorite-type">

                <i class="bi ${
                    isStory
                        ? "bi-chat-quote"
                        : "bi-book"
                }"></i>

                ${
                    isStory
                        ? "Inspiring Talk"
                        : "Training"
                }

            </span>


            <button
                type="button"
                class="favorite-heart-button"
                data-favorite-id="${escapeHTML(
                    favorite.id
                )}"
                aria-label="Remove from favorites"
                title="Remove from favorites"
            >

                <i class="bi bi-heart-fill"></i>

            </button>

        </div>


        <div class="favorite-content">

            <span class="favorite-category">
                ${escapeHTML(
                    favorite.category
                )}
            </span>


            <h3>
                ${escapeHTML(
                    favorite.title
                )}
            </h3>


            <p>
                ${escapeHTML(
                    favorite.description
                )}
            </p>


            ${
                favorite.year
                    ? `
                        <span class="favorite-year">
                            ${escapeHTML(
                                favorite.year
                            )}
                        </span>
                    `
                    : ""
            }


            ${
                favorite.author
                    ? `
                        <span class="favorite-author">
                            ${escapeHTML(
                                favorite.author
                            )}
                        </span>
                    `
                    : ""
            }


            <div class="favorite-footer">

                <button
                    type="button"
                    class="favorite-open-btn"
                >

                    ${
                        isStory
                            ? "Read Story"
                            : "Continue Learning"
                    }

                    <i class="bi bi-arrow-right"></i>

                </button>

            </div>

        </div>

    `;


    /* =====================================================
       REMOVE FROM FAVORITES
       ===================================================== */

    const heartButton =
        card.querySelector(
            ".favorite-heart-button"
        );


    if (heartButton) {

        heartButton.addEventListener(
            "click",
            function () {

                removeFavorite(
                    favorite.id
                );

            }
        );

    }


    /* =====================================================
       OPEN FAVORITE
       ===================================================== */

    const openButton =
        card.querySelector(
            ".favorite-open-btn"
        );


    if (openButton) {

        openButton.addEventListener(
            "click",
            function () {

                openFavorite(favorite);

            }
        );

    }


    return card;

}


/* =========================================================
   REMOVE FAVORITE
   ========================================================= */

function removeFavorite(favoriteId) {

    const userData =
        getCurrentUserData();


    if (!userData) {
        return;
    }


    if (
        !Array.isArray(
            userData.favorites
        )
    ) {

        return;

    }


    userData.favorites =
        userData.favorites.filter(
            function (item) {

                const id =
                    typeof item === "string"
                        ? item
                        : (
                            item.id ||
                            item.courseId ||
                            item.storyId ||
                            item.title
                        );


                return id !== favoriteId;

            }
        );


    saveCurrentUserData(userData);


    loadFavorites();

    applyFilters();

}


/* =========================================================
   OPEN FAVORITE
   ========================================================= */

function openFavorite(favorite) {

    if (!favorite || !favorite.id) {
        return;
    }


    if (favorite.type === "story") {

        window.location.href =
            "story-details.html?id=" +
            encodeURIComponent(
                favorite.id
            );

        return;

    }


    window.location.href =
        "training-details.html?id=" +
        encodeURIComponent(
            favorite.id
        );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

