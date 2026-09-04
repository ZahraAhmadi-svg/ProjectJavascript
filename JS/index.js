/* =========================================================
   RESPAIR DAWN
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");



/* =========================================================
   2. NAVBAR ON SCROLL
   ========================================================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   3. ACTIVE NAVIGATION LINK
   ========================================================= */

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >=
            sectionTop - 150
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveLink
);



/* =========================================================
   4. MOBILE NAVBAR
   Close menu after clicking a link
   ========================================================= */

const navbarCollapse =
    document.querySelector(".navbar-collapse");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (
            window.innerWidth < 992 &&
            navbarCollapse.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(
                    navbarCollapse
                );

            if (bsCollapse) {

                bsCollapse.hide();

            }

        }

    });

});



/* =========================================================
   5. SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                targetId.length === 0
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                const navbarHeight =
                    navbar.offsetHeight;


                const targetPosition =
                    target.offsetTop -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        }
    );

});



/* =========================================================
   6. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".program-card, .story-card, .skill-card, .research-box, .research-question"
    );


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver =
    new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================================================
   7. BUTTON RIPPLE EFFECT
   ========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            button.classList.add(
                "button-clicked"
            );


            setTimeout(function () {

                button.classList.remove(
                    "button-clicked"
                );

            }, 300);

        }
    );

});



/* =========================================================
   8. DYNAMIC YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );


yearElements.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});



/* =========================================================
   9. STORY CARDS
   ========================================================= */

const storyLinks =
    document.querySelectorAll(
        ".story-content a"
    );


storyLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const title =
                this.closest(".story-card")
                    .querySelector("h3")
                    .textContent;


            alert(
                "Story page for:\n\n" +
                title +
                "\n\nThis section will be connected to the full story page later."
            );

        }
    );

});



/* =========================================================
   10. PROGRAM LINKS
   ========================================================= */

const programLinks =
    document.querySelectorAll(
        ".program-card a"
    );


programLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            console.log(
                "Opening:",
                this.textContent.trim()
            );

        }
    );

});



/* =========================================================
   11. START JOURNEY BUTTON
   ========================================================= */

const journeyButtons =
    document.querySelectorAll(
        'a[href="#join"]'
    );


journeyButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            console.log(
                "User wants to start their journey."
            );

        }
    );

});



/* =========================================================
   12. PARALLAX HERO EFFECT
   ========================================================= */

const heroCard =
    document.querySelector(".hero-card");


window.addEventListener(
    "scroll",
    function () {

        if (!heroCard) {
            return;
        }


        if (window.innerWidth >= 992) {

            const scrollValue =
                window.scrollY;


            heroCard.style.transform =
                `translateY(${scrollValue * 0.08}px) rotate(2deg)`;

        }

    }
);



/* =========================================================
   13. RESET HERO CARD ON MOBILE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (!heroCard) {
            return;
        }

        if (window.innerWidth < 992) {

            heroCard.style.transform =
                "none";

        }

    }
);



/* =========================================================
   14. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cRespair Dawn",
    "font-size: 24px; font-weight: bold;"
);

console.log(
    "Stories • Research • Growth"
);

console.log(
    "Website JavaScript loaded successfully."
);