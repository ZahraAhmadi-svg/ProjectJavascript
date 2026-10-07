/* =========================================================
   RESPAIR DAWN
   TRAININGS SYSTEM
   ---------------------------------------------------------
   Features:
   1. 24 Training Courses
   2. Search
   3. Category Filter
   4. Level Filter
   5. Save Training
   6. Favorite Training
   7. Purchase Training
   8. Login Check
   9. Research Completion Check
   10. Training Details Access Control
   ========================================================= */


/* =========================================================
   TRAININGS DATA
   ========================================================= */

const trainings = [

    {
        id: "python-fundamentals",
        title: "Python Fundamentals",
        category: "Technology",
        level: "Beginner",
        duration: "6 Weeks",
        icon: "bi-code-slash",

        description:
            "Learn the fundamentals of Python programming and build a strong foundation for future technology projects.",

        skills: [
            "Python Syntax",
            "Variables",
            "Data Types",
            "Conditions",
            "Loops",
            "Functions"
        ],

        interests: [
            "Programming",
            "Technology",
            "Software Development"
        ],

        goals: [
            "Learn Programming",
            "Build Projects",
            "Start a Technology Career"
        ]
    },


    {
        id: "web-development-essentials",
        title: "Web Development Essentials",
        category: "Technology",
        level: "Beginner",
        duration: "8 Weeks",
        icon: "bi-globe",

        description:
            "Learn how websites work and build modern responsive web pages using HTML, CSS, Bootstrap and JavaScript.",

        skills: [
            "HTML",
            "CSS",
            "Bootstrap",
            "JavaScript",
            "Responsive Design"
        ],

        interests: [
            "Web Development",
            "Programming",
            "Technology"
        ],

        goals: [
            "Build Websites",
            "Become a Web Developer",
            "Freelancing"
        ]
    },


    {
        id: "cybersecurity-fundamentals",
        title: "Cybersecurity Fundamentals",
        category: "Cybersecurity",
        level: "Beginner",
        duration: "8 Weeks",
        icon: "bi-shield-lock",

        description:
            "Understand the fundamental concepts of cybersecurity, threats, vulnerabilities and security practices.",

        skills: [
            "Cybersecurity Basics",
            "Network Security",
            "Threats",
            "Vulnerabilities",
            "Security Principles"
        ],

        interests: [
            "Cybersecurity",
            "Networks",
            "Security"
        ],

        goals: [
            "Learn Cybersecurity",
            "Security Career",
            "Prepare for Advanced Study"
        ]
    },


    {
        id: "artificial-intelligence",
        title: "Introduction to Artificial Intelligence",
        category: "Artificial Intelligence",
        level: "Intermediate",
        duration: "8 Weeks",
        icon: "bi-robot",

        description:
            "Explore the fundamental concepts of Artificial Intelligence and understand how intelligent systems solve problems.",

        skills: [
            "AI Concepts",
            "Machine Learning Basics",
            "Problem Solving",
            "Data Concepts"
        ],

        interests: [
            "Artificial Intelligence",
            "Technology",
            "Research"
        ],

        goals: [
            "Learn AI",
            "Start AI Projects",
            "Prepare for Advanced Study"
        ]
    },


    {
        id: "data-analysis-python",
        title: "Data Analysis with Python",
        category: "Data",
        level: "Intermediate",
        duration: "7 Weeks",
        icon: "bi-bar-chart",

        description:
            "Learn how to work with data, clean datasets, analyze information and create meaningful insights using Python.",

        skills: [
            "Python",
            "Pandas",
            "Data Cleaning",
            "Data Analysis",
            "Visualization"
        ],

        interests: [
            "Data",
            "Python",
            "Research"
        ],

        goals: [
            "Become a Data Analyst",
            "Research",
            "Data Projects"
        ]
    },


    {
        id: "cryptography-fundamentals",
        title: "Cryptography Fundamentals",
        category: "Cybersecurity",
        level: "Intermediate",
        duration: "6 Weeks",
        icon: "bi-key",

        description:
            "Learn the principles of cryptography, encryption, hashing, keys and secure communication.",

        skills: [
            "Encryption",
            "Decryption",
            "Hashing",
            "Symmetric Cryptography",
            "Asymmetric Cryptography"
        ],

        interests: [
            "Cryptography",
            "Cybersecurity",
            "Security"
        ],

        goals: [
            "Learn Cryptography",
            "Cybersecurity Research",
            "Security Career"
        ]
    },


    {
        id: "graphic-design",
        title: "Graphic Design Fundamentals",
        category: "Design",
        level: "Beginner",
        duration: "6 Weeks",
        icon: "bi-palette",

        description:
            "Develop fundamental graphic design skills and learn how visual communication works.",

        skills: [
            "Visual Design",
            "Typography",
            "Color Theory",
            "Composition"
        ],

        interests: [
            "Design",
            "Creative Arts",
            "Visual Communication"
        ],

        goals: [
            "Learn Design",
            "Create Visual Content",
            "Freelancing"
        ]
    },


    {
        id: "ui-ux-design",
        title: "UI/UX Design Essentials",
        category: "Design",
        level: "Beginner",
        duration: "7 Weeks",
        icon: "bi-layout-text-window",

        description:
            "Learn how to design useful, accessible and user-friendly digital experiences.",

        skills: [
            "UI Design",
            "UX Principles",
            "Wireframing",
            "User Research"
        ],

        interests: [
            "Design",
            "Technology",
            "User Experience"
        ],

        goals: [
            "Become a UI/UX Designer",
            "Build Digital Products",
            "Freelancing"
        ]
    },


    {
        id: "digital-marketing",
        title: "Digital Marketing",
        category: "Business",
        level: "Beginner",
        duration: "6 Weeks",
        icon: "bi-megaphone",

        description:
            "Understand digital marketing strategies and learn how businesses reach audiences online.",

        skills: [
            "Digital Marketing",
            "Social Media",
            "Content Strategy",
            "Audience Research"
        ],

        interests: [
            "Business",
            "Marketing",
            "Media"
        ],

        goals: [
            "Start Marketing Career",
            "Grow a Business",
            "Freelancing"
        ]
    },


    {
        id: "entrepreneurship-fundamentals",
        title: "Entrepreneurship Fundamentals",
        category: "Business",
        level: "Beginner",
        duration: "6 Weeks",
        icon: "bi-lightbulb",

        description:
            "Learn how ideas become opportunities and understand the fundamentals of entrepreneurship.",

        skills: [
            "Business Ideas",
            "Market Research",
            "Planning",
            "Problem Solving"
        ],

        interests: [
            "Business",
            "Entrepreneurship",
            "Innovation"
        ],

        goals: [
            "Start a Business",
            "Develop Ideas",
            "Entrepreneurship"
        ]
    },


    {
        id: "leadership-teamwork",
        title: "Leadership & Teamwork",
        category: "Leadership",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-people",

        description:
            "Develop leadership skills, teamwork, responsibility and effective decision-making.",

        skills: [
            "Leadership",
            "Teamwork",
            "Decision Making",
            "Responsibility"
        ],

        interests: [
            "Leadership",
            "Personal Development",
            "Teamwork"
        ],

        goals: [
            "Become a Better Leader",
            "Team Management",
            "Career Growth"
        ]
    },


    {
        id: "communication-skills",
        title: "Communication Skills",
        category: "Personal Development",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-chat-dots",

        description:
            "Improve communication, listening, clarity and confidence in everyday and professional situations.",

        skills: [
            "Communication",
            "Listening",
            "Confidence",
            "Professional Communication"
        ],

        interests: [
            "Communication",
            "Personal Development",
            "Career"
        ],

        goals: [
            "Improve Communication",
            "Career Growth",
            "Build Confidence"
        ]
    },


    {
        id: "english-academic-professional",
        title: "English for Academic & Professional Growth",
        category: "Language",
        level: "Beginner",
        duration: "8 Weeks",
        icon: "bi-translate",

        description:
            "Develop practical English skills for academic environments, professional communication and future opportunities.",

        skills: [
            "Vocabulary",
            "Grammar",
            "Academic English",
            "Professional Communication"
        ],

        interests: [
            "English",
            "Education",
            "Career"
        ],

        goals: [
            "Improve English",
            "Study Abroad",
            "Professional Growth"
        ]
    },


    {
        id: "academic-writing-research",
        title: "Academic Writing & Research Skills",
        category: "Research",
        level: "Intermediate",
        duration: "6 Weeks",
        icon: "bi-journal-text",

        description:
            "Learn how to search for reliable information, organize ideas and write academic research effectively.",

        skills: [
            "Research",
            "Academic Writing",
            "Citation",
            "Critical Reading"
        ],

        interests: [
            "Research",
            "Education",
            "Academic Writing"
        ],

        goals: [
            "Write Research Papers",
            "Academic Growth",
            "Research Career"
        ]
    },


    {
        id: "critical-thinking",
        title: "Critical Thinking & Problem Solving",
        category: "Personal Development",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-puzzle",

        description:
            "Learn how to analyze problems, question assumptions and develop practical solutions.",

        skills: [
            "Critical Thinking",
            "Analysis",
            "Problem Solving",
            "Decision Making"
        ],

        interests: [
            "Problem Solving",
            "Research",
            "Innovation"
        ],

        goals: [
            "Improve Thinking",
            "Solve Problems",
            "Personal Growth"
        ]
    },


    {
        id: "project-management",
        title: "Project Management Fundamentals",
        category: "Management",
        level: "Intermediate",
        duration: "6 Weeks",
        icon: "bi-kanban",

        description:
            "Learn how to plan, organize and manage projects from beginning to completion.",

        skills: [
            "Planning",
            "Project Management",
            "Time Management",
            "Team Coordination"
        ],

        interests: [
            "Management",
            "Leadership",
            "Business"
        ],

        goals: [
            "Manage Projects",
            "Career Development",
            "Leadership"
        ]
    },


    {
        id: "financial-literacy",
        title: "Financial Literacy",
        category: "Finance",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-wallet2",

        description:
            "Understand personal finance, budgeting, saving and responsible financial decision-making.",

        skills: [
            "Budgeting",
            "Saving",
            "Financial Planning",
            "Money Management"
        ],

        interests: [
            "Finance",
            "Business",
            "Personal Development"
        ],

        goals: [
            "Manage Money",
            "Financial Independence",
            "Personal Growth"
        ]
    },


    {
        id: "public-speaking",
        title: "Public Speaking & Presentation",
        category: "Communication",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-mic",

        description:
            "Build confidence and learn how to present ideas clearly to individuals and audiences.",

        skills: [
            "Public Speaking",
            "Presentation",
            "Confidence",
            "Storytelling"
        ],

        interests: [
            "Communication",
            "Leadership",
            "Personal Development"
        ],

        goals: [
            "Improve Speaking",
            "Academic Presentations",
            "Career Growth"
        ]
    },


    {
        id: "content-creation",
        title: "Content Creation & Storytelling",
        category: "Media",
        level: "Beginner",
        duration: "6 Weeks",
        icon: "bi-camera-video",

        description:
            "Learn how to create meaningful content and communicate ideas through storytelling.",

        skills: [
            "Content Creation",
            "Storytelling",
            "Writing",
            "Media"
        ],

        interests: [
            "Media",
            "Creative Arts",
            "Writing"
        ],

        goals: [
            "Create Content",
            "Build an Online Presence",
            "Freelancing"
        ]
    },


    {
        id: "photography",
        title: "Photography Fundamentals",
        category: "Creative Arts",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-camera",

        description:
            "Learn the fundamentals of photography, composition, lighting and visual storytelling.",

        skills: [
            "Photography",
            "Composition",
            "Lighting",
            "Visual Storytelling"
        ],

        interests: [
            "Photography",
            "Creative Arts",
            "Media"
        ],

        goals: [
            "Improve Photography",
            "Creative Projects",
            "Freelancing"
        ]
    },


    {
        id: "career-development",
        title: "Career Development & CV Building",
        category: "Career",
        level: "Beginner",
        duration: "4 Weeks",
        icon: "bi-briefcase",

        description:
            "Learn how to understand your strengths, build a professional CV and prepare for career opportunities.",

        skills: [
            "CV Writing",
            "Career Planning",
            "Self Assessment",
            "Interview Preparation"
        ],

        interests: [
            "Career",
            "Professional Development",
            "Personal Development"
        ],

        goals: [
            "Find a Job",
            "Build a CV",
            "Career Growth"
        ]
    },


    {
        id: "freelancing-remote-work",
        title: "Freelancing & Remote Work",
        category: "Career",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-laptop",

        description:
            "Learn the fundamentals of freelancing, remote work, personal branding and client communication.",

        skills: [
            "Freelancing",
            "Remote Work",
            "Client Communication",
            "Personal Branding"
        ],

        interests: [
            "Freelancing",
            "Technology",
            "Career"
        ],

        goals: [
            "Start Freelancing",
            "Remote Work",
            "Build Income Skills"
        ]
    },


    {
        id: "digital-entrepreneurship",
        title: "Digital Entrepreneurship",
        category: "Entrepreneurship",
        level: "Intermediate",
        duration: "6 Weeks",
        icon: "bi-rocket",

        description:
            "Explore how digital products, services and online businesses can become real opportunities.",

        skills: [
            "Digital Business",
            "Business Models",
            "Product Ideas",
            "Online Strategy"
        ],

        interests: [
            "Entrepreneurship",
            "Technology",
            "Business"
        ],

        goals: [
            "Build an Online Business",
            "Develop Digital Products",
            "Entrepreneurship"
        ]
    },


    {
        id: "innovation-creative-thinking",
        title: "Innovation & Creative Thinking",
        category: "Innovation",
        level: "Beginner",
        duration: "5 Weeks",
        icon: "bi-stars",

        description:
            "Develop creative thinking and learn how to turn problems into innovative ideas and solutions.",

        skills: [
            "Creative Thinking",
            "Innovation",
            "Idea Generation",
            "Problem Solving"
        ],

        interests: [
            "Innovation",
            "Creativity",
            "Research"
        ],

        goals: [
            "Develop Ideas",
            "Innovation Projects",
            "Creative Growth"
        ]
    }

];


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {

    saved: "respairSavedTrainings",

    favorites: "respairFavoriteTrainings",

    purchased: "respairPurchasedTrainings",

    research: "respairResearchCompleted"

};


