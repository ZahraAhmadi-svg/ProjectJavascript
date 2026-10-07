
/* =========================================================
   RESPAIR DAWN
   MY CLASSES PAGE
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           1. CURRENT USER
           ================================================= */

        const user =
            getCurrentUser();


        if (!user) {

            return;
        }


        /* =================================================
           2. USER DATA
           ================================================= */

        let userData =
            getCurrentUserData();


        if (!userData) {

            userData = {

                classes: [],
                favorites: [],
                saved: []

            };
        }


        if (!Array.isArray(userData.classes)) {

            userData.classes = [];

        }


        /* =================================================
           3. NAVBAR ELEMENTS
           ================================================= */

        const userMenuButton =
            document.getElementById(
                "userMenuButton"
            );

        const userMenu =
            document.getElementById(
                "userMenu"
            );

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );

        const menuUserName =
            document.getElementById(
                "menuUserName"
            );

        const menuUserStatus =
            document.getElementById(
                "menuUserStatus"
            );

        const managementMenuItem =
            document.getElementById(
                "managementMenuItem"
            );

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        /* =================================================
           4. USER INFORMATION
           ================================================= */

        const userName =
            user.name ||
            user.username ||
            "User";

        const role =
            user.role ||
            "user";


        const firstLetter =
            userName
                .trim()
                .charAt(0)
                .toUpperCase() || "U";


        if (userAvatar) {

            userAvatar.textContent =
                firstLetter;
        }


        if (menuUserName) {

            menuUserName.textContent =
                userName;
        }


        if (menuUserStatus) {

            menuUserStatus.textContent =
                role === "admin"
                    ? "Administrator"
                    : "Welcome to Respair Dawn";
        }


        if (managementMenuItem) {

            managementMenuItem.style.display =
                role === "admin"
                    ? "flex"
                    : "none";
        }


        /* =================================================
           5. USER MENU
           ================================================= */

        if (
            userMenuButton &&
            userMenu
        ) {

            userMenuButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    userMenu.classList.toggle(
                        "show"
                    );

                }
            );

        }


        document.addEventListener(
            "click",
            function (event) {

                if (
                    userMenu &&
                    userMenuButton &&
                    !userMenu.contains(event.target) &&
                    !userMenuButton.contains(event.target)
                ) {

                    userMenu.classList.remove(
                        "show"
                    );

                }

            }
        );


        if (userMenu) {

            const links =
                userMenu.querySelectorAll(
                    "a"
                );


            links.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            userMenu.classList.remove(
                                "show"
                            );

                        }
                    );

                }
            );

        }


        /* =================================================
           6. LOGOUT
           ================================================= */

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "respairUser"
                    );

                    localStorage.removeItem(
                        "respairLoggedIn"
                    );

                    sessionStorage.removeItem(
                        "respairAdminAuthenticated"
                    );

                    window.location.replace(
                        "auth.html"
                    );

                }
            );

        }


        /* =================================================
           7. PAGE ELEMENTS
           ================================================= */

        const container =
            document.getElementById(
                "classesContainer"
            );

        const emptyState =
            document.getElementById(
                "emptyState"
            );

        const noSearchResult =
            document.getElementById(
                "noSearchResult"
            );

        const totalClasses =
            document.getElementById(
                "totalClasses"
            );

        const searchInput =
            document.getElementById(
                "classSearch"
            );


        /* =================================================
           8. ICONS
           ================================================= */

        const defaultIcon =
            "bi bi-mortarboard";


        /* =================================================
           9. ESCAPE HTML
           ================================================= */

        function escapeHTML(value) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        /* =================================================
           10. CLASS DATA NORMALIZATION
           ================================================= */

        function normalizeClass(item) {


            /*
               My Classes ممکن است فقط ID
               ذخیره کرده باشد:

               "communication"

               یا ممکن است object باشد:

               {
                   id: "communication",
                   title: "Communication Skills"
               }
            */


            if (
                typeof item ===
                "string"
            ) {

                return {

                    id: item,

                    title: formatTitle(item),

                    category: "Training",

                    description:
                        "Continue learning and developing this skill.",

                    duration:
                        "Self-paced",

                    level:
                        "All levels",

                    icon:
                        defaultIcon

                };

            }


            if (
                item &&
                typeof item ===
                "object"
            ) {

                return {

                    id:
                        item.id ||
                        item.courseId ||
                        item.trainingId ||
                        createSafeId(
                            item.title
                        ),

                    title:
                        item.title ||
                        item.name ||
                        "Untitled Class",

                    category:
                        item.category ||
                        "Training",

                    description:
                        item.description ||
                        "Continue learning and developing this skill.",

                    duration:
                        item.duration ||
                        "Self-paced",

                    level:
                        item.level ||
                        "All levels",

                    icon:
                        item.icon ||
                        defaultIcon

                };

            }


            return {

                id:
                    "unknown",

                title:
                    "Untitled Class",

                category:
                    "Training",

                description:
                    "Continue learning.",

                duration:
                    "Self-paced",

                level:
                    "All levels",

                icon:
                    defaultIcon

            };

        }


        /* =================================================
           11. CREATE SAFE ID
           ================================================= */

        function createSafeId(value) {

            return String(
                value ||
                "class"
            )
                .toLowerCase()
                .trim()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )
                .replace(
                    /^-+|-+$/g,
                    "");

        }


        /* =================================================
           12. FORMAT TITLE
           ================================================= */

        function formatTitle(value) {

            return String(
                value ||
                "Training"
            )
                .replace(
                    /[-_]+/g,
                    " "
                )
                .replace(
                    /\b\w/g,
                    function (letter) {

                        return letter.toUpperCase();

                    }
                );

        }


        /* =================================================
           13. RENDER CLASSES
           ================================================= */

        function renderClasses(
            searchTerm = ""
        ) {


            if (!container) {

                return;
            }


            container.innerHTML = "";


            const classes =
                userData.classes.map(
                    normalizeClass
                );


            if (totalClasses) {

                totalClasses.textContent =
                    classes.length;

            }


            /* ---------------------------------------------
               NO CLASSES
               --------------------------------------------- */

            if (
                classes.length ===
                0
            ) {

                container.style.display =
                    "none";

                if (emptyState) {

                    emptyState.style.display =
                        "block";

                }

                if (noSearchResult) {

                    noSearchResult.style.display =
                        "none";

                }

                return;

            }


            /* ---------------------------------------------
               SEARCH
               --------------------------------------------- */

            const query =
                searchTerm
                    .trim()
                    .toLowerCase();


            const filtered =
                classes.filter(
                    function (course) {

                        return (

                            course.title
                                .toLowerCase()
                                .includes(query)

                            ||

                            course.category
                                .toLowerCase()
                                .includes(query)

                            ||

                            course.description
                                .toLowerCase()
                                .includes(query)

                        );

                    }
                );


            /* ---------------------------------------------
               NO SEARCH RESULT
               --------------------------------------------- */

            if (
                filtered.length ===
                0
            ) {

                container.style.display =
                    "none";

                if (emptyState) {

                    emptyState.style.display =
                        "none";

                }

                if (noSearchResult) {

                    noSearchResult.style.display =
                        "block";

                }

                return;

            }


            if (emptyState) {

                emptyState.style.display =
                    "none";

            }

            if (noSearchResult) {

                noSearchResult.style.display =
                    "none";

            }


            container.style.display =
                "grid";


            /* ---------------------------------------------
               CREATE CARDS
               --------------------------------------------- */

            filtered.forEach(
                function (course) {


                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "class-card";


                    card.dataset.id =
                        course.id;


                    card.innerHTML = `

                        <div class="class-cover">

                            <span class="class-category">
                                ${escapeHTML(course.category)}
                            </span>

                            <div class="class-cover-icon">

                                <i class="${escapeHTML(course.icon)}"></i>

                            </div>

                        </div>


                        <div class="class-content">

                            <h3>
                                ${escapeHTML(course.title)}
                            </h3>

                            <p>
                                ${escapeHTML(course.description)}
                            </p>


                            <div class="class-meta">

                                <span>

                                    <i class="bi bi-clock"></i>

                                    ${escapeHTML(course.duration)}

                                </span>


                                <span>

                                    <i class="bi bi-bar-chart"></i>

                                    ${escapeHTML(course.level)}

                                </span>

                            </div>


                            <div class="class-footer">

                                <span class="class-status">

                                    <i class="bi bi-circle-fill"></i>

                                    Enrolled

                                </span>


                                <div class="class-actions">

                                    <button
                                        type="button"
                                        class="class-action-btn open-class-btn"
                                        title="Open class"
                                        data-id="${escapeHTML(course.id)}"
                                    >

                                        <i class="bi bi-arrow-up-right"></i>

                                    </button>


                                    <button
                                        type="button"
                                        class="class-action-btn remove-class-btn"
                                        title="Remove from My Classes"
                                        data-id="${escapeHTML(course.id)}"
                                    >

                                        <i class="bi bi-trash3"></i>

                                    </button>

                                </div>

                            </div>

                        </div>

                    `;


                    container.appendChild(
                        card
                    );

                }
            );


            /* ---------------------------------------------
               ACTION BUTTONS
               --------------------------------------------- */

            const removeButtons =
                container.querySelectorAll(
                    ".remove-class-btn"
                );


            removeButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;


                            removeClass(
                                id
                            );

                        }
                    );

                }
            );


            const openButtons =
                container.querySelectorAll(
                    ".open-class-btn"
                );


            openButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                button.dataset.id;


                            openClass(
                                id
                            );

                        }
                    );

                }
            );

        }


        /* =================================================
           14. REMOVE CLASS
           ================================================= */

        function removeClass(
            classId
        ) {


            const confirmed =
                window.confirm(
                    "Remove this class from My Classes?"
                );


            if (!confirmed) {

                return;
            }


            userData.classes =
                userData.classes.filter(
                    function (item) {

                        const normalized =
                            normalizeClass(
                                item
                            );

                        return (
                            normalized.id !==
                            classId
                        );

                    }
                );


            saveCurrentUserData(
                userData
            );


            renderClasses(
                searchInput
                    ? searchInput.value
                    : ""
            );

        }


        /* =================================================
           15. OPEN CLASS
           ================================================= */

        function openClass(
            classId
        ) {


            /*
               صفحه details پروژه
               در صورت ساخته شدن می‌تواند
               این ID را دریافت کند.

               مثال:

               training-details.html?id=communication
            */


            window.location.href =
                "training-details.html?id=" +
                encodeURIComponent(
                    classId
                );

        }


        /* =================================================
           16. SEARCH
           ================================================= */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    renderClasses(
                        searchInput.value
                    );

                }
            );

        }


        /* =================================================
           17. FIRST RENDER
           ================================================= */

        renderClasses();


        /* =================================================
           18. DEBUG
           ================================================= */

        console.log(
            "======================================"
        );

        console.log(
            "RESPAIR DAWN - MY CLASSES"
        );

        console.log(
            "Current user:",
            user
        );

        console.log(
            "User classes:",
            userData.classes
        );

        console.log(
            "======================================"
        );

    }
);

