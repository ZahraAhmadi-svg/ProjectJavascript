
/* =========================================================
   RESPAIR DAWN
   TRAININGS SYSTEM
   ========================================================= */

/*
   امکانات:
   1. نمایش 8 آموزش در هر صفحه
   2. نمایش 24 آموزش پیش‌فرض
   3. جست‌وجو و فیلتر دسته‌بندی
   4. صفحه‌بندی و تغییر خودکار صفحه
   5. ذخیره آموزش‌ها
   6. علاقه‌مندی آموزش‌ها
   7. خرید آزمایشی آموزش‌ها
   8. API برای مدیریت آموزش‌ها در آینده
*/

(() => {
    "use strict";

    /* =====================================================
       1. SETTINGS
    ===================================================== */

    const STORAGE_KEYS = {
        trainings: "respairTrainings",
        saved: "respairSavedTrainings",
        favorites: "respairFavoriteTrainings",
        purchased: "respairPurchasedTrainings"
    };


    /* =========================================================
       PAGE-SPECIFIC TRAINING SLIDER SETTINGS
       ========================================================= */

    const trainingIsHomePage =
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/index.html");

    const ITEMS_PER_PAGE = trainingIsHomePage ? 4 : 8;
    const AUTO_CHANGE_INTERVAL = trainingIsHomePage ? 5000 : 6000;

    /* =====================================================
       2. DEFAULT TRAININGS — 24 ITEMS
    ===================================================== */

    const defaultTrainings = [
        {
            id: "html-css-fundamentals",
            title: "HTML & CSS Fundamentals",
            category: "Web Development",
            level: "Beginner",
            duration: "4 weeks",
            price: 0,
            lessons: 18,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
            description: "Learn the foundations of web development and build your first responsive web pages."
        },
        {
            id: "javascript-essentials",
            title: "JavaScript Essentials",
            category: "Web Development",
            level: "Beginner",
            duration: "6 weeks",
            price: 19,
            lessons: 24,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
            description: "Understand variables, functions, arrays, objects, and interactive web development."
        },
        {
            id: "python-programming",
            title: "Python Programming",
            category: "Programming",
            level: "Beginner",
            duration: "8 weeks",
            price: 25,
            lessons: 32,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
            description: "Start programming with Python through practical examples and small projects."
        },
        {
            id: "c-programming",
            title: "C Programming from Zero",
            category: "Programming",
            level: "Beginner",
            duration: "7 weeks",
            price: 22,
            lessons: 28,
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
            description: "Learn C syntax, conditions, loops, functions, arrays, and pointers step by step."
        },
        {
            id: "java-fundamentals",
            title: "Java Fundamentals",
            category: "Programming",
            level: "Beginner",
            duration: "8 weeks",
            price: 25,
            lessons: 30,
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
            description: "Build a strong foundation in Java programming and object-oriented concepts."
        },
        {
            id: "data-structures",
            title: "Data Structures & Algorithms",
            category: "Programming",
            level: "Intermediate",
            duration: "8 weeks",
            price: 29,
            lessons: 30,
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
            description: "Explore arrays, linked lists, stacks, queues, trees, searching, and sorting."
        },
        {
            id: "sql-database",
            title: "SQL & Database Basics",
            category: "Data Science",
            level: "Beginner",
            duration: "5 weeks",
            price: 18,
            lessons: 20,
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
            description: "Learn database design, SQL queries, filtering, joins, and data organization."
        },
        {
            id: "data-analysis",
            title: "Data Analysis with Python",
            category: "Data Science",
            level: "Intermediate",
            duration: "7 weeks",
            price: 27,
            lessons: 26,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
            description: "Analyze datasets, clean data, and discover useful patterns with Python."
        },
        {
            id: "machine-learning",
            title: "Introduction to Machine Learning",
            category: "Artificial Intelligence",
            level: "Intermediate",
            duration: "8 weeks",
            price: 35,
            lessons: 28,
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
            description: "Discover machine learning concepts, datasets, model training, and evaluation."
        },
        {
            id: "ai-fundamentals",
            title: "Artificial Intelligence Basics",
            category: "Artificial Intelligence",
            level: "Beginner",
            duration: "5 weeks",
            price: 24,
            lessons: 20,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
            description: "Understand AI concepts, common applications, and responsible AI practices."
        },
        {
            id: "deep-learning",
            title: "Deep Learning Introduction",
            category: "Artificial Intelligence",
            level: "Intermediate",
            duration: "9 weeks",
            price: 39,
            lessons: 32,
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80",
            description: "Explore neural networks and the foundations of modern deep learning."
        },
        {
            id: "cybersecurity-basics",
            title: "Cybersecurity Fundamentals",
            category: "Cybersecurity",
            level: "Beginner",
            duration: "6 weeks",
            price: 26,
            lessons: 22,
            image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80",
            description: "Learn security principles, common threats, safe practices, and risk awareness."
        },
        {
            id: "network-security",
            title: "Network Security Essentials",
            category: "Cybersecurity",
            level: "Intermediate",
            duration: "7 weeks",
            price: 32,
            lessons: 26,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
            description: "Study network protection, access control, firewalls, and security monitoring."
        },
        {
            id: "cryptography-basics",
            title: "Introduction to Cryptography",
            category: "Cybersecurity",
            level: "Intermediate",
            duration: "6 weeks",
            price: 30,
            lessons: 24,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
            description: "Understand encryption, hashing, digital signatures, and cryptographic principles."
        },
        {
            id: "ui-ux-design",
            title: "UI/UX Design Fundamentals",
            category: "Design",
            level: "Beginner",
            duration: "5 weeks",
            price: 21,
            lessons: 20,
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
            description: "Learn user-centered design, wireframes, visual hierarchy, and usability."
        },
        {
            id: "graphic-design",
            title: "Graphic Design Essentials",
            category: "Design",
            level: "Beginner",
            duration: "6 weeks",
            price: 23,
            lessons: 22,
            image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80",
            description: "Explore composition, typography, color theory, and visual communication."
        },
        {
            id: "responsive-bootstrap",
            title: "Responsive Design with Bootstrap",
            category: "Web Development",
            level: "Beginner",
            duration: "4 weeks",
            price: 17,
            lessons: 16,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
            description: "Create responsive layouts with Bootstrap components and its grid system."
        },
        {
            id: "git-github",
            title: "Git & GitHub for Beginners",
            category: "Programming",
            level: "Beginner",
            duration: "3 weeks",
            price: 0,
            lessons: 12,
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=900&q=80",
            description: "Learn version control, repositories, commits, branches, and collaboration."
        },
        {
            id: "professional-communication",
            title: "Professional Communication",
            category: "Professional Skills",
            level: "Beginner",
            duration: "4 weeks",
            price: 15,
            lessons: 14,
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
            description: "Improve workplace communication, teamwork, listening, and presentation skills."
        },
        {
            id: "time-management",
            title: "Time Management & Productivity",
            category: "Professional Skills",
            level: "Beginner",
            duration: "3 weeks",
            price: 12,
            lessons: 10,
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
            description: "Plan your goals, organize tasks, and build sustainable study habits."
        },
        {
            id: "career-development",
            title: "Career Development for Students",
            category: "Professional Skills",
            level: "Beginner",
            duration: "4 weeks",
            price: 16,
            lessons: 12,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
            description: "Prepare a CV, explore career paths, and build a professional portfolio."
        },
        {
            id: "public-speaking",
            title: "Public Speaking & Presentation",
            category: "Professional Skills",
            level: "Beginner",
            duration: "4 weeks",
            price: 14,
            lessons: 12,
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
            description: "Develop confidence, structure presentations, and communicate ideas clearly."
        },
        {
            id: "api-web-development",
            title: "APIs & Web Integration",
            category: "Web Development",
            level: "Intermediate",
            duration: "5 weeks",
            price: 24,
            lessons: 18,
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
            description: "Understand HTTP requests, JSON data, APIs, and connecting web applications."
        },
        {
            id: "research-skills",
            title: "Research Skills for Students",
            category: "Professional Skills",
            level: "Beginner",
            duration: "3 weeks",
            price: 0,
            lessons: 10,
            image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
            description: "Learn to find credible sources, organize evidence, and present research clearly."
        }
    ];

    /* =====================================================
       3. STORAGE HELPERS
    ===================================================== */

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.error("Could not read storage:", key, error);
            return [];
        }
    }

    function writeArray(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Could not save storage:", key, error);
            alert("Your browser could not save this change.");
            return false;
        }
    }

    function initializeStorage() {
        try {
            const existing = localStorage.getItem(STORAGE_KEYS.trainings);

            if (existing === null) {
                writeArray(STORAGE_KEYS.trainings, defaultTrainings);
                return;
            }

            const parsed = JSON.parse(existing);

            if (!Array.isArray(parsed)) {
                writeArray(STORAGE_KEYS.trainings, defaultTrainings);
            }
        } catch (error) {
            console.error("Training storage initialization failed:", error);
            writeArray(STORAGE_KEYS.trainings, defaultTrainings);
        }
    }

    function getAllTrainings() {
        initializeStorage();
        return readArray(STORAGE_KEYS.trainings);
    }

    /* =========================================================
       USER-SPECIFIC TRAINING STORAGE
       
    ========================================================= */

    const TRAINING_DATA_FIELDS = {
        respairSavedTrainings: "saved",
        respairFavoriteTrainings: "favorites",
        respairPurchasedTrainings: "classes"
    };

    function getTrainingUserData() {
        // Use the existing account helper when available.
        if (typeof window.getCurrentUserData === "function") {
            const data = window.getCurrentUserData();

            if (data && typeof data === "object") {
                return data;
            }
        }

        // Fallback to the existing per-user storage structure.
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

                localStorage.setItem(
                    "respairUserData",
                    JSON.stringify(allData)
                );
            }

            const data = allData[userId];

            data.classes = Array.isArray(data.classes) ? data.classes : [];
            data.favorites = Array.isArray(data.favorites) ? data.favorites : [];
            data.saved = Array.isArray(data.saved) ? data.saved : [];

            return data;
        } catch (error) {
            console.error("Could not load current user's data:", error);
            return null;
        }
    }

    function saveTrainingUserData(data) {
        if (!data || typeof data !== "object") {
            return false;
        }

        // Use the project's existing save helper when available.
        if (typeof window.saveCurrentUserData === "function") {
            try {
                const result = window.saveCurrentUserData(data);
                return result !== false;
            } catch (error) {
                console.error("Could not save user data:", error);
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
            console.error("Could not save current user's data:", error);
            return false;
        }
    }

    function getIds(storageKey) {
        const field = TRAINING_DATA_FIELDS[storageKey];

        if (!field) {
            return [];
        }

        const data = getTrainingUserData();

        if (!data) {
            return [];
        }

        if (!Array.isArray(data[field])) {
            data[field] = [];
        }

        return data[field].map(item => {
            return typeof item === "string" ? item : item?.id;
        }).filter(Boolean).map(String);
    }

    function isSelected(storageKey, id) {
        return getIds(storageKey).includes(String(id));
    }

    function toggleSelection(storageKey, id) {
        const field = TRAINING_DATA_FIELDS[storageKey];
        const data = getTrainingUserData();

        if (!field || !data) {
            alert("Please sign in to save trainings to your account.");
            return null;
        }

        if (!Array.isArray(data[field])) {
            data[field] = [];
        }

        const normalizedId = String(id);
        const ids = data[field].map(item => {
            return typeof item === "string" ? item : item?.id;
        }).filter(Boolean).map(String);

        const exists = ids.includes(normalizedId);

        data[field] = exists
            ? ids.filter(itemId => itemId !== normalizedId)
            : [...ids, normalizedId];

        if (!saveTrainingUserData(data)) {
            return null;
        }

        return !exists;
    }

    /* Add an enrolled training to the user's classes. */
    function addTrainingToClasses(id) {
        const data = getTrainingUserData();

        if (!data) {
            alert("Please sign in before enrolling in a training.");
            return false;
        }

        if (!Array.isArray(data.classes)) {
            data.classes = [];
        }

        const normalizedId = String(id);

        const ids = data.classes.map(item => {
            return typeof item === "string" ? item : item?.id;
        }).filter(Boolean).map(String);

        if (!ids.includes(normalizedId)) {
            data.classes = [...ids, normalizedId];
        }

        return saveTrainingUserData(data);
    }
    /* =====================================================
       4. PAGE STATE
    ===================================================== */

    let currentPage = 1;
    let filteredTrainings = [];
    let autoChangeTimer = null;
    let isPaused = false;

    const elements = {};

    /* =====================================================
       5. HTML ESCAPING
    ===================================================== */

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
       6. CREATE ONE TRAINING CARD
    ===================================================== */

    function createTrainingCard(training) {
        const id = String(training.id);
        const title = escapeHTML(training.title);
        const category = escapeHTML(training.category);
        const level = escapeHTML(training.level || "Beginner");
        const duration = escapeHTML(training.duration || "Self-paced");
        const description = escapeHTML(training.description || "");
        const image = escapeHTML(training.image || "");
        const price = Number(training.price) || 0;

        const isSaved = isSelected(STORAGE_KEYS.saved, id);
        const isFavorite = isSelected(STORAGE_KEYS.favorites, id);

        const detailsUrl = "training-details.html?id=" +
            encodeURIComponent(id);

        return `
        <article class="training-card" data-training-id="${escapeHTML(id)}">

            <div class="training-card-image-wrap">
                <img
                    class="training-card-image"
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                    onerror="this.style.opacity='0.25';"
                >

                <span class="training-card-category">
                    ${category}
                </span>

                <div class="training-card-actions">

                    <button
                        type="button"
                        class="training-icon-button ${isSaved ? "is-active" : ""}"
                        data-action="save"
                        data-id="${escapeHTML(id)}"
                        aria-label="${isSaved ? "Remove saved training" : "Save training"}"
                        aria-pressed="${isSaved}"
                        title="${isSaved ? "Remove from saved" : "Save training"}"
                    >
                        <i class="bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}"></i>
                    </button>

                    <button
                        type="button"
                        class="training-icon-button ${isFavorite ? "is-favorite" : ""}"
                        data-action="favorite"
                        data-id="${escapeHTML(id)}"
                        aria-label="${isFavorite ? "Remove favorite" : "Add to favorites"}"
                        aria-pressed="${isFavorite}"
                        title="${isFavorite ? "Remove favorite" : "Add to favorites"}"
                    >
                        <i class="bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}"></i>
                    </button>

                </div>
            </div>

            <div class="training-card-body">

                <div class="training-card-meta">
                    <span>
                        <i class="bi bi-bar-chart"></i>
                        ${level}
                    </span>

                    <span>
                        <i class="bi bi-clock"></i>
                        ${duration}
                    </span>
                </div>

                <h3 class="training-card-title">
                    <a href="${detailsUrl}">
                        ${title}
                    </a>
                </h3>

                <p class="training-card-description">
                    ${description}
                </p>

                <div class="training-card-footer">

                    <span class="training-card-price ${price === 0 ? "is-free" : ""}">
                        ${formatPrice(price)}
                    </span>

                    <a
                        href="${detailsUrl}"
                        class="training-details-button"
                    >
                        View Details
                        <i class="bi bi-arrow-right"></i>
                    </a>

                </div>

            </div>
        </article>
    `;
    }

    /* =====================================================
       7. SEARCH AND CATEGORY FILTER
    ===================================================== */

    function applyFilters() {
        const keyword = elements.search.value.trim().toLowerCase();
        const category = elements.category.value;

        const allTrainings = getAllTrainings();

        filteredTrainings = allTrainings.filter(training => {
            const searchableText = [
                training.title,
                training.category,
                training.description,
                training.level
            ].join(" ").toLowerCase();

            const matchesKeyword = searchableText.includes(keyword);

            const matchesCategory =
                category === "all" || training.category === category;

            return matchesKeyword && matchesCategory;
        });

        const totalPages = Math.max(
            1,
            Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE)
        );

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        renderTrainings();
    }

    /* =====================================================
       8. RENDER CARDS
    ===================================================== */

    function renderTrainings() {
        const totalItems = filteredTrainings.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        if (totalItems === 0) {
            elements.grid.innerHTML = "";
            elements.empty.hidden = false;
            elements.pagination.hidden = true;
            return;
        }

        elements.empty.hidden = true;
        elements.pagination.hidden = false;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const pageItems = filteredTrainings.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        elements.grid.innerHTML = pageItems
            .map(createTrainingCard)
            .join("");

        elements.prev.disabled = currentPage <= 1;
        elements.next.disabled = currentPage >= totalPages;

        renderPageNumbers(totalPages);

        const firstItem = startIndex + 1;
        const lastItem = Math.min(
            startIndex + ITEMS_PER_PAGE,
            totalItems
        );

        elements.pageInfo.textContent =
            `${firstItem}–${lastItem} of ${totalItems}`;
    }

    /* =====================================================
       9. PAGE NUMBERS
    ===================================================== */

    function renderPageNumbers(totalPages) {
        elements.pageNumbers.innerHTML = "";

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "training-page-number";
            button.textContent = page;
            button.setAttribute("aria-label", `Page ${page}`);

            if (page === currentPage) {
                button.classList.add("is-current");
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", () => {
                goToPage(page);
            });

            elements.pageNumbers.appendChild(button);
        }
    }

    /* =====================================================
       10. NAVIGATION
    ===================================================== */

    function goToPage(page) {
        const totalPages = Math.ceil(
            filteredTrainings.length / ITEMS_PER_PAGE
        );

        if (totalPages === 0) {
            currentPage = 1;
            renderTrainings();
            return;
        }

        currentPage = Math.max(1, Math.min(page, totalPages));

        renderTrainings();
    }

    function nextPage() {
        const totalPages = Math.ceil(
            filteredTrainings.length / ITEMS_PER_PAGE
        );

        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        } else if (totalPages > 1) {
            goToPage(1);
        }
    }

    function previousPage() {
        const totalPages = Math.ceil(
            filteredTrainings.length / ITEMS_PER_PAGE
        );

        if (currentPage > 1) {
            goToPage(currentPage - 1);
        } else if (totalPages > 1) {
            goToPage(totalPages);
        }
    }

    /* =====================================================
       11. SAVE AND FAVORITE
    ===================================================== */

    function handleToggle(action, id) {
        const user = getTrainingUserData();

        if (!user) {
            const currentPage =
                window.location.pathname +
                window.location.search +
                window.location.hash;

            window.location.href =
                "login.html?redirect=" +
                encodeURIComponent(currentPage);

            return;
        }

        const key = action === "save"
            ? STORAGE_KEYS.saved
            : STORAGE_KEYS.favorites;

        toggleSelection(key, id);

        renderTrainings();

        document.dispatchEvent(
            new CustomEvent("respair:training-updated", {
                detail: {
                    action,
                    id,
                    active: isSelected(key, id)
                }
            })
        );
    }

    /* =====================================================
       12. DEMO ENROLLMENT
    ===================================================== */



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
       13. CARD BUTTON EVENTS
    ===================================================== */

    function handleGridClick(event) {
        const button = event.target.closest("[data-action]");

        if (!button || !elements.grid.contains(button)) {
            return;
        }

        const action = button.dataset.action;
        const id = button.dataset.id;

        if (!id) {
            return;
        }

        if (action === "save" || action === "favorite") {
            handleToggle(action, id);
        }

        if (action === "buy") {
            handleEnrollment(id);
        }
    }

    /* =====================================================
       14. AUTO-ROTATION
    ===================================================== */

    function stopAutoChange() {
        if (autoChangeTimer !== null) {
            clearInterval(autoChangeTimer);
            autoChangeTimer = null;
        }
    }

    function startAutoChange() {
        stopAutoChange();

        autoChangeTimer = setInterval(() => {
            if (isPaused) {
                return;
            }

            if (
                document.activeElement === elements.search ||
                document.activeElement === elements.category
            ) {
                return;
            }

            const totalPages = Math.ceil(
                filteredTrainings.length / ITEMS_PER_PAGE
            );

            if (totalPages > 1) {
                nextPage();
            }
        }, AUTO_CHANGE_INTERVAL);
    }

    /* =====================================================
       15. ADMIN MANAGEMENT API
       Use window.RespairTrainingAdmin in the management panel.
    ===================================================== */

    window.RespairTrainingAdmin = {
        getAll() {
            return getAllTrainings();
        },

        save(training) {
            if (!training || typeof training !== "object") {
                throw new Error("A valid training object is required.");
            }

            if (!training.id || !training.title || !training.category) {
                throw new Error(
                    "Training id, title, and category are required."
                );
            }

            const all = getAllTrainings();
            const index = all.findIndex(
                item => String(item.id) === String(training.id)
            );

            const cleanedTraining = {
                ...training,
                id: String(training.id),
                title: String(training.title).trim(),
                category: String(training.category).trim(),
                description: String(training.description || "").trim(),
                level: String(training.level || "Beginner"),
                duration: String(training.duration || "Self-paced"),
                image: String(training.image || ""),
                price: Math.max(0, Number(training.price) || 0),
                lessons: Math.max(0, Number(training.lessons) || 0)
            };

            if (index >= 0) {
                all[index] = cleanedTraining;
            } else {
                all.push(cleanedTraining);
            }

            if (!writeArray(STORAGE_KEYS.trainings, all)) {
                return false;
            }

            applyFilters();
            return true;
        },

        remove(id) {
            const all = getAllTrainings().filter(
                item => String(item.id) !== String(id)
            );

            const success = writeArray(STORAGE_KEYS.trainings, all);

            if (success) {
                applyFilters();
            }

            return success;
        },

        refresh() {
            applyFilters();
        }
    };

    /* =====================================================
       16. INITIALIZATION
    ===================================================== */

    function initializeTrainings() {
        const section = document.getElementById("trainings");

        if (!section) {
            return;
        }

        elements.grid = document.getElementById("trainingGrid");
        elements.search = document.getElementById("trainingSearch");
        elements.category = document.getElementById("trainingCategory");
        elements.empty = document.getElementById("trainingEmpty");
        elements.prev = document.getElementById("trainingPrev");
        elements.next = document.getElementById("trainingNext");
        elements.pageNumbers = document.getElementById("trainingPageNumbers");
        elements.pageInfo = document.getElementById("trainingPageInfo");
        elements.pagination = section.querySelector(".trainings-pagination");

        const requiredElements = [
            elements.grid,
            elements.search,
            elements.category,
            elements.empty,
            elements.prev,
            elements.next,
            elements.pageNumbers,
            elements.pageInfo,
            elements.pagination
        ];

        if (requiredElements.some(element => !element)) {
            console.error(
                "Trainings section is missing one or more required HTML elements."
            );
            return;
        }

        initializeStorage();

        elements.search.addEventListener("input", () => {
            currentPage = 1;
            applyFilters();
        });

        elements.category.addEventListener("change", () => {
            currentPage = 1;
            applyFilters();
        });

        elements.prev.addEventListener("click", previousPage);
        elements.next.addEventListener("click", nextPage);
        elements.grid.addEventListener("click", handleGridClick);

        section.addEventListener("mouseenter", () => {
            isPaused = true;
        });

        section.addEventListener("mouseleave", () => {
            isPaused = false;
        });

        section.addEventListener("focusin", () => {
            isPaused = true;
        });

        section.addEventListener("focusout", event => {
            if (!section.contains(event.relatedTarget)) {
                isPaused = false;
            }
        });

        window.addEventListener("storage", event => {
            if (
                event.key === STORAGE_KEYS.trainings ||
                event.key === STORAGE_KEYS.saved ||
                event.key === STORAGE_KEYS.favorites ||
                event.key === STORAGE_KEYS.purchased
            ) {
                applyFilters();
            }
        });

        applyFilters();
        startAutoChange();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeTrainings,
            { once: true }
        );
    } else {
        initializeTrainings();
    }

})();