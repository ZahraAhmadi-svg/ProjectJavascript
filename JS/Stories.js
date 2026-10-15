/* =========================================================
   RESPAIR DAWN
   STORIES DATA + CAROUSEL + FAVORITES + SAVED STORIES
   ========================================================= */


/* =========================================================
   1. ALL 24 STORIES
   ========================================================= */

const stories = [

    /* -----------------------------------------------------
       01. Steve Jobs
       ----------------------------------------------------- */

    {
        id: "steve-jobs",
        name: "Steve Jobs",
        category: "Technology",
        year: "1955 – 2011",
        image: "images/stories/Steve_Jobs.jpg",
        description:
            "A journey of creativity, failure, persistence and innovation in technology."
    },


    /* -----------------------------------------------------
       02. Oprah Winfrey
       ----------------------------------------------------- */

    {
        id: "oprah-winfrey",
        name: "Oprah Winfrey",
        category: "Media & Leadership",
        year: "1954 – Present",
        image: "images/stories/Oprah-Winfrey.jpg",
        description:
            "A story of resilience, communication and building a meaningful global influence."
    },


    /* -----------------------------------------------------
       03. Elon Musk
       ----------------------------------------------------- */

    {
        id: "elon-musk",
        name: "Elon Musk",
        category: "Technology & Business",
        year: "1971 – Present",
        image: "images/stories/elon-musk.jpg",
        description:
            "A journey shaped by ambitious ideas, technology, risk and persistence."
    },


    /* -----------------------------------------------------
       04. Malala Yousafzai
       ----------------------------------------------------- */

    {
        id: "malala-yousafzai",
        name: "Malala Yousafzai",
        category: "Education & Activism",
        year: "1997 – Present",
        image: "images/stories/Malala-Yousafzai.jpg",
        description:
            "A story of courage, education and using a voice to create positive change."
    },


    /* -----------------------------------------------------
       05. Bill Gates
       ----------------------------------------------------- */

    {
        id: "bill-gates",
        name: "Bill Gates",
        category: "Technology & Business",
        year: "1955 – Present",
        image: "images/stories/Bill_Gates.jpg",
        description:
            "A journey from software development to technology leadership and philanthropy."
    },


    /* -----------------------------------------------------
       06. J.K. Rowling
       ----------------------------------------------------- */

    {
        id: "jk-rowling",
        name: "J.K. Rowling",
        category: "Literature",
        year: "1965 – Present",
        image: "images/stories/jk-rowling.jpg",
        description:
            "A story of rejection, persistence and turning imagination into a global literary success."
    },


    /* -----------------------------------------------------
       07. Jack Ma
       ----------------------------------------------------- */

    {
        id: "jack-ma",
        name: "Jack Ma",
        category: "Business",
        year: "1964 – Present",
        image: "images/stories/jack-ma.jpg",
        description:
            "A journey of persistence, entrepreneurship and building a global technology company."
    },


    /* -----------------------------------------------------
       08. Sara Blakely
       ----------------------------------------------------- */

    {
        id: "sara-blakely",
        name: "Sara Blakely",
        category: "Entrepreneurship",
        year: "1971 – Present",
        image: "images/stories/Sara_Blakely.jpg",
        description:
            "A story of creativity, determination and turning an idea into a successful business."
    },


    /* -----------------------------------------------------
       09. Michael Jordan
       ----------------------------------------------------- */

    {
        id: "michael-jordan",
        name: "Michael Jordan",
        category: "Sports",
        year: "1963 – Present",
        image: "images/stories/michael-jordan.jpg",
        description:
            "A journey of discipline, competition, persistence and excellence in basketball."
    },


    /* -----------------------------------------------------
       10. Walt Disney
       ----------------------------------------------------- */

    {
        id: "walt-disney",
        name: "Walt Disney",
        category: "Creativity & Business",
        year: "1901 – 1966",
        image: "images/stories/WaltDisney.jpg",
        description:
            "A story of imagination, creativity, setbacks and building a lasting entertainment company."
    },


    /* -----------------------------------------------------
       11. Thomas Edison
       ----------------------------------------------------- */

    {
        id: "thomas-edison",
        name: "Thomas Edison",
        category: "Innovation",
        year: "1847 – 1931",
        image: "images/stories/Thomas_Edison.jpg",
        description:
            "A journey of experimentation, invention and persistence in the world of technology."
    },


    /* -----------------------------------------------------
       12. Marie Curie
       ----------------------------------------------------- */

    {
        id: "marie-curie",
        name: "Marie Curie",
        category: "Science",
        year: "1867 – 1934",
        image: "images/stories/Marie_Curie.jpg",
        description:
            "A remarkable scientific journey shaped by research, dedication and discovery."
    },


    /* -----------------------------------------------------
       13. Albert Einstein
       ----------------------------------------------------- */

    {
        id: "albert-einstein",
        name: "Albert Einstein",
        category: "Science",
        year: "1879 – 1955",
        image: "images/stories/Albert_Einstein.jpg",
        description:
            "A story of curiosity, scientific thinking and ideas that transformed modern physics."
    },


    /* -----------------------------------------------------
       14. Nelson Mandela
       ----------------------------------------------------- */

    {
        id: "nelson-mandela",
        name: "Nelson Mandela",
        category: "Leadership",
        year: "1918 – 2013",
        image: "images/stories/Nelson_Mandela.jpg",
        description:
            "A journey of perseverance, leadership and commitment to social change."
    },


    /* -----------------------------------------------------
       15. Coco Chanel
       ----------------------------------------------------- */

    {
        id: "coco-chanel",
        name: "Coco Chanel",
        category: "Fashion & Business",
        year: "1883 – 1971",
        image: "images/stories/Coco_Chanel.jpg",
        description:
            "A story of creativity, independence and transforming ideas in fashion."
    },


    /* -----------------------------------------------------
       16. Howard Schultz
       ----------------------------------------------------- */

    {
        id: "howard-schultz",
        name: "Howard Schultz",
        category: "Business",
        year: "1953 – Present",
        image: "images/stories/Howard_Schultz.jpg",
        description:
            "A journey of entrepreneurship, leadership and building a global coffee brand."
    },


    /* -----------------------------------------------------
       17. Harland Sanders
       ----------------------------------------------------- */

    {
        id: "harland-sanders",
        name: "Harland Sanders",
        category: "Entrepreneurship",
        year: "1890 – 1980",
        image: "images/stories/Harland_Sanders.jpg",
        description:
            "A story of persistence and entrepreneurship that developed later in life."
    },


    /* -----------------------------------------------------
       18. Vera Wang
       ----------------------------------------------------- */

    {
        id: "vera-wang",
        name: "Vera Wang",
        category: "Fashion",
        year: "1949 – Present",
        image: "images/stories/vera-wang.jpg",
        description:
            "A journey of creativity and building a major career in fashion."
    },


    /* -----------------------------------------------------
       19. Arianna Huffington
       ----------------------------------------------------- */

    {
        id: "arianna-huffington",
        name: "Arianna Huffington",
        category: "Media & Business",
        year: "1950 – Present",
        image: "images/stories/Arianna_Huffington.jpg",
        description:
            "A story of writing, entrepreneurship, media and creating new opportunities."
    },


    /* -----------------------------------------------------
       20. Jeff Bezos
       ----------------------------------------------------- */

    {
        id: "jeff-bezos",
        name: "Jeff Bezos",
        category: "Technology & Business",
        year: "1964 – Present",
        image: "images/stories/Jeff_Bezos.jpg",
        description:
            "A journey from a small online business to building a major technology company."
    },


    /* -----------------------------------------------------
       21. Cristiano Ronaldo
       ----------------------------------------------------- */

    {
        id: "cristiano-ronaldo",
        name: "Cristiano Ronaldo",
        category: "Sports",
        year: "1985 – Present",
        image: "images/stories/Cristiano_Ronaldo.jpg",
        description:
            "A journey of discipline, training, determination and achievement in football."
    },


    /* -----------------------------------------------------
       22. Serena Williams
       ----------------------------------------------------- */

    {
        id: "serena-williams",
        name: "Serena Williams",
        category: "Sports",
        year: "1981 – Present",
        image: "images/stories/serena_williams.jpg",
        description:
            "A story of dedication, competition and achievement in professional tennis."
    },


    /* -----------------------------------------------------
       23. Maya Angelou
       ----------------------------------------------------- */

    {
        id: "maya-angelou",
        name: "Maya Angelou",
        category: "Literature & Writing",
        year: "1928 – 2014",
        image: "images/stories/maya_angelou.jpg",
        description:
            "A journey of writing, resilience and using words to inspire generations."
    },


    /* -----------------------------------------------------
       24. Soichiro Honda
       ----------------------------------------------------- */

    {
        id: "soichiro-honda",
        name: "Soichiro Honda",
        category: "Engineering & Business",
        year: "1906 – 1991",
        image: "images/stories/Soichiro_Honda.jpg",
        description:
            "A story of engineering, experimentation and building a globally recognized company."
    }

];


