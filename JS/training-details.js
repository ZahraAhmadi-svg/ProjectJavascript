
/* =========================================================
   RESPAIR DAWN
   TRAINING DETAILS SYSTEM
   ========================================================= */

(() => {
    "use strict";

    const KEYS = {
        saved: "respairSavedTrainings",
        favorites: "respairFavoriteTrainings",
        purchased: "respairPurchasedTrainings"
    };

    const $ = id => document.getElementById(id);

    let currentTraining = null;

    /* =====================================================
       1. STORAGE HELPERS
    ===================================================== */

    function readArray(key) {
        try {
            const result = JSON.parse(localStorage.getItem(key));
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error("Storage read error:", key, error);
            return [];
        }
    }

    function writeArray(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Storage write error:", key, error);
            alert("Your browser could not save this change.");
            return false;
        }
    }


    /* =========================================================
       TRAINING DETAILS — ACCOUNT STORAGE
    ========================================================= */

    
const DETAIL_DATA_FIELDS = {
    respairSavedTrainings: "saved",
    respairFavoriteTrainings: "favorites",
    respairPurchasedTrainings: "classes"
};

    function getDetailUserData() {
        if (typeof window.getCurrentUserData === "function") {
            const data = window.getCurrentUserData();

            if (data && typeof data === "object") {
                return data;
            }
        }

        try {
            const user = JSON.parse(localStorage.getItem("respairUser"));

            if (!user) {
                return null;
            }

            const userId = String(
                user.id || user.email || user.username || "default-user"
            );

            const allData = JSON.parse(
                localStorage.getItem("respairUserData") || "{}"
            );

            if (!allData[userId]) {
                allData[userId] = {
                    classes: [],
                    favorites: [],
                    saved: []
                };
            }

            const data = allData[userId];

            data.classes = Array.isArray(data.classes) ? data.classes : [];
            data.favorites = Array.isArray(data.favorites) ? data.favorites : [];
            data.saved = Array.isArray(data.saved) ? data.saved : [];

            localStorage.setItem("respairUserData", JSON.stringify(allData));

            return data;
        } catch (error) {
            console.error("Could not read account data:", error);
            return null;
        }
    }

    function saveDetailUserData(data) {
        if (!data || typeof data !== "object") {
            return false;
        }

        if (typeof window.saveCurrentUserData === "function") {
            try {
                return window.saveCurrentUserData(data) !== false;
            } catch (error) {
                console.error("Could not save account data:", error);
                return false;
            }
        }

        try {
            const user = JSON.parse(localStorage.getItem("respairUser"));

            if (!user) {
                return false;
            }

            const userId = String(
                user.id || user.email || user.username || "default-user"
            );

            const allData = JSON.parse(
                localStorage.getItem("respairUserData") || "{}"
            );

            allData[userId] = data;

            localStorage.setItem(
                "respairUserData",
                JSON.stringify(allData)
            );

            return true;
        } catch (error) {
            console.error("Could not save account data:", error);
            return false;
        }
    }

    function getIds(key) {
        const field = DETAIL_DATA_FIELDS[key];

        if (!field) {
            return [];
        }

        const data = getDetailUserData();

        if (!data) {
            return [];
        }

        return (Array.isArray(data[field]) ? data[field] : [])
            .map(item => typeof item === "string" ? item : item?.id)
            .filter(Boolean)
            .map(String);
    }

    function isSelected(key, id) {
        return getIds(key).includes(String(id));
    }

    function toggleItem(key, id) {
        const field = DETAIL_DATA_FIELDS[key];
        const data = getDetailUserData();

        if (!field || !data) {
            alert("Please sign in to save trainings to your account.");
            return null;
        }

        const current = Array.isArray(data[field]) ? data[field] : [];
        const ids = current.map(item => {
            return typeof item === "string" ? item : item?.id;
        }).filter(Boolean).map(String);

        const normalizedId = String(id);
        const exists = ids.includes(normalizedId);

        data[field] = exists
            ? ids.filter(itemId => itemId !== normalizedId)
            : [...ids, normalizedId];

        if (!saveDetailUserData(data)) {
            return null;
        }

        return !exists;
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

    function formatPrice(price) {
        const amount = Number(price) || 0;
        return amount === 0 ? "Free" : "$" + amount.toFixed(2);
    }

    /* =====================================================
       2. GET TRAINING DATA
    ===================================================== */

    function getAllTrainings() {
        if (
            window.RespairTrainingAdmin &&
            typeof window.RespairTrainingAdmin.getAll === "function"
        ) {
            return window.RespairTrainingAdmin.getAll();
        }

        try {
            const data = JSON.parse(
                localStorage.getItem("respairTrainings")
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Could not load trainings:", error);
            return [];
        }
    }

    function getTrainingIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }

    /* =====================================================
       3. LEARNING OUTCOMES
    ===================================================== */

    function getLearningOutcomes(training) {
        const category = String(training.category || "").toLowerCase();

        if (category.includes("cybersecurity")) {
            return [
                "Understand essential security concepts and terminology.",
                "Recognize common security risks and weaknesses.",
                "Explore practical methods for improving digital security.",
                "Build a foundation for further cybersecurity study."
            ];
        }

        if (category.includes("artificial intelligence")) {
            return [
                "Understand the main concepts and applications of AI.",
                "Explore the tools and methods used in this field.",
                "Learn how to approach problems systematically.",
                "Identify possible practical projects for further learning."
            ];
        }

        if (category.includes("data science")) {
            return [
                "Understand how data is collected and organized.",
                "Explore techniques for working with datasets.",
                "Practice interpreting information and identifying patterns.",
                "Build a foundation for more advanced data projects."
            ];
        }

        if (category.includes("design")) {
            return [
                "Understand core visual design principles.",
                "Explore layout, typography, color, and usability.",
                "Practice communicating ideas through design.",
                "Develop a foundation for a design portfolio."
            ];
        }

        if (category.includes("professional skills")) {
            return [
                "Understand the core skills covered in this training.",
                "Practice organizing tasks and communicating clearly.",
                "Apply practical methods to study or work situations.",
                "Create an action plan for continued improvement."
            ];
        }

        return [
            "Understand the fundamental concepts of this subject.",
            "Learn important terminology and core techniques.",
            "Practice applying concepts through examples and exercises.",
            "Build a foundation for more advanced projects."
        ];
    }

    /* =====================================================
       4. RENDER TRAINING INFORMATION
    ===================================================== */

    function renderTraining(training) {
        $("breadcrumbTrainingTitle").textContent = training.title;
        $("detailCategory").textContent = training.category;
        $("detailTitle").textContent = training.title;
        $("detailDescription").textContent = training.description || "";
        $("detailLevel").textContent = training.level || "Beginner";
        $("detailDuration").textContent = training.duration || "Self-paced";

        const lessonCount = Number(training.lessons) || 0;

        $("detailLessons").textContent =
            `${lessonCount} ${lessonCount === 1 ? "lesson" : "lessons"}`;

        $("detailImage").src = training.image || "";
        $("detailImage").alt = training.title;

        $("detailImage").onerror = function () {
            this.style.display = "none";
        };

        $("detailPrice").textContent = formatPrice(training.price);

        $("detailAbout").textContent = training.description ||
            "Explore this training and develop new skills at your own pace.";

        $("detailAudience").textContent =
            `This training is designed for learners at the ${training.level || "Beginner"
            } level who want to develop their knowledge of ${training.category
            }. Review the lessons, practice regularly, and progress at your own pace.`;

        $("includeLessons").textContent =
            `${lessonCount} lessons`;

        $("includeDuration").textContent =
            training.duration || "Self-paced";

        $("includeLevel").textContent =
            training.level || "Beginner";

        const learningList = $("detailLearningList");

        learningList.replaceChildren();

        getLearningOutcomes(training).forEach(outcome => {
            const item = document.createElement("li");
            const icon = document.createElement("i");
            const text = document.createElement("span");

            icon.className = "bi bi-check-circle-fill";
            text.textContent = outcome;

            item.append(icon, text);
            learningList.appendChild(item);
        });

        updateActionButtons();
    }

    /* =====================================================
       5. UPDATE SAVE, FAVORITE, ENROLL BUTTONS
    ===================================================== */

    function updateActionButtons() {
        if (!currentTraining) {
            return;
        }

        const id = String(currentTraining.id);

        const saved = isSelected(KEYS.saved, id);
        const favorite = isSelected(KEYS.favorites, id);
        const purchased = isSelected(KEYS.purchased, id);

        const saveButton = $("detailSaveButton");
        const favoriteButton = $("detailFavoriteButton");
        const enrollButton = $("detailEnrollButton");

        saveButton.classList.toggle("is-active", saved);
        saveButton.setAttribute("aria-pressed", String(saved));
        saveButton.innerHTML = saved
            ? '<i class="bi bi-bookmark-fill"></i><span>Saved Training</span>'
            : '<i class="bi bi-bookmark"></i><span>Save Training</span>';

        favoriteButton.classList.toggle("is-favorite", favorite);
        favoriteButton.setAttribute("aria-pressed", String(favorite));
        favoriteButton.innerHTML = favorite
            ? '<i class="bi bi-heart-fill"></i><span>Added to Favorites</span>'
            : '<i class="bi bi-heart"></i><span>Add to Favorites</span>';

        enrollButton.disabled = false;

        enrollButton.innerHTML = purchased
            ? '<i class="bi bi-check-circle-fill"></i><span>Already Enrolled</span>'
            : '<i class="bi bi-arrow-right-circle"></i><span>Enroll Now</span>';
    }

    /* =====================================================
       6. USER CHECK
    ===================================================== */

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem("respairUser"));
        } catch (error) {
            return null;
        }
    }

    /* =====================================================
       7. SAVE TRAINING
    ===================================================== */

    function handleSave() {
        if (!currentTraining) {
            return;
        }

        const result = toggleItem(
            KEYS.saved,
            currentTraining.id
        );

        if (result === null) {
            return;
        }

        updateActionButtons();

        document.dispatchEvent(new CustomEvent(
            "respair:training-updated",
            {
                detail: {
                    action: "save",
                    id: String(currentTraining.id),
                    active: result
                }
            }
        ));
    }

    /* =====================================================
       8. FAVORITE TRAINING
    ===================================================== */

    function handleFavorite() {
        if (!currentTraining) {
            return;
        }

        const result = toggleItem(
            KEYS.favorites,
            currentTraining.id
        );

        if (result === null) {
            return;
        }

        updateActionButtons();

        document.dispatchEvent(new CustomEvent(
            "respair:training-updated",
            {
                detail: {
                    action: "favorite",
                    id: String(currentTraining.id),
                    active: result
                }
            }
        ));
    }

    /* =====================================================
       9. DEMO ENROLLMENT
    ===================================================== */


