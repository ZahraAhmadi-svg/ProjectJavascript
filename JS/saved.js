
/* =========================================================
   RESPAIR DAWN — SAVED STORIES AND TRAININGS
   Shared saved IDs: currentUserData.saved
   ========================================================= */

(function () {
    "use strict";

    const USER_KEY = "respairUser";
    const USER_DATA_KEY = "respairUserData";
    const TRAININGS_KEY = "respairTrainings";

    const state = {
        filter: "all",
        stories: [],
        trainings: []
    };

    const el = {
        loginNotice: document.getElementById("savedLoginNotice"),
        collection: document.getElementById("savedCollection"),
        grid: document.getElementById("savedItemsGrid"),
        empty: document.getElementById("savedEmptyState"),
        emptyTitle: document.getElementById("savedEmptyTitle"),
        emptyDescription: document.getElementById("savedEmptyDescription"),
        total: document.getElementById("savedTotalCount"),
        allCount: document.getElementById("savedAllCount"),
        storyCount: document.getElementById("savedStoriesCount"),
        trainingCount: document.getElementById("savedTrainingsCount"),
        status: document.getElementById("savedStatusMessage"),
        year: document.getElementById("savedYear")
    };

    if (el.year) {
        el.year.textContent = new Date().getFullYear();
    }

    /* -----------------------------------------------------
       1. Current user
       ----------------------------------------------------- */

    function getCurrentUser() {
        try {
            if (typeof window.getCurrentUser === "function") {
                const user = window.getCurrentUser();
                if (user) return user;
            }

            const raw = localStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error("Saved: could not read current user.", error);
            return null;
        }
    }

    function getUserStorageId(user) {
        if (!user) return null;

        return String(
            user.id ||
            user.email ||
            user.username ||
            "default-user"
        );
    }

    /* -----------------------------------------------------
       2. Current user's data
       Prefer the project's existing helper functions.
       ----------------------------------------------------- */

    function getCurrentUserData() {
        try {
            if (typeof window.getCurrentUserData === "function") {
                const data = window.getCurrentUserData();

                if (data && typeof data === "object") {
                    return data;
                }
            }

            const user = getCurrentUser();

            if (!user) return null;

            const raw = localStorage.getItem(USER_DATA_KEY);
            const allData = raw ? JSON.parse(raw) : {};
            const id = getUserStorageId(user);

            if (
                allData[id] &&
                typeof allData[id] === "object"
            ) {
                return allData[id];
            }

            // Support a directly stored user-data object.
            if (
                Array.isArray(allData.saved) ||
                Array.isArray(allData.favorites) ||
                Array.isArray(allData.classes)
            ) {
                return allData;
            }

            return {
                saved: [],
                favorites: [],
                classes: []
            };
        } catch (error) {
            console.error("Saved: could not read user data.", error);
            return null;
        }
    }

    function saveCurrentUserData(data) {
        try {
            if (typeof window.saveCurrentUserData === "function") {
                window.saveCurrentUserData(data);
                return true;
            }

            const user = getCurrentUser();

            if (!user) return false;

            const id = getUserStorageId(user);
            const raw = localStorage.getItem(USER_DATA_KEY);
            const allData = raw ? JSON.parse(raw) : {};

            if (
                allData[id] &&
                typeof allData[id] === "object"
            ) {
                allData[id] = {
                    ...allData[id],
                    ...data
                };
            } else if (
                Array.isArray(allData.saved) ||
                Array.isArray(allData.favorites) ||
                Array.isArray(allData.classes)
            ) {
                Object.assign(allData, data);
            } else {
                allData[id] = { ...data };
            }

            localStorage.setItem(
                USER_DATA_KEY,
                JSON.stringify(allData)
            );

            return true;
        } catch (error) {
            console.error("Saved: could not save user data.", error);
            return false;
        }
    }

    /* -----------------------------------------------------
       3. ID and HTML helpers
       ----------------------------------------------------- */

    function getId(item) {
        if (item === null || item === undefined) return "";

        if (typeof item === "object") {
            return String(item.id || "");
        }

        return String(item);
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function safeImage(value, fallback) {
        const url = String(value || "").trim();

        // Only permit normal HTTP(S) image URLs.
        if (/^https?:\/\//i.test(url)) {
            return url;
        }

        return fallback;
    }

    const STORY_FALLBACK =
        "https://placehold.co/800x500/eaf5f3/367d7a?text=Inspiring+Story";

    const TRAINING_FALLBACK =
        "https://placehold.co/800x500/eaf5f3/367d7a?text=Training+Course";

    /* -----------------------------------------------------
       4. Load stories from stories.js
       ----------------------------------------------------- */

    function getAllStories() {
        try {
            if (typeof window.getAllStories === "function") {
                const result = window.getAllStories();

                if (Array.isArray(result)) {
                    return result;
                }
            }

            if (Array.isArray(window.stories)) {
                return window.stories;
            }
        } catch (error) {
            console.error("Saved: could not load stories.", error);
        }

        return [];
    }

    /* -----------------------------------------------------
       5. Load trainings
       The training page should initialize respairTrainings.
       ----------------------------------------------------- */

    function getAllTrainings() {
        try {
            const raw = localStorage.getItem(TRAININGS_KEY);

            if (raw) {
                const parsed = JSON.parse(raw);

                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }

            if (Array.isArray(window.respairTrainings)) {
                return window.respairTrainings;
            }

            if (Array.isArray(window.trainings)) {
                return window.trainings;
            }
        } catch (error) {
            console.error("Saved: could not load trainings.", error);
        }

        return [];
    }

    /* -----------------------------------------------------
       6. Get saved records
       ----------------------------------------------------- */

    function getSavedRecords() {
        const data = getCurrentUserData();

        if (!data || !Array.isArray(data.saved)) {
            return {
                stories: [],
                trainings: []
            };
        }

        const savedIds = new Set(
            data.saved.map(getId).filter(Boolean)
        );

        const stories = getAllStories().filter(function (story) {
            return savedIds.has(getId(story.id));
        });

        const trainings = getAllTrainings().filter(function (training) {
            return savedIds.has(getId(training.id));
        });

        return { stories, trainings };
    }

    /* -----------------------------------------------------
       7. Build story cards
       ----------------------------------------------------- */

    function buildStoryCard(story) {
        const id = getId(story.id);
        const title = story.title || story.name || "Inspiring Story";
        const category = story.category || "Inspiring Talk";
        const description =
            story.description ||
            story.summary ||
            story.quote ||
            story.content ||
            "Discover this inspiring story.";

        const image = safeImage(
            story.image || story.imageUrl || story.photo,
            STORY_FALLBACK
        );

        const detailsUrl =
            "details.html?id=" + encodeURIComponent(id);

        return `
            <div class="col-12 col-md-6 col-xl-4">
                <article class="saved-item-card">
                    <div class="saved-item-image-wrap">
                        <img
                            class="saved-item-image"
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(title)}"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='${STORY_FALLBACK}'"
                        >

                        <span class="saved-item-type">
                            <i class="bi bi-book-half"></i>
                            Story
                        </span>
                    </div>

                    <div class="saved-item-body">
                        <span class="saved-item-category">
                            ${escapeHTML(category)}
                        </span>

                        <h3 class="saved-item-title">
                            ${escapeHTML(title)}
                        </h3>

                        <p class="saved-item-description">
                            ${escapeHTML(description)}
                        </p>

                        <div class="saved-item-actions">
                            <a
                                class="saved-button saved-button-primary"
                                href="${detailsUrl}"
                            >
                                Read Story
                                <i class="bi bi-arrow-up-right"></i>
                            </a>

                            <button
                                type="button"
                                class="saved-remove-button"
                                data-remove-saved
                                data-item-type="story"
                                data-item-id="${escapeHTML(id)}"
                            >
                                <i class="bi bi-bookmark-x"></i>
                                Remove
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }

    /* -----------------------------------------------------
       8. Build training cards
       ----------------------------------------------------- */

    function buildTrainingCard(training) {
        const id = getId(training.id);
        const title = training.title || "Training Course";
        const category = training.category || "Training";
        const description =
            training.description ||
            training.summary ||
            "Explore this course and continue developing your skills.";

        const image = safeImage(
            training.image || training.imageUrl,
            TRAINING_FALLBACK
        );

        const level = training.level || "";
        const duration = training.duration || "";

        const detailsUrl =
            "training-details.html?id=" + encodeURIComponent(id);

        return `
            <div class="col-12 col-md-6 col-xl-4">
                <article class="saved-item-card">
                    <div class="saved-item-image-wrap">
                        <img
                            class="saved-item-image"
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(title)}"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='${TRAINING_FALLBACK}'"
                        >

                        <span class="saved-item-type">
                            <i class="bi bi-mortarboard"></i>
                            Training
                        </span>
                    </div>

                    <div class="saved-item-body">
                        <span class="saved-item-category">
                            ${escapeHTML(category)}
                        </span>

                        <h3 class="saved-item-title">
                            ${escapeHTML(title)}
                        </h3>

                        <div class="saved-item-meta">
                            ${level ? `
                                <span>
                                    <i class="bi bi-bar-chart"></i>
                                    ${escapeHTML(level)}
                                </span>
                            ` : ""}

                            ${duration ? `
                                <span>
                                    <i class="bi bi-clock"></i>
                                    ${escapeHTML(duration)}
                                </span>
                            ` : ""}
                        </div>

                        <p class="saved-item-description">
                            ${escapeHTML(description)}
                        </p>

                        <div class="saved-item-actions">
                            <a
                                class="saved-button saved-button-primary"
                                href="${detailsUrl}"
                            >
                                View Course
                                <i class="bi bi-arrow-up-right"></i>
                            </a>

                            <button
                                type="button"
                                class="saved-remove-button"
                                data-remove-saved
                                data-item-type="training"
                                data-item-id="${escapeHTML(id)}"
                            >
                                <i class="bi bi-bookmark-x"></i>
                                Remove
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }

    /* -----------------------------------------------------
       9. Render page and filters
       ----------------------------------------------------- */

    function renderPage() {
        const user = getCurrentUser();

        if (!user) {
            if (el.loginNotice) el.loginNotice.hidden = false;
            if (el.collection) el.collection.hidden = true;
            return;
        }

        if (el.loginNotice) el.loginNotice.hidden = true;
        if (el.collection) el.collection.hidden = false;

        const records = getSavedRecords();

        state.stories = records.stories;
        state.trainings = records.trainings;

        const total =
            state.stories.length + state.trainings.length;

        if (el.total) el.total.textContent = total;
        if (el.allCount) el.allCount.textContent = total;
        if (el.storyCount) {
            el.storyCount.textContent = state.stories.length;
        }
        if (el.trainingCount) {
            el.trainingCount.textContent = state.trainings.length;
        }

        let items = [];

        if (state.filter === "story") {
            items = state.stories.map(function (item) {
                return { type: "story", item };
            });
        } else if (state.filter === "training") {
            items = state.trainings.map(function (item) {
                return { type: "training", item };
            });
        } else {
            items = [
                ...state.stories.map(function (item) {
                    return { type: "story", item };
                }),
                ...state.trainings.map(function (item) {
                    return { type: "training", item };
                })
            ];
        }

        if (el.grid) {
            el.grid.innerHTML = items.map(function (record) {
                return record.type === "story"
                    ? buildStoryCard(record.item)
                    : buildTrainingCard(record.item);
            }).join("");
        }

        if (el.empty) {
            el.empty.hidden = items.length !== 0;
        }

        if (el.emptyTitle && el.emptyDescription) {
            if (state.filter === "story") {
                el.emptyTitle.textContent = "No saved stories yet.";
                el.emptyDescription.textContent =
                    "Open Inspiring Talks and click the bookmark icon on a story.";
            } else if (state.filter === "training") {
                el.emptyTitle.textContent = "No saved trainings yet.";
                el.emptyDescription.textContent =
                    "Explore Trainings and click the bookmark icon on a course.";
            } else {
                el.emptyTitle.textContent = "Your collection is waiting.";
                el.emptyDescription.textContent =
                    "Bookmark a story or training course, and it will appear here.";
            }
        }

        document.querySelectorAll("[data-filter]").forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.filter === state.filter
            );
        });
    }

    /* -----------------------------------------------------
       10. Filter buttons
       ----------------------------------------------------- */

    document.addEventListener("click", function (event) {
        const filterButton = event.target.closest("[data-filter]");

        if (!filterButton) return;

        state.filter = filterButton.dataset.filter || "all";
        renderPage();
    });

    /* -----------------------------------------------------
       11. Remove only from the saved list
       This does not remove favorites or enrolled classes.
       ----------------------------------------------------- */

    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-remove-saved]");

        if (!button) return;

        const id = button.dataset.itemId;

        if (!id) return;

        const data = getCurrentUserData();

        if (!data) return;

        if (!Array.isArray(data.saved)) {
            data.saved = [];
        }

        data.saved = data.saved.filter(function (item) {
            return getId(item) !== String(id);
        });

        if (saveCurrentUserData(data)) {
            if (el.status) {
                el.status.textContent = "Item removed from Saved.";
            }

            renderPage();
        } else if (el.status) {
            el.status.textContent =
                "The item could not be removed. Please try again.";
        }
    });

    /* -----------------------------------------------------
       12. Refresh after changes in another browser tab
       ----------------------------------------------------- */

    window.addEventListener("storage", function (event) {
        if (
            event.key === USER_KEY ||
            event.key === USER_DATA_KEY ||
            event.key === TRAININGS_KEY
        ) {
            renderPage();
        }
    });

    /* -----------------------------------------------------
       13. Initial render
       ----------------------------------------------------- */

    renderPage();

})();