/* =========================================================
   GET STORAGE DATA
   ========================================================= */

function getStorageArray(key) {

    try {

        const data = JSON.parse(
            localStorage.getItem(key)
        );

        return Array.isArray(data) ? data : [];

    } catch (error) {

        return [];

    }

}


/* =========================================================
   SAVE ARRAY TO STORAGE
   ========================================================= */

function saveStorageArray(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =========================================================
   LOGIN CHECK
   ========================================================= */

function isUserLoggedIn() {

    const user =
        localStorage.getItem("respairUser");

    const userData =
        localStorage.getItem("respairUserData");

    return Boolean(user || userData);

}


/* =========================================================
   RESEARCH CHECK
   ========================================================= */

function hasCompletedResearch() {

    const value =
        localStorage.getItem(
            STORAGE_KEYS.research
        );

    return value === "true";

}


/* =========================================================
   PURCHASE CHECK
   ========================================================= */

function isTrainingPurchased(trainingId) {

    const purchased =
        getStorageArray(
            STORAGE_KEYS.purchased
        );

    return purchased.includes(trainingId);

}


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showTrainingMessage(message) {

    const oldAlert =
        document.querySelector(".training-system-alert");

    if (oldAlert) {
        oldAlert.remove();
    }

    const alertBox =
        document.createElement("div");

    alertBox.className =
        "training-system-alert";

    alertBox.innerHTML = `

        <div class="training-alert-content">

            <span>${message}</span>

            <button
                type="button"
                class="training-alert-close"
            >
                &times;
            </button>

        </div>

    `;

    document.body.appendChild(alertBox);

    const closeButton =
        alertBox.querySelector(
            ".training-alert-close"
        );

    closeButton.addEventListener(
        "click",
        () => alertBox.remove()
    );

    setTimeout(() => {

        if (alertBox) {
            alertBox.remove();
        }

    }, 4000);

}


/* =========================================================
   ACCESS CHECK
   ========================================================= */

function canOpenTraining(trainingId) {

    /* -----------------------------------------
       STEP 1 — LOGIN
       ----------------------------------------- */

    if (!isUserLoggedIn()) {

        showTrainingMessage(
            "Please log in before accessing training details."
        );

        setTimeout(() => {

            window.location.href = "login.html";

        }, 900);

        return false;

    }


    /* -----------------------------------------
       STEP 2 — RESEARCH
       ----------------------------------------- */

    if (!hasCompletedResearch()) {

        showTrainingMessage(
            "Please complete the Research questions before accessing training details."
        );

        setTimeout(() => {

            window.location.href =
                "index.html#research";

        }, 1000);

        return false;

    }


    /* -----------------------------------------
       STEP 3 — PURCHASE
       ----------------------------------------- */

    if (!isTrainingPurchased(trainingId)) {

        showTrainingMessage(
            "Please purchase this training before opening its details."
        );

        return false;

    }


    return true;

}


/* =========================================================
   OPEN TRAINING DETAILS
   ========================================================= */

function openTrainingDetails(trainingId) {

    if (!canOpenTraining(trainingId)) {
        return;
    }

    window.location.href =
        `training-details.html?id=${encodeURIComponent(trainingId)}`;

}


/* =========================================================
   SAVE TRAINING
   ========================================================= */

function toggleSavedTraining(trainingId, button) {

    if (!isUserLoggedIn()) {

        showTrainingMessage(
            "Please log in to save trainings."
        );

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 900);

        return;

    }

    let saved =
        getStorageArray(
            STORAGE_KEYS.saved
        );

    const index =
        saved.indexOf(trainingId);

    if (index === -1) {

        saved.push(trainingId);

        button.classList.add("active");

        button.setAttribute(
            "title",
            "Remove from saved"
        );

        showTrainingMessage(
            "Training saved successfully."
        );

    } else {

        saved.splice(index, 1);

        button.classList.remove("active");

        button.setAttribute(
            "title",
            "Save training"
        );

        showTrainingMessage(
            "Training removed from saved."
        );

    }

    saveStorageArray(
        STORAGE_KEYS.saved,
        saved
    );

}


