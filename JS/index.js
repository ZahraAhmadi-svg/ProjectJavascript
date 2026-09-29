/* =========================================================
   RESPAIR DAWN
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const navbar =
    document.querySelector(".navbar");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");


/* =========================================================
   9. NAVBAR ON SCROLL
   ========================================================= */

window.addEventListener(
    "scroll",
    function () {

        if (!navbar) {

            return;

        }


        if (window.scrollY > 50) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   10. ACTIVE NAVIGATION LINK
   ========================================================= */

function updateActiveLink() {

    let currentSection = "";


    sections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop;

            if (
                window.scrollY >=
                sectionTop - 150
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveLink
);


/* =========================================================
   11. MOBILE NAVBAR
   ========================================================= */

const navbarCollapse =
    document.querySelector(
        ".navbar-collapse"
    );


navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth < 992 &&
                    navbarCollapse &&
                    navbarCollapse.classList.contains(
                        "show"
                    )
                ) {

                    const bsCollapse =
                        bootstrap.Collapse
                            .getInstance(
                                navbarCollapse
                            );


                    if (bsCollapse) {

                        bsCollapse.hide();

                    }

                }

            }
        );

    }
);


/* =========================================================
   12. SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        targetId === "#" ||
                        !targetId
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        const navbarHeight =
                            navbar
                                ? navbar.offsetHeight
                                : 0;


                        const targetPosition =
                            target.offsetTop -
                            navbarHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }

                }
            );

        }
    );


/* =========================================================
   13. SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".program-card, .story-card, .skill-card, .research-box, .research-question"
    );


revealElements.forEach(
    function (element) {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    }
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   14. BUTTON EFFECT
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".btn"
    );


buttons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.add(
                    "button-clicked"
                );


                setTimeout(
                    function () {

                        button.classList.remove(
                            "button-clicked"
                        );

                    },
                    300
                );

            }
        );

    }
);


/* =========================================================
   15. DYNAMIC YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );


yearElements.forEach(
    function (element) {

        element.textContent =
            new Date().getFullYear();

    }
);


/* =========================================================
   16. USER MENU ELEMENTS
   ========================================================= */

const userMenuItem =
    document.querySelector(
        "#userMenuItem"
    );

const userMenuButton =
    document.querySelector(
        "#userMenuButton"
    );

const userMenu =
    document.querySelector(
        "#userMenu"
    );

const menuUserName =
    document.querySelector(
        "#menuUserName"
    );

const menuUserStatus =
    document.querySelector(
        "#menuUserStatus"
    );

const userAvatar =
    document.querySelector(
        "#userAvatar"
    );

const managementMenuItem =
    document.querySelector(
        "#managementMenuItem"
    );

const logoutButton =
    document.querySelector(
        "#logoutButton"
    );

const startJourneyItem =
    document.querySelector(
        "#startJourneyItem"
    );


/* =========================================================
   17. UPDATE USER MENU
   ========================================================= */

function updateUserMenu() {

    const user =
        getCurrentUser();


    /* -----------------------------------------
       GUEST
       ----------------------------------------- */

    if (!user) {

        if (userMenuItem) {

            userMenuItem.style.display =
                "none";

        }


        if (startJourneyItem) {

            startJourneyItem.style.display =
                "block";

        }


        return;

    }


    /* -----------------------------------------
       LOGGED IN
       ----------------------------------------- */

    if (userMenuItem) {

        userMenuItem.style.display =
            "block";

    }


    if (startJourneyItem) {

        startJourneyItem.style.display =
            "none";

    }


    /* -----------------------------------------
       USER NAME
       ----------------------------------------- */

    const name =
        user.username ||
        user.name ||
        user.fullName ||
        "User";


    if (menuUserName) {

        menuUserName.textContent =
            name;

    }


    /* -----------------------------------------
       STATUS
       ----------------------------------------- */

    if (menuUserStatus) {

        if (
            user.role === "admin" ||
            user.role === "manager"
        ) {

            menuUserStatus.textContent =
                "Administrator";

        } else {

            menuUserStatus.textContent =
                "Respair Dawn Member";

        }

    }


    /* -----------------------------------------
       AVATAR
       ----------------------------------------- */

    if (userAvatar) {

        const firstLetter =
            name
                .charAt(0)
                .toUpperCase();


        userAvatar.innerHTML =
            firstLetter;

    }


    /* -----------------------------------------
       ADMIN MENU
       ----------------------------------------- */

    if (managementMenuItem) {

        if (
            user.role === "admin" ||
            user.role === "manager"
        ) {

            managementMenuItem.style.display =
                "flex";

        } else {

            managementMenuItem.style.display =
                "none";

        }

    }

}