/* =========================================================
   2. ADMIN STORIES
   ========================================================= */

let adminStories = [];


function getAllStories() {

    const savedAdminStories =
        localStorage.getItem(
            "respairAdminStories"
        );


    if (savedAdminStories) {

        try {

            adminStories =
                JSON.parse(
                    savedAdminStories
                );

        } catch (error) {

            console.error(
                "Invalid admin stories:",
                error
            );

            adminStories = [];
        }
    }


    return [
        ...stories,
        ...adminStories
    ];
}


/* =========================================================
   3. PAGE ELEMENTS
   ========================================================= */

const storiesContainer =
    document.getElementById(
        "storiesContainer"
    );


const storyPrev =
    document.getElementById(
        "storyPrev"
    );


const storyNext =
    document.getElementById(
        "storyNext"
    );


const moreStoriesBtn =
    document.getElementById(
        "moreStoriesBtn"
    );


/* ---------------------------------------------------------
   SEARCH & FILTER ELEMENTS

   IMPORTANT:
   Each variable is declared ONLY ONCE.
   --------------------------------------------------------- */

const storySearch =
    document.getElementById(
        "storySearch"
    );


const storyCategory =
    document.getElementById(
        "storyCategory"
    );


const clearStorySearch =
    document.getElementById(
        "clearStorySearch"
    );