/* =========================================================
   ENROLLMENT — REDIRECT TO DEMO PAYMENT PAGE
   ========================================================= */

function handleEnrollment() {
    if (!currentTraining) {
        return;
    }

    const id = String(currentTraining.id);

    // Check whether the user is signed in.
    if (!getDetailUserData()) {
        const redirectUrl =
            "training-details.html?id=" +
            encodeURIComponent(id);

        window.location.href =
            "login.html?redirect=" +
            encodeURIComponent(redirectUrl);

        return;
    }

    // Do not enroll the same user twice.
    if (isSelected("purchased", id)) {
        alert("You are already enrolled in this training.");
        return;
    }

    // Send the user to the payment page.
    window.location.href =
        "payment.html?id=" + encodeURIComponent(id);
}
    /* =====================================================
       10. SHOW ERROR
    ===================================================== */

    function showNotFound() {
        $("trainingDetailsLoading").hidden = true;
        $("trainingDetailsContent").hidden = true;
        $("trainingDetailsError").hidden = false;

        document.title = "Training Not Found | Respair Dawn";
    }

    /* =====================================================
       11. INITIALIZE DETAILS PAGE
    ===================================================== */

    function initializeDetailsPage() {
        const id = getTrainingIdFromURL();

        if (!id) {
            showNotFound();
            return;
        }

        const training = getAllTrainings().find(
            item => String(item.id) === String(id)
        );

        if (!training) {
            showNotFound();
            return;
        }

        currentTraining = training;

        document.title =
            `${training.title} | Respair Dawn`;

        renderTraining(training);

        $("detailSaveButton").addEventListener(
            "click",
            handleSave
        );

        $("detailFavoriteButton").addEventListener(
            "click",
            handleFavorite
        );

        $("detailEnrollButton").addEventListener(
            "click",
            handleEnrollment
        );

        $("trainingDetailsLoading").hidden = true;
        $("trainingDetailsError").hidden = true;
        $("trainingDetailsContent").hidden = false;

        /*
         * Refresh the displayed state if another open tab
         * changes the training data or enrollment state.
         */
        window.addEventListener("storage", event => {
            if (
                event.key === "respairTrainings" ||
                Object.values(KEYS).includes(event.key)
            ) {
                if (event.key === "respairTrainings") {
                    const updatedTraining = getAllTrainings().find(
                        item => String(item.id) === String(id)
                    );

                    if (!updatedTraining) {
                        showNotFound();
                        return;
                    }

                    currentTraining = updatedTraining;
                    renderTraining(currentTraining);
                } else {
                    updateActionButtons();
                }
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeDetailsPage,
            { once: true }
        );
    } else {
        initializeDetailsPage();
    }

})();