/* =========================================================
   FAVORITE TRAINING
   ========================================================= */

function toggleFavoriteTraining(trainingId, button) {

    if (!isUserLoggedIn()) {

        showTrainingMessage(
            "Please log in to add trainings to favorites."
        );

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 900);

        return;

    }

    let favorites =
        getStorageArray(
            STORAGE_KEYS.favorites
        );

    const index =
        favorites.indexOf(trainingId);

    if (index === -1) {

        favorites.push(trainingId);

        button.classList.add("active");

        button.setAttribute(
            "title",
            "Remove from favorites"
        );

        showTrainingMessage(
            "Training added to favorites."
        );

    } else {

        favorites.splice(index, 1);

        button.classList.remove("active");

        button.setAttribute(
            "title",
            "Add to favorites"
        );

        showTrainingMessage(
            "Training removed from favorites."
        );

    }

    saveStorageArray(
        STORAGE_KEYS.favorites,
        favorites
    );

}


/* =========================================================
   PURCHASE TRAINING
   ========================================================= */

function purchaseTraining(trainingId) {

    if (!isUserLoggedIn()) {

        showTrainingMessage(
            "Please log in before purchasing a training."
        );

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 900);

        return;

    }


    if (!hasCompletedResearch()) {

        showTrainingMessage(
            "Please complete the Research questions before purchasing a training."
        );

        setTimeout(() => {

            window.location.href =
                "index.html#research";

        }, 1000);

        return;

    }


    if (isTrainingPurchased(trainingId)) {

        showTrainingMessage(
            "You already have access to this training."
        );

        return;

    }


    const training =
        trainings.find(
            item => item.id === trainingId
        );

    if (!training) {
        return;
    }


    /*
       -----------------------------------------
       DEMO PAYMENT
       -----------------------------------------

       This is currently a simulated payment.

       Later we can connect this button to
       a real payment gateway and backend.
    */

    const confirmPurchase =
        confirm(
            `Purchase "${training.title}"?\n\n` +
            `After payment, you will be able to access the training details.`
        );


    if (!confirmPurchase) {
        return;
    }


    let purchased =
        getStorageArray(
            STORAGE_KEYS.purchased
        );


    if (!purchased.includes(trainingId)) {

        purchased.push(trainingId);

    }


    saveStorageArray(
        STORAGE_KEYS.purchased,
        purchased
    );


    showTrainingMessage(
        "Payment completed successfully. You now have access to this training."
    );


    /*
       Open details after successful payment
    */

    setTimeout(() => {

        window.location.href =
            `training-details.html?id=${encodeURIComponent(trainingId)}`;

    }, 1200);

}


