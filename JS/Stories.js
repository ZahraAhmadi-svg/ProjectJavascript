/* =========================================
   SUCCESS STORIES JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const storyItems = document.querySelectorAll(".story-item");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("storySearch");
    const noStories = document.getElementById("noStories");

    let currentFilter = "all";


    /* ================= FILTER ================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            currentFilter = this.dataset.filter;

            filterStories();

        });

    });


    /* ================= SEARCH ================= */

    searchInput.addEventListener("input", function () {

        filterStories();

    });


    /* ================= FILTER FUNCTION ================= */

    function filterStories() {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        let visibleStories = 0;


        storyItems.forEach(function (story) {

            const category = story.dataset.category;
            const title = story.dataset.title;

            const matchesCategory =
                currentFilter === "all" ||
                category === currentFilter;

            const matchesSearch =
                title.includes(searchValue);


            if (matchesCategory && matchesSearch) {

                story.classList.remove("d-none");

                visibleStories++;

            } else {

                story.classList.add("d-none");

            }

        });


        /* ================= NO RESULT ================= */

        if (visibleStories === 0) {

            noStories.classList.remove("d-none");

        } else {

            noStories.classList.add("d-none");

        }

    }


    /* ================= LOAD MORE ================= */

    const loadMoreBtn = document.getElementById("loadMoreBtn");

    loadMoreBtn.addEventListener("click", function () {

        this.innerHTML = `
            Loading...
            <span class="spinner-border spinner-border-sm ms-2"></span>
        `;

        setTimeout(function () {

            loadMoreBtn.innerHTML = `
                All Stories Loaded
                <i class="bi bi-check-lg ms-2"></i>
            `;

            loadMoreBtn.disabled = true;

        }, 1000);

    });

});