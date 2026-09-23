document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Navbar Scroll Effect
    // =========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // =========================
    // Share Story
    // =========================

    const shareButtons = document.querySelectorAll(".share-btn");

    shareButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {
            event.preventDefault();

            const platform = button.getAttribute("data-platform");
            const pageUrl = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(
                document.title
            );

            let shareUrl = "";

            if (platform === "facebook") {
                shareUrl =
                    `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            }

            else if (platform === "twitter") {
                shareUrl =
                    `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`;
            }

            else if (platform === "linkedin") {
                shareUrl =
                    `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            }

            else if (platform === "copy") {
                navigator.clipboard.writeText(window.location.href)
                    .then(function () {
                        showMessage("Link copied successfully!");
                    })
                    .catch(function () {
                        showMessage("Could not copy the link.");
                    });

                return;
            }

            if (shareUrl !== "") {
                window.open(
                    shareUrl,
                    "_blank",
                    "width=600,height=500"
                );
            }
        });

    });


    // =========================
    // Simple Message
    // =========================

    function showMessage(message) {

        const messageBox = document.createElement("div");

        messageBox.className = "share-message";
        messageBox.textContent = message;

        document.body.appendChild(messageBox);

        setTimeout(function () {
            messageBox.classList.add("show");
        }, 50);

        setTimeout(function () {
            messageBox.classList.remove("show");

            setTimeout(function () {
                messageBox.remove();
            }, 300);

        }, 2500);
    }


    // =========================
    // Reading Progress Bar
    // =========================

    const progressBar = document.createElement("div");

    progressBar.className = "reading-progress";

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {

        const article = document.querySelector(".story-content");

        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;

        const scrollPosition = window.scrollY - articleTop;

        const progress =
            (scrollPosition / articleHeight) * 100;

        progressBar.style.width =
            Math.min(Math.max(progress, 0), 100) + "%";
    });


    // =========================
    // Smooth Scroll
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });


    // =========================
    // Back Button
    // =========================

    const backButton =
        document.querySelector(".back-to-stories");

    if (backButton) {

        backButton.addEventListener("click", function () {

            window.location.href =
                "success-stories.html";

        });

    }

});