/* =========================================================
   18. OPEN / CLOSE USER MENU
   ========================================================= */

if (
    userMenuButton &&
    userMenu
) {

    userMenuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            userMenu.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================================================
   19. CLOSE USER MENU OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            userMenu &&
            userMenuItem &&
            !userMenuItem.contains(
                event.target
            )
        ) {

            userMenu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   20. CLOSE WITH ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            userMenu
        ) {

            userMenu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   21. LOGOUT
   ========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                USER_STORAGE_KEY
            );


            if (userMenu) {

                userMenu.classList.remove(
                    "show"
                );

            }


            updateUserMenu();


            window.location.href =
                "index.html";

        }
    );

}


/* =========================================================
   22. STORY FAVORITES
   ========================================================= */

const storyCards =
    document.querySelectorAll(
        ".story-card"
    );


storyCards.forEach(
    function (card, index) {

        const storyId =
            card.dataset.storyId ||
            "story-" + (index + 1);


        card.dataset.storyId =
            storyId;


        /* -----------------------------------------
           CREATE HEART BUTTON
           ----------------------------------------- */

        const storyImage =
            card.querySelector(
                ".story-image"
            );


        if (
            storyImage &&
            !storyImage.querySelector(
                ".favorite-story-button"
            )
        ) {

            const heartButton =
                document.createElement(
                    "button"
                );


            heartButton.type =
                "button";


            heartButton.className =
                "favorite-story-button";


            heartButton.setAttribute(
                "aria-label",
                "Add story to favorites"
            );


            heartButton.innerHTML =
                '<i class="bi bi-heart"></i>';


            storyImage.appendChild(
                heartButton
            );


            updateFavoriteButton(
                heartButton,
                storyId
            );


            heartButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    toggleFavoriteStory(
                        storyId,
                        heartButton
                    );

                }
            );

        }

    }
);


/* =========================================================
   23. CHECK FAVORITE
   ========================================================= */

function isFavoriteStory(
    storyId
) {

    const user =
        getCurrentUser();


    if (!user) {

        return false;

    }


    const userData =
        getCurrentUserData();


    return userData.favorites.includes(
        storyId
    );

}


/* =========================================================
   24. UPDATE FAVORITE BUTTON
   ========================================================= */

function updateFavoriteButton(
    button,
    storyId
) {

    if (
        isFavoriteStory(
            storyId
        )
    ) {

        button.classList.add(
            "favorite-active"
        );


        button.innerHTML =
            '<i class="bi bi-heart-fill"></i>';

    } else {

        button.classList.remove(
            "favorite-active"
        );


        button.innerHTML =
            '<i class="bi bi-heart"></i>';

    }

}


/* =========================================================
   25. TOGGLE FAVORITE
   ========================================================= */

function toggleFavoriteStory(
    storyId,
    button
) {

    const user =
        getCurrentUser();


    /* -----------------------------------------
       LOGIN REQUIRED
       ----------------------------------------- */

    if (!user) {

        window.location.href =
            "login.html?redirect=index.html";

        return;

    }


    const userData =
        getCurrentUserData();


    const index =
        userData.favorites.indexOf(
            storyId
        );


    if (index === -1) {

        userData.favorites.push(
            storyId
        );

        console.log(
            "Story added to favorites:",
            storyId
        );

    } else {

        userData.favorites.splice(
            index,
            1
        );

        console.log(
            "Story removed from favorites:",
            storyId
        );

    }


    saveCurrentUserData(
        userData
    );


    updateFavoriteButton(
        button,
        storyId
    );

}


/* =========================================================
   26. TRAINING / CLASS ENROLLMENT
   ========================================================= */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