const storySearchResult =
    document.getElementById(
        "storySearchResult"
    );


const storiesCount =
    document.getElementById(
        "storiesCount"
    );


const noStoriesFound =
    document.getElementById(
        "noStoriesFound"
    );


/* =========================================================
   4. DETECT CURRENT PAGE
   ========================================================= */

/*
   Index page:
   3 cards

   SuccessStories / Stories page:
   6 cards
*/

const isStoriesPage =
    document.getElementById(
        "featuredStoriesContainer"
    ) !== null ||

    document.getElementById(
        "storySearch"
    ) !== null ||

    document.getElementById(
        "storyCategory"
    ) !== null;


const storiesPerPage =
    isStoriesPage
        ? 6
        : 3;


/* =========================================================
   5. CAROUSEL + SEARCH VARIABLES
   ========================================================= */

let currentPage = 0;

let autoSlideInterval = null;

let isMouseOverStories = false;


/* =========================================================
   SEARCH VARIABLES
   ========================================================= */

let searchTerm = "";

let selectedCategory = "all";


/* =========================================================
   6. GET CURRENT USER
   ========================================================= */

function getLoggedInUser() {

    if (
        typeof getCurrentUser ===
        "function"
    ) {

        return getCurrentUser();

    }

    return null;
}


/* =========================================================
   7. GET CURRENT USER DATA
   ========================================================= */

function getStoryUserData() {

    if (
        typeof getCurrentUserData ===
        "function"
    ) {

        return getCurrentUserData();

    }

    return null;
}


/* =========================================================
   8. REQUIRE LOGIN
   ========================================================= */

function requireLogin(
    targetPage = null
) {

    const user =
        getLoggedInUser();


    /*
       Already logged in
    */

    if (user) {

        return true;

    }


    /*
       Save destination
       before going to login.
    */

    if (targetPage) {

        sessionStorage.setItem(
            "respairPendingPage",
            targetPage
        );

    }


    window.location.href =
        "login.html";


    return false;
}