/* =========================================================
   DISPLAY TRAININGS
   ========================================================= */

function displayTrainings(courseList) {

    const container =
        document.getElementById(
            "trainingsContainer"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );

    const resultsCount =
        document.getElementById(
            "resultsCount"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!courseList.length) {

        if (noResults) {
            noResults.classList.remove("d-none");
        }

        if (resultsCount) {
            resultsCount.textContent =
                "0 trainings";
        }

        return;

    }


    if (noResults) {
        noResults.classList.add("d-none");
    }


    if (resultsCount) {

        resultsCount.textContent =
            `${courseList.length} training${courseList.length > 1 ? "s" : ""}`;

    }


    const saved =
        getStorageArray(
            STORAGE_KEYS.saved
        );

    const favorites =
        getStorageArray(
            STORAGE_KEYS.favorites
        );

    const purchased =
        getStorageArray(
            STORAGE_KEYS.purchased
        );


    courseList.forEach(training => {

        const isSaved =
            saved.includes(training.id);

        const isFavorite =
            favorites.includes(training.id);

        const isPurchased =
            purchased.includes(training.id);


        const col =
            document.createElement("div");

        col.className =
            "col-md-6 col-xl-4";


        col.innerHTML = `

            <article
                class="training-card"
                data-training-id="${training.id}"
            >

                <!-- CARD HEADER -->

                <div class="training-card-header">

                    <div class="training-icon">

                        <i class="bi ${training.icon}"></i>

                    </div>


                    <div class="training-actions">

                        <!-- SAVE -->

                        <button
                            type="button"
                            class="training-action-btn save-training-btn ${isSaved ? "active" : ""}"
                            data-action="save"
                            data-id="${training.id}"
                            title="${isSaved ? "Remove from saved" : "Save training"}"
                            aria-label="Save training"
                        >

                            <i class="bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}"></i>

                        </button>


                        <!-- FAVORITE -->

                        <button
                            type="button"
                            class="training-action-btn favorite-training-btn ${isFavorite ? "active" : ""}"
                            data-action="favorite"
                            data-id="${training.id}"
                            title="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
                            aria-label="Favorite training"
                        >

                            <i class="bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}"></i>

                        </button>


                        <!-- PURCHASE -->

                        <button
                            type="button"
                            class="training-action-btn purchase-training-btn ${isPurchased ? "purchased" : ""}"
                            data-action="purchase"
                            data-id="${training.id}"
                            title="${isPurchased ? "Purchased" : "Purchase training"}"
                            aria-label="Purchase training"
                        >

                            <i class="bi ${isPurchased ? "bi-check-circle-fill" : "bi-cart3"}"></i>

                        </button>

                    </div>

                </div>


                <!-- CATEGORY -->

                <span class="training-category">

                    ${training.category}

                </span>


                <!-- TITLE -->

                <h3 class="training-card-title">

                    ${training.title}

                </h3>


                <!-- DESCRIPTION -->

                <p class="training-card-description">

                    ${training.description}

                </p>


                <!-- META -->

                <div class="training-card-meta">

                    <span>

                        <i class="bi bi-bar-chart"></i>

                        ${training.level}

                    </span>


                    <span>

                        <i class="bi bi-clock"></i>

                        ${training.duration}

                    </span>

                </div>


                <!-- ACCESS BUTTON -->

                <button
                    type="button"
                    class="training-details-btn"
                    data-action="details"
                    data-id="${training.id}"
                >

                    ${
                        isPurchased
                            ? "Open Training"
                            : "Purchase to Access"
                    }

                    <i class="bi bi-arrow-right"></i>

                </button>

            </article>

        `;


        container.appendChild(col);

    });


    attachTrainingEvents();

}


