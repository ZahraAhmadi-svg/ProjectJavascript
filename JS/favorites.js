
/* =========================================================
   RESPAIR DAWN
   FAVORITES PAGE
   ---------------------------------------------------------
   Supports:
   1. Favorite stories
   2. Favorite trainings
   3. Per-user localStorage
   4. Removing favorites
   5. Filtering stories and trainings
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       1. ELEMENTS
    ===================================================== */

    const grid = document.getElementById("favoritesGrid");
    const countElement = document.getElementById("favoritesCount");
    const messageElement = document.getElementById("favoritesMessage");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (!grid || !countElement) {
        return;
    }

    let currentFilter = "all";


    /* =====================================================
       2. SMALL HELPERS
    ===================================================== */

    function readJSON(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);
        } catch (error) {
            console.error("Could not read:", key, error);
            return fallback;
        }
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function normalizeIds(items) {
        if (!Array.isArray(items)) {
            return [];
        }

        return [...new Set(
            items
                .map(item => {
                    if (typeof item === "string" || typeof item === "number") {
                        return String(item);
                    }

                    if (item && item.id !== undefined && item.id !== null) {
                        return String(item.id);
                    }

                    return "";
                })
                .filter(Boolean)
        )];
    }


    /* =====================================================
       3. CURRENT USER
    ===================================================== */

    function getUser() {
        if (typeof window.getCurrentUser === "function") {
            try {
                const user = window.getCurrentUser();

                if (user) {
                    return user;
                }
            } catch (error) {
                console.error("getCurrentUser failed:", error);
            }
        }

        return readJSON("respairUser", null);
    }


    function getUserKey(user) {
        if (!user) {
            return null;
        }

        return String(
            user.id ||
            user.email ||
            user.username ||
            "default-user"
        );
    }


    /* =====================================================
       4. LOAD USER DATA
    ===================================================== */

    function getUserData() {
        /*
           Prefer the existing project helper.
        */

        if (typeof window.getCurrentUserData === "function") {
            try {
                const data = window.getCurrentUserData();

                if (data && typeof data === "object") {
                    data.favorites = normalizeIds(data.favorites);
                    return data;
                }
            } catch (error) {
                console.error("Could not load user data:", error);
            }
        }

        /*
           Fallback to the existing localStorage structure.
        */

        const user = getUser();
        const userKey = getUserKey(user);

        if (!userKey) {
            return null;
        }

        const allData = readJSON("respairUserData", {});

        if (!allData || typeof allData !== "object") {
            return null;
        }

        /*
           Match the user key used by the existing Training code.
        */

        const data = allData[userKey];

        if (!data || typeof data !== "object") {
            return null;
        }

        data.favorites = normalizeIds(data.favorites);
        data.saved = Array.isArray(data.saved) ? data.saved : [];
        data.classes = Array.isArray(data.classes) ? data.classes : [];

        return data;
    }


    /* =====================================================
       5. SAVE USER DATA
    ===================================================== */

    function saveUserData(data) {
        if (!data || typeof data !== "object") {
            return false;
        }

        /*
           Prefer the existing project's save helper.
        */

        if (typeof window.saveCurrentUserData === "function") {
            try {
                const result = window.saveCurrentUserData(data);

                if (result === false) {
                    return false;
                }

                return true;
            } catch (error) {
                console.error("saveCurrentUserData failed:", error);
            }
        }

        /*
           Fallback: save to respairUserData[userKey].
        */

        const user = getUser();
        const userKey = getUserKey(user);

        if (!userKey) {
            return false;
        }

        const allData = readJSON("respairUserData", {});

        if (!allData || typeof allData !== "object") {
            return false;
        }

        allData[userKey] = data;

        try {
            localStorage.setItem(
                "respairUserData",
                JSON.stringify(allData)
            );

            return true;
        } catch (error) {
            console.error("Could not save favorites:", error);
            return false;
        }
    }


    /* =====================================================
       6. GET ALL STORIES
    ===================================================== */

    function getStories() {
        let defaultStories = [];

        /*
           JS/stories.js defines the global stories array.
        */

        try {
            if (typeof stories !== "undefined" && Array.isArray(stories)) {
                defaultStories = stories;
            }
        } catch (error) {
            console.error("Could not read stories:", error);
        }

        /*
           Include stories added by the admin.
        */

        const adminStories = readJSON("respairAdminStories", []);

        const combined = [
            ...defaultStories,
            ...(Array.isArray(adminStories) ? adminStories : [])
        ];

        /*
           Avoid duplicate story IDs.
        */

        const uniqueStories = new Map();

        combined.forEach(story => {
            if (story && story.id !== undefined) {
                uniqueStories.set(String(story.id), story);
            }
        });

        return [...uniqueStories.values()];
    }


    /* =====================================================
       7. GET ALL TRAININGS
    ===================================================== */

    function getTrainings() {
        /*
           The Training system saves its course list here.
        */

        const trainings = readJSON("respairTrainings", []);

        return Array.isArray(trainings) ? trainings : [];
    }


    /* =====================================================
       8. BUILD FAVORITE ITEMS
    ===================================================== */

    function getFavoriteItems() {
        const userData = getUserData();

        if (!userData) {
            return [];
        }

        const favoriteIds = normalizeIds(userData.favorites);

        const allStories = getStories();
        const allTrainings = getTrainings();

        const storyMap = new Map(
            allStories.map(item => [String(item.id), item])
        );

        const trainingMap = new Map(
            allTrainings.map(item => [String(item.id), item])
        );

        const items = [];

        favoriteIds.forEach(id => {
            /*
               First, match against stories.
            */

            if (storyMap.has(id)) {
                const story = storyMap.get(id);

                items.push({
                    id,
                    type: "story",
                    title: story.name || story.title || "Untitled Story",
                    category: story.category || "Inspiring Story",
                    description: story.description || "",
                    image: story.image || "",
                    meta: story.year || "",
                    url: "details.html?id=" + encodeURIComponent(id)
                });

                return;
            }

            /*
               Then, match against training courses.
            */

            if (trainingMap.has(id)) {
                const training = trainingMap.get(id);

                items.push({
                    id,
                    type: "training",
                    title: training.title || "Untitled Training",
                    category: training.category || "Training",
                    description: training.description || "",
                    image: training.image || "",
                    meta: [
                        training.level || "",
                        training.duration || ""
                    ].filter(Boolean).join(" · "),
                    url: "training-details.html?id=" + encodeURIComponent(id)
                });

                return;
            }

            /*
               If a previously favorited item no longer exists in
               the current list, do not display a fake card.
            */
        });

        return items;
    }


    /* =====================================================
       9. CREATE FAVORITE CARD
    ===================================================== */

    function createFavoriteCard(item) {
        const isStory = item.type === "story";

        const typeLabel = isStory ? "Inspiring Story" : "Training";

        const imageHTML = item.image
            ? `
                <img
                    class="favorite-image"
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.title)}"
                    loading="lazy"
                    onerror="this.style.display='none';"
                >
            `
            : `
                <div
                    class="favorite-image d-flex align-items-center justify-content-center"
                    aria-label="No image available"
                >
                    <i class="bi ${isStory ? "bi-book-half" : "bi-mortarboard"}"
                       style="font-size: 3rem; color: #718139;"></i>
                </div>
            `;

        return `
            <article class="favorite-card" data-favorite-id="${escapeHTML(item.id)}">

                <div class="favorite-image-wrap">
                    ${imageHTML}

                    <span class="favorite-type">
                        ${typeLabel}
                    </span>

                    <button
                        type="button"
                        class="favorite-heart"
                        data-remove-favorite="${escapeHTML(item.id)}"
                        aria-label="Remove ${escapeHTML(item.title)} from favorites"
                        title="Remove from favorites"
                    >
                        <i class="bi bi-heart-fill"></i>
                    </button>
                </div>

                <div class="favorite-body">

                    <div class="favorite-category">
                        ${escapeHTML(item.category)}
                    </div>

                    <h3 class="favorite-title">
                        ${escapeHTML(item.title)}
                    </h3>

                    ${
                        item.meta
                            ? `<div class="favorite-meta">${escapeHTML(item.meta)}</div>`
                            : ""
                    }

                    <p class="favorite-description">
                        ${escapeHTML(item.description)}
                    </p>

                    <a class="favorite-link" href="${escapeHTML(item.url)}">
                        ${isStory ? "Read Story" : "View Training"}
                        <i class="bi bi-arrow-right"></i>
                    </a>

                </div>

            </article>
        `;
    }


    /* =====================================================
       10. EMPTY STATE
    ===================================================== */

    function showEmptyState(title, description, showExploreLink = true) {
        grid.innerHTML = `
            <div class="favorites-empty">

                <div class="favorites-empty-icon">
                    <i class="bi bi-heart"></i>
                </div>

                <h3>${escapeHTML(title)}</h3>

                <p>${escapeHTML(description)}</p>

                ${
                    showExploreLink
                        ? `
                            <a href="index.html" class="favorite-link"
                               style="max-width: 220px; margin: 20px auto 0;">
                                Explore Respair Dawn
                                <i class="bi bi-arrow-right"></i>
                            </a>
                        `
                        : ""
                }

            </div>
        `;
    }


    /* =====================================================
       11. RENDER FAVORITES
    ===================================================== */

    function renderFavorites() {
        const user = getUser();

        if (!user) {
            countElement.textContent = "0";

            messageElement.textContent =
                "Sign in to see the favorites saved to your account.";

            showEmptyState(
                "Sign in to view your favorites",
                "Your favorite stories and training courses are connected to your account.",
                false
            );

            grid.innerHTML += `
                <div style="grid-column: 1 / -1; text-align: center;">
                    <a href="login.html" class="favorite-link"
                       style="max-width: 200px; margin: 20px auto;">
                        Sign In
                    </a>
                </div>
            `;

            return;
        }

        const allItems = getFavoriteItems();

        const visibleItems = allItems.filter(item => {
            return currentFilter === "all" || item.type === currentFilter;
        });

        countElement.textContent = String(allItems.length);

        messageElement.textContent = allItems.length
            ? "Your favorite stories and training courses are saved here."
            : "Your collection is currently empty.";

        if (allItems.length === 0) {
            showEmptyState(
                "No favorites yet",
                "Tap the heart on a story or training card to add it to this collection."
            );

            return;
        }

        if (visibleItems.length === 0) {
            showEmptyState(
                currentFilter === "story"
                    ? "No favorite stories"
                    : "No favorite trainings",
                "Choose the heart on an item to add it to this section."
            );

            return;
        }

        grid.innerHTML = visibleItems
            .map(createFavoriteCard)
            .join("");
    }


    /* =====================================================
       12. REMOVE FAVORITE
    ===================================================== */

    function removeFavorite(id) {
        const userData = getUserData();

        if (!userData) {
            messageElement.textContent =
                "Please sign in to manage your favorites.";

            return;
        }

        const normalizedId = String(id);

        userData.favorites = normalizeIds(userData.favorites)
            .filter(favoriteId => favoriteId !== normalizedId);

        if (!saveUserData(userData)) {
            messageElement.textContent =
                "Could not save the change. Please check your browser storage.";

            return;
        }

        messageElement.textContent = "Removed from your favorites.";

        renderFavorites();

        /*
           Notify other page components, if they listen for this event.
        */

        document.dispatchEvent(
            new CustomEvent("respair:favorites-updated", {
                detail: {
                    id: normalizedId
                }
            })
        );
    }


    /* =====================================================
       13. FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter || "all";

            filterButtons.forEach(filterButton => {
                filterButton.classList.toggle(
                    "active",
                    filterButton === button
                );
            });

            renderFavorites();
        });
    });


    /* =====================================================
       14. REMOVE BUTTON EVENTS
    ===================================================== */

    grid.addEventListener("click", event => {
        const button = event.target.closest("[data-remove-favorite]");

        if (!button) {
            return;
        }

        event.preventDefault();

        removeFavorite(button.dataset.removeFavorite);
    });


    /* =====================================================
       15. UPDATE WHEN STORAGE CHANGES
    ===================================================== */

    window.addEventListener("storage", event => {
        if (
            event.key === "respairUser" ||
            event.key === "respairUserData" ||
            event.key === "respairTrainings" ||
            event.key === "respairAdminStories"
        ) {
            renderFavorites();
        }
    });


    /* =====================================================
       16. INITIALIZE
    ===================================================== */

    renderFavorites();

})();