/* =========================================================
   9. CHECK FAVORITE
   ========================================================= */

function isFavorite(
    storyId
) {

    const userData =
        getStoryUserData();


    if (!userData) {

        return false;

    }


    if (
        !Array.isArray(
            userData.favorites
        )
    ) {

        return false;

    }


    return userData.favorites
        .includes(storyId);
}


/* =========================================================
   10. CHECK SAVED
   ========================================================= */

function isSaved(
    storyId
) {

    const userData =
        getStoryUserData();


    if (!userData) {

        return false;

    }


    if (
        !Array.isArray(
            userData.saved
        )
    ) {

        return false;

    }


    return userData.saved
        .includes(storyId);
}


/* =========================================================
   11. CREATE STORY CARD
   ========================================================= */

function createStoryCard(
    story
) {

    const favoriteActive =
        isFavorite(story.id)
            ? "active"
            : "";


    const saveActive =
        isSaved(story.id)
            ? "active"
            : "";


    return `

        <div class="col-md-6 col-lg-4">

            <article
                class="story-card"
                data-story-id="${story.id}">


                <!-- STORY IMAGE -->

                <div class="story-image">

                    <img
                        src="${story.image}"
                        alt="${story.name}"
                        class="story-person-image"
                    >


                    <!-- STORY ACTIONS -->

                    <div class="story-actions">


                        <!-- FAVORITE -->

                        <button
                            type="button"
                            class="story-action favorite-btn ${favoriteActive}"
                            data-story-id="${story.id}"
                            aria-label="Add to favorites"
                        >

                            <i class="bi ${
                                favoriteActive
                                    ? "bi-heart-fill"
                                    : "bi-heart"
                            }"></i>

                        </button>


                        <!-- SAVE -->

                        <button
                            type="button"
                            class="story-action save-btn ${saveActive}"
                            data-story-id="${story.id}"
                            aria-label="Save story"
                        >

                            <i class="bi ${
                                saveActive
                                    ? "bi-bookmark-fill"
                                    : "bi-bookmark"
                            }"></i>

                        </button>

                    </div>

                </div>


                <!-- STORY CONTENT -->

                <div class="story-content">


                    <small>
                        ${story.category}
                    </small>


                    <h3>
                        ${story.name}
                    </h3>


                    <div class="story-year">
                        ${story.year}
                    </div>


                    <p>
                        ${story.description}
                    </p>


                    <!-- READ STORY -->

                    <a
                        href="details.html?id=${encodeURIComponent(story.id)}"
                        class="read-story"
                        data-story-id="${story.id}"
                    >

                        Read Story

                        <i class="bi bi-arrow-right"></i>

                    </a>

                </div>

            </article>

        </div>

    `;
}


/* =========================================================
   FILTER STORIES
   ========================================================= */

function getFilteredStories() {

    const allStories =
        getAllStories();


    return allStories.filter(
        function (story) {

            /*
               Search in:
               - Name
               - Category
               - Description
               - Year
            */

            const searchableText =
                `
                ${story.name}
                ${story.category}
                ${story.description}
                ${story.year}
                `.toLowerCase();


            /*
               Check search
            */

            const matchesSearch =
                searchableText.includes(
                    searchTerm.toLowerCase()
                );


            /*
               Check category
            */

            const matchesCategory =
                selectedCategory === "all" ||
                story.category.toLowerCase() ===
                    selectedCategory.toLowerCase();


            /*
               Story must match
               both conditions.
            */

            return (
                matchesSearch &&
                matchesCategory
            );

        }
    );
}


/* =========================================================
   DISPLAY FEATURED STORIES
   ========================================================= */

function displayFeaturedStories() {

    const featuredContainer =
        document.getElementById(
            "featuredStoriesContainer"
        );


    /*
       If the container does not exist,
       stop.
    */

    if (!featuredContainer) {

        return;

    }


    /*
       Get all stories.
    */

    const allStories =
        getAllStories();


    /*
       Select first 3 stories
       as Featured.
    */

    const featuredStories =
        allStories.slice(
            0,
            3
        );


    /*
       Create cards.
    */

    featuredContainer.innerHTML =
        featuredStories
            .map(createStoryCard)
            .join("");
}