/* =========================================================
   ATTACH EVENTS
   ========================================================= */

function attachTrainingEvents() {

    const container =
        document.getElementById(
            "trainingsContainer"
        );

    if (!container) {
        return;
    }


    container
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const action =
                        this.dataset.action;

                    const trainingId =
                        this.dataset.id;


                    /* SAVE */

                    if (action === "save") {

                        toggleSavedTraining(
                            trainingId,
                            this
                        );

                        updateTrainingActionIcon(
                            this,
                            "save"
                        );

                        return;

                    }


                    /* FAVORITE */

                    if (action === "favorite") {

                        toggleFavoriteTraining(
                            trainingId,
                            this
                        );

                        updateTrainingActionIcon(
                            this,
                            "favorite"
                        );

                        return;

                    }


                    /* PURCHASE */

                    if (action === "purchase") {

                        purchaseTraining(
                            trainingId
                        );

                        return;

                    }


                    /* DETAILS */

                    if (action === "details") {

                        openTrainingDetails(
                            trainingId
                        );

                    }

                }
            );

        });


    /*
       Clicking the card itself
       also attempts to open details.
    */

    container
        .querySelectorAll(
            ".training-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                function () {

                    const trainingId =
                        this.dataset.trainingId;

                    openTrainingDetails(
                        trainingId
                    );

                }
            );

        });

}