skillCards.forEach(
    function (card, index) {

        const classId =
            card.dataset.classId ||
            "class-" + (index + 1);


        card.dataset.classId =
            classId;


        const classTitle =
            card.querySelector("h3");


        const title =
            classTitle
                ? classTitle.textContent.trim()
                : "Training " + (index + 1);


        if (
            !card.querySelector(
                ".enroll-class-button"
            )
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "enroll-class-button";


            button.innerHTML =
                'Enroll <i class="bi bi-arrow-right"></i>';


            card.appendChild(
                button
            );


            updateEnrollButton(
                button,
                classId
            );


            button.addEventListener(
                "click",
                function () {

                    enrollInClass(
                        classId,
                        title,
                        button
                    );

                }
            );

        }

    }
);


/* =========================================================
   27. CHECK ENROLLED CLASS
   ========================================================= */

function isClassEnrolled(
    classId
) {

    const user =
        getCurrentUser();


    if (!user) {

        return false;

    }


    const userData =
        getCurrentUserData();


    return userData.classes.some(
        function (item) {

            return item.id === classId;

        }
    );

}


/* =========================================================
   28. UPDATE ENROLL BUTTON
   ========================================================= */

function updateEnrollButton(
    button,
    classId
) {

    if (
        isClassEnrolled(
            classId
        )
    ) {

        button.classList.add(
            "enrolled"
        );


        button.innerHTML =
            '<i class="bi bi-check-circle"></i> Enrolled';

    } else {

        button.classList.remove(
            "enrolled"
        );


        button.innerHTML =
            'Enroll <i class="bi bi-arrow-right"></i>';

    }

}


/* =========================================================
   29. ENROLL IN CLASS
   ========================================================= */

function enrollInClass(
    classId,
    title,
    button
) {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "login.html?redirect=index.html";

        return;

    }


    const userData =
        getCurrentUserData();


    const alreadyEnrolled =
        userData.classes.some(
            function (item) {

                return item.id === classId;

            }
        );


    if (alreadyEnrolled) {

        console.log(
            "Already enrolled:",
            title
        );

        return;

    }


    userData.classes.push({

        id: classId,

        title: title,

        date:
            new Date().toISOString()

    });


    saveCurrentUserData(
        userData
    );


    updateEnrollButton(
        button,
        classId
    );


    console.log(
        "Class enrolled:",
        title
    );

}


/* =========================================================
   30. STORY LINKS
   ========================================================= */

const storyLinks =
    document.querySelectorAll(
        ".story-content a"
    );


storyLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(
                        ".story-card"
                    );


                if (card) {

                    const title =
                        card.querySelector(
                            "h3"
                        );


                    if (title) {

                        console.log(
                            "Opening story:",
                            title.textContent.trim()
                        );

                    }

                }

            }
        );

    }
);


/* =========================================================
   31. PROGRAM LINKS
   ========================================================= */

const programLinks =
    document.querySelectorAll(
        ".program-card a"
    );


programLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening:",
                    this.textContent.trim()
                );

            }
        );

    }
);


/* =========================================================
   32. HERO PARALLAX
   ========================================================= */

const heroCard =
    document.querySelector(
        ".hero-card"
    );


window.addEventListener(
    "scroll",
    function () {

        if (
            !heroCard ||
            window.innerWidth < 992
        ) {

            return;

        }


        const scrollValue =
            window.scrollY;


        heroCard.style.transform =
            `translateY(${scrollValue * 0.08}px) rotate(2deg)`;

    }
);


/* =========================================================
   33. RESET HERO ON MOBILE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            !heroCard
        ) {

            return;

        }


        if (
            window.innerWidth < 992
        ) {

            heroCard.style.transform =
                "none";

        }

    }
);


/* =========================================================
   34. STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === USER_STORAGE_KEY
        ) {

            updateUserMenu();

        }

    }
);


/* =========================================================
   35. INITIALIZE
   ========================================================= */

updateUserMenu();


/* =========================================================
   36. CONSOLE
   ========================================================= */

console.log(
    "%cRespair Dawn",
    "font-size: 24px; font-weight: bold;"
);

console.log(
    "Inspiring Talks • Research • Trainings"
);

console.log(
    "Website JavaScript loaded successfully."
);