/* =========================================================
   12. GET TOTAL PAGES
   ========================================================= */

function getTotalPages() {

    const filteredStories =
        getFilteredStories();


    /*
       If there are no results,
       there are no pages.
    */

    if (
        filteredStories.length === 0
    ) {

        return 0;

    }


    return Math.ceil(
        filteredStories.length /
        storiesPerPage
    );
}


/* =========================================================
   13. UPDATE SEARCH RESULT
   ========================================================= */

function updateSearchResult(
    resultCount
) {

    if (!storySearchResult) {

        return;

    }


    /*
       No search/filter
    */

    if (
        searchTerm === "" &&
        selectedCategory === "all"
    ) {

        storySearchResult.innerHTML =
            `<span>Showing all ${resultCount} stories</span>`;

        return;
    }


    /*
       Search/filter active
    */

    storySearchResult.innerHTML = `
        <span>
            Showing ${resultCount}
            matching
            ${
                resultCount === 1
                    ? "story"
                    : "stories"
            }
        </span>
    `;
}


/* =========================================================
   14. DISPLAY STORIES
   ========================================================= */

function displayStories() {

    if (!storiesContainer) {

        return;

    }


    /*
       Get filtered stories
    */

    const filteredStories =
        getFilteredStories();


    /*
       Update story count
    */

    if (storiesCount) {

        storiesCount.textContent =
            filteredStories.length;

    }


    /*
       Update search result text
    */

    updateSearchResult(
        filteredStories.length
    );


    /*
       No stories found
    */

    if (
        filteredStories.length === 0
    ) {

        storiesContainer.innerHTML = "";

        if (noStoriesFound) {

            noStoriesFound.style.display =
                "block";

        }


        updateNavigation(0);

        return;
    }


    /*
       Stories exist
    */

    if (noStoriesFound) {

        noStoriesFound.style.display =
            "none";

    }


    /*
       Get total pages
    */

    const totalPages =
        getTotalPages();


    /*
       Make sure current page
       is valid.
    */

    if (
        currentPage >= totalPages
    ) {

        currentPage =
            Math.max(
                0,
                totalPages - 1
            );
    }


    /*
       Calculate indexes
    */

    const startIndex =
        currentPage *
        storiesPerPage;


    const endIndex =
        startIndex +
        storiesPerPage;


    /*
       Get current stories
    */

    const currentStories =
        filteredStories.slice(
            startIndex,
            endIndex
        );


    /*
       Create story cards
    */

    storiesContainer.innerHTML =
        currentStories
            .map(createStoryCard)
            .join("");


    /*
       Update arrows
    */

    updateNavigation(
        totalPages
    );
}


/* =========================================================
   15. UPDATE ARROW BUTTONS
   ========================================================= */

function updateNavigation(
    totalPages
) {

    if (
        !storyPrev ||
        !storyNext
    ) {

        return;

    }


    /*
       If there is only one page,
       disable both arrows.
    */

    if (totalPages <= 1) {

        storyPrev.disabled = true;

        storyNext.disabled = true;

        storyPrev.style.opacity =
            "0.4";

        storyNext.style.opacity =
            "0.4";

        return;
    }


    /*
       More than one page
    */

    storyPrev.disabled = false;

    storyNext.disabled = false;

    storyPrev.style.opacity =
        "1";

    storyNext.style.opacity =
        "1";
}


/* =========================================================
   16. NEXT PAGE
   ========================================================= */

function nextStories() {

    const totalPages =
        getTotalPages();


    if (totalPages <= 1) {

        return;

    }


    currentPage++;


    /*
       Go back to first page
       after the last page.
    */

    if (
        currentPage >= totalPages
    ) {

        currentPage = 0;

    }


    displayStories();

    restartAutoSlide();
}


/* =========================================================
   17. PREVIOUS PAGE
   ========================================================= */

function previousStories() {

    const totalPages =
        getTotalPages();


    if (totalPages <= 1) {

        return;

    }


    currentPage--;


    /*
       Go to last page
       from first page.
    */

    if (currentPage < 0) {

        currentPage =
            totalPages - 1;

    }


    displayStories();

    restartAutoSlide();
}