/* =========================================================
   UPDATE SAVE / FAVORITE ICON
   ========================================================= */

function updateTrainingActionIcon(
    button,
    type
) {

    if (type === "save") {

        const isActive =
            button.classList.contains(
                "active"
            );

        const icon =
            button.querySelector("i");

        if (icon) {

            icon.className =
                isActive
                    ? "bi bi-bookmark-fill"
                    : "bi bi-bookmark";

        }

    }


    if (type === "favorite") {

        const isActive =
            button.classList.contains(
                "active"
            );

        const icon =
            button.querySelector("i");

        if (icon) {

            icon.className =
                isActive
                    ? "bi bi-heart-fill"
                    : "bi bi-heart";

        }

    }

}


/* =========================================================
   FILTER TRAININGS
   ========================================================= */

function filterTrainings() {

    const searchInput =
        document.getElementById(
            "trainingSearch"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const levelFilter =
        document.getElementById(
            "levelFilter"
        );


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "";


    const selectedLevel =
        levelFilter
            ? levelFilter.value
            : "";


    const filtered =
        trainings.filter(training => {

            const searchableText = [

                training.title,

                training.category,

                training.description,

                ...training.skills,

                ...training.interests,

                ...training.goals

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !searchTerm ||
                searchableText.includes(
                    searchTerm
                );


            const matchesCategory =
                !selectedCategory ||
                training.category ===
                selectedCategory;


            const matchesLevel =
                !selectedLevel ||
                training.level ===
                selectedLevel;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesLevel
            );

        });


    displayTrainings(filtered);

}


/* =========================================================
   RESET FILTERS
   ========================================================= */

function resetTrainingFilters() {

    const searchInput =
        document.getElementById(
            "trainingSearch"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const levelFilter =
        document.getElementById(
            "levelFilter"
        );


    if (searchInput) {
        searchInput.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "";
    }

    if (levelFilter) {
        levelFilter.value = "";
    }


    displayTrainings(trainings);

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* Initial display */

        displayTrainings(
            trainings
        );


        /* Search */

        const searchInput =
            document.getElementById(
                "trainingSearch"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterTrainings
            );

        }


        /* Category */

        const categoryFilter =
            document.getElementById(
                "categoryFilter"
            );

        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                filterTrainings
            );

        }


        /* Level */

        const levelFilter =
            document.getElementById(
                "levelFilter"
            );

        if (levelFilter) {

            levelFilter.addEventListener(
                "change",
                filterTrainings
            );

        }


        /* Reset */

        const resetButton =
            document.getElementById(
                "resetFilters"
            );

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                resetTrainingFilters
            );

        }

    }
);