/* =========================================================
   18. START AUTO SLIDE
   ========================================================= */

function startAutoSlide() {

    stopAutoSlide();


    autoSlideInterval =
        setInterval(
            function () {

                /*
                   Do not change cards
                   while mouse is over them.
                */

                if (
                    !isMouseOverStories
                ) {

                    nextStories();

                }

            },
            5000
        );
}


/* =========================================================
   19. STOP AUTO SLIDE
   ========================================================= */

function stopAutoSlide() {

    if (
        autoSlideInterval
    ) {

        clearInterval(
            autoSlideInterval
        );

        autoSlideInterval = null;
    }
}


/* =========================================================
   20. RESTART AUTO SLIDE
   ========================================================= */

function restartAutoSlide() {

    stopAutoSlide();

    startAutoSlide();
}


/* =========================================================
   21. PAUSE ON MOUSE ENTER
   ========================================================= */

function pauseStories() {

    isMouseOverStories = true;

    stopAutoSlide();
}


/* =========================================================
   22. RESUME ON MOUSE LEAVE
   ========================================================= */

function resumeStories() {

    isMouseOverStories = false;

    startAutoSlide();
}


/* =========================================================
   23. TOGGLE FAVORITE
   ========================================================= */

function toggleFavorite(
    storyId,
    button
) {

    /*
       User must be logged in.
    */

    if (
        !requireLogin()
    ) {

        return;

    }


    const userData =
        getStoryUserData();


    if (!userData) {

        return;

    }


    /*
       Make sure favorites exists.
    */

    if (
        !Array.isArray(
            userData.favorites
        )
    ) {

        userData.favorites = [];

    }


    const index =
        userData.favorites.indexOf(
            storyId
        );


    /*
       ADD
    */

    if (index === -1) {

        userData.favorites.push(
            storyId
        );


        button.classList.add(
            "active"
        );


        button.innerHTML =
            `<i class="bi bi-heart-fill"></i>`;

    }


    /*
       REMOVE
    */

    else {

        userData.favorites.splice(
            index,
            1
        );


        button.classList.remove(
            "active"
        );


        button.innerHTML =
            `<i class="bi bi-heart"></i>`;
    }


    /*
       Save to localStorage
    */

    if (
        typeof saveCurrentUserData ===
        "function"
    ) {

        saveCurrentUserData(
            userData
        );

    }
}


/* =========================================================
   24. TOGGLE SAVE
   ========================================================= */

function toggleSave(
    storyId,
    button
) {

    /*
       User must be logged in.
    */

    if (
        !requireLogin()
    ) {

        return;

    }


    const userData =
        getStoryUserData();


    if (!userData) {

        return;

    }


    /*
       Make sure saved exists.
    */

    if (
        !Array.isArray(
            userData.saved
        )
    ) {

        userData.saved = [];

    }


    const index =
        userData.saved.indexOf(
            storyId
        );


    /*
       SAVE
    */

    if (index === -1) {

        userData.saved.push(
            storyId
        );


        button.classList.add(
            "active"
        );


        button.innerHTML =
            `<i class="bi bi-bookmark-fill"></i>`;

    }


    /*
       REMOVE
    */

    else {

        userData.saved.splice(
            index,
            1
        );


        button.classList.remove(
            "active"
        );


        button.innerHTML =
            `<i class="bi bi-bookmark"></i>`;
    }


    /*
       Save to localStorage
    */

    if (
        typeof saveCurrentUserData ===
        "function"
    ) {

        saveCurrentUserData(
            userData
        );

    }
}


/* =========================================================
   25. SEARCH
   ========================================================= */

if (storySearch) {

    storySearch.addEventListener(
        "input",
        function () {

            /*
               Get search value
            */

            searchTerm =
                this.value.trim();


            /*
               Start from first page
            */

            currentPage = 0;


            /*
               Display filtered stories
            */

            displayStories();

        }
    );

}


/* =========================================================
   26. CATEGORY FILTER
   ========================================================= */

if (storyCategory) {

    storyCategory.addEventListener(
        "change",
        function () {

            /*
               Get selected category
            */

            selectedCategory =
                this.value;


            /*
               Start from first page
            */

            currentPage = 0;


            /*
               Display filtered stories
            */

            displayStories();

        }
    );

}


/* =========================================================
   27. CLEAR SEARCH
   ========================================================= */

if (clearStorySearch) {

    clearStorySearch.addEventListener(
        "click",
        function () {

            /*
               Clear search input
            */

            if (storySearch) {

                storySearch.value = "";

            }


            /*
               Reset search
            */

            searchTerm = "";


            /*
               Start from first page
            */

            currentPage = 0;


            /*
               Display all stories
            */

            displayStories();


            /*
               Put cursor back
               inside search box.
            */

            if (storySearch) {

                storySearch.focus();

            }

        }
    );

}


/* =========================================================
   28. CLICK EVENTS
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {


        /* ================================================
           FAVORITE
           ================================================ */

        const favoriteButton =
            event.target.closest(
                ".favorite-btn"
            );


        if (favoriteButton) {

            event.preventDefault();

            event.stopPropagation();


            const storyId =
                favoriteButton.dataset.storyId;


            toggleFavorite(
                storyId,
                favoriteButton
            );


            return;
        }


        /* ================================================
           SAVE
           ================================================ */

        const saveButton =
            event.target.closest(
                ".save-btn"
            );


        if (saveButton) {

            event.preventDefault();

            event.stopPropagation();


            const storyId =
                saveButton.dataset.storyId;


            toggleSave(
                storyId,
                saveButton
            );


            return;
        }


        /* ================================================
           READ STORY
           ================================================ */

        const readStory =
            event.target.closest(
                ".read-story"
            );


        if (readStory) {

            /*
               If logged in,
               allow normal navigation.
            */

            if (
                getLoggedInUser()
            ) {

                return;

            }


            /*
               If not logged in,
               stop navigation.
            */

            event.preventDefault();


            const storyId =
                readStory.dataset.storyId;


            requireLogin(
                `details.html?id=${encodeURIComponent(storyId)}`
            );


            return;
        }


        /* ================================================
           MORE STORIES
           ================================================ */

        const moreStories =
            event.target.closest(
                "#moreStoriesBtn"
            );


        if (moreStories) {

            /*
               Logged in:
               continue normally.
            */

            if (
                getLoggedInUser()
            ) {

                return;

            }


            /*
               Not logged in:
               go to login first.
            */

            event.preventDefault();


            requireLogin(
                "SuccessStories.html"
            );

        }

    }
);


/* =========================================================
   29. PREVIOUS BUTTON
   ========================================================= */

if (storyPrev) {

    storyPrev.addEventListener(
        "click",
        function () {

            previousStories();

        }
    );
}


/* =========================================================
   30. NEXT BUTTON
   ========================================================= */

if (storyNext) {

    storyNext.addEventListener(
        "click",
        function () {

            nextStories();

        }
    );
}


/* =========================================================
   31. STORIES CAROUSEL
   ========================================================= */

const storiesCarousel =
    document.querySelector(
        ".stories-carousel"
    );


if (storiesCarousel) {

    /*
       Stop automatic movement
       when mouse enters.
    */

    storiesCarousel.addEventListener(
        "mouseenter",
        pauseStories
    );


    /*
       Start again when mouse leaves.
    */

    storiesCarousel.addEventListener(
        "mouseleave",
        resumeStories
    );
}


/* =========================================================
   32. REFRESH STORIES
   ========================================================= */

function refreshStories() {

    adminStories = [];

    currentPage = 0;

    getAllStories();

    displayFeaturedStories();

    displayStories();

}


/* =========================================================
   33. START
   ========================================================= */

function initializeStories() {

    if (!storiesContainer) {

        return;

    }


    /*
       Display 3 featured stories
    */

    displayFeaturedStories();


    /*
       Display all stories
    */

    displayStories();


    /*
       Start carousel
    */

    startAutoSlide();

}


initializeStories();

document.querySelectorAll(".story-person-image").forEach(function (img) {
    img.addEventListener("error", function () {
        console.error("Image not found:", img.src);
    });
});