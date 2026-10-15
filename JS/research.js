
/* =========================================================
   RESPAIR DAWN — RESEARCH & DISCOVERY
   ========================================================= */
(function () {
    "use strict";


/*
  IMPORTANT:
  The AI chat needs a secure server-side API endpoint.
  Do not put an OpenAI API key in this public JavaScript file.

  After deploying your API function, replace the empty string
  with its full HTTPS URL.
*/
const AI_CHAT_ENDPOINT = "";

/* =========================================================
   1. INTEREST AREAS
   ========================================================= */

const researchAreas = {
    programming: {
        title: "Programming & Software Development",
        shortTitle: "Programming",
        icon: "bi-code-slash",
        description:
            "You may enjoy building applications, solving logical problems, and turning ideas into working software.",
        courseKeywords: [
            "programming", "python", "javascript", "software",
            "web development", "coding", "computer science"
        ]
    },

    ai: {
        title: "Artificial Intelligence",
        shortTitle: "Artificial Intelligence",
        icon: "bi-robot",
        description:
            "You may enjoy exploring intelligent systems, learning from data, and creating solutions that recognize patterns.",
        courseKeywords: [
            "artificial intelligence", "machine learning", "deep learning",
            "data science", "computer vision", "ai"
        ]
    },

    cybersecurity: {
        title: "Cybersecurity",
        shortTitle: "Cybersecurity",
        icon: "bi-shield-lock",
        description:
            "You may enjoy understanding how systems can be protected, finding weaknesses, and investigating security problems.",
        courseKeywords: [
            "cybersecurity", "security", "cryptography", "network",
            "ethical hacking", "penetration testing", "privacy"
        ]
    },

    design: {
        title: "Design & Creative Technology",
        shortTitle: "Design",
        icon: "bi-palette",
        description:
            "You may enjoy visual communication, creative problem-solving, and designing clear, useful digital experiences.",
        courseKeywords: [
            "design", "ui", "ux", "graphic", "creative",
            "figma", "visual"
        ]
    },

    research: {
        title: "Research & Analytical Thinking",
        shortTitle: "Research",
        icon: "bi-search",
        description:
            "You may enjoy asking questions, examining evidence, comparing explanations, and discovering how things work.",
        courseKeywords: [
            "research", "data analysis", "statistics", "scientific",
            "analytics", "academic", "critical thinking"
        ]
    },

    leadership: {
        title: "Leadership & Communication",
        shortTitle: "Leadership",
        icon: "bi-people",
        description:
            "You may enjoy organizing ideas, supporting people, explaining concepts, and helping a team move toward a goal.",
        courseKeywords: [
            "leadership", "communication", "management",
            "teamwork", "project management", "presentation"
        ]
    }
};

/* =========================================================
   2. TEN DISCOVERY QUESTIONS

   Each answer gives two points to one interest area.
   This is a self-reflection tool, not a scientific diagnosis.
   ========================================================= */

const researchQuestions = [
    {
        category: "CURIOSITY",
        title: "What kind of challenge makes you curious?",
        subtitle: "Think about the problems you would enjoy exploring.",
        options: [
            { text: "Building an application that solves a real problem", scores: ["programming"] },
            { text: "Discovering how machines can learn from information", scores: ["ai"] },
            { text: "Finding weaknesses and protecting a system", scores: ["cybersecurity"] },
            { text: "Creating an original idea or visual experience", scores: ["design"] }
        ]
    },
    {
        category: "LEARNING STYLE",
        title: "Which activity would you most enjoy learning?",
        subtitle: "Choose the activity you would willingly spend time practising.",
        options: [
            { text: "Writing code and improving how a program works", scores: ["programming"] },
            { text: "Analysing evidence to understand a difficult question", scores: ["research"] },
            { text: "Testing how secure a digital system is", scores: ["cybersecurity"] },
            { text: "Designing a clear and attractive digital interface", scores: ["design"] }
        ]
    },
    {
        category: "PROBLEM SOLVING",
        title: "When you face a difficult problem, what interests you most?",
        subtitle: "Imagine you have enough time to investigate it.",
        options: [
            { text: "Breaking the problem into logical steps", scores: ["programming"] },
            { text: "Looking for patterns in data", scores: ["ai"] },
            { text: "Examining evidence and testing possible explanations", scores: ["research"] },
            { text: "Helping people cooperate to find a solution", scores: ["leadership"] }
        ]
    },
    {
        category: "FUTURE PROJECTS",
        title: "Which project sounds most exciting?",
        subtitle: "Choose the project you would most like to try.",
        options: [
            { text: "Creating a useful website or software tool", scores: ["programming"] },
            { text: "Developing a system that recognises patterns", scores: ["ai"] },
            { text: "Researching encryption and digital privacy", scores: ["cybersecurity"] },
            { text: "Designing a creative and easy-to-use product", scores: ["design"] }
        ]
    },
    {
        category: "THINKING STYLE",
        title: "Which question would you most like to investigate?",
        subtitle: "There is no wrong choice.",
        options: [
            { text: "How can I make this software more efficient?", scores: ["programming"] },
            { text: "What can this data reveal that we have not noticed?", scores: ["ai", "research"] },
            { text: "How could an attacker misuse this system, and how can we prevent it?", scores: ["cybersecurity"] },
            { text: "How can I explain this idea more clearly to people?", scores: ["design", "leadership"] }
        ]
    },
    {
        category: "WORK ENVIRONMENT",
        title: "Which type of work sounds most satisfying?",
        subtitle: "Think about the work itself, not its popularity.",
        options: [
            { text: "Developing and improving technical solutions", scores: ["programming"] },
            { text: "Experimenting with models and intelligent tools", scores: ["ai"] },
            { text: "Investigating risks and improving protection", scores: ["cybersecurity"] },
            { text: "Coordinating people and communicating ideas", scores: ["leadership"] }
        ]
    },
    {
        category: "CREATIVITY",
        title: "How would you prefer to express a new idea?",
        subtitle: "Imagine you are starting a project from scratch.",
        options: [
            { text: "Turn it into a working program", scores: ["programming"] },
            { text: "Use data to test whether it works", scores: ["ai", "research"] },
            { text: "Build it with a focus on safety and trust", scores: ["cybersecurity"] },
            { text: "Shape its visual design and user experience", scores: ["design"] }
        ]
    },
    {
        category: "IMPACT",
        title: "What kind of contribution matters most to you?",
        subtitle: "Choose the outcome that motivates you.",
        options: [
            { text: "Building tools that save people time", scores: ["programming"] },
            { text: "Creating smarter ways to solve complex problems", scores: ["ai"] },
            { text: "Helping people and organisations stay secure", scores: ["cybersecurity"] },
            { text: "Sharing knowledge and helping a team succeed", scores: ["research", "leadership"] }
        ]
    },
    {
        category: "PERSISTENCE",
        title: "Which challenge would you be willing to work through?",
        subtitle: "Think about the kind of difficulty you find worthwhile.",
        options: [
            { text: "Debugging a program until it works correctly", scores: ["programming"] },
            { text: "Improving a model through repeated experiments", scores: ["ai"] },
            { text: "Investigating a complicated security issue", scores: ["cybersecurity", "research"] },
            { text: "Reworking a design after receiving feedback", scores: ["design", "leadership"] }
        ]
    },
    {
        category: "YOUR NEXT CHAPTER",
        title: "What would you most like to explore next?",
        subtitle: "Choose a direction you are genuinely curious about.",
        options: [
            { text: "Software development and programming projects", scores: ["programming"] },
            { text: "Artificial intelligence and machine learning", scores: ["ai"] },
            { text: "Cybersecurity, cryptography, and digital defence", scores: ["cybersecurity"] },
            { text: "Research, creative design, or leading projects", scores: ["research", "design", "leadership"] }
        ]
    }
];

/* =========================================================
   3. DOM ELEMENTS
   ========================================================= */

const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const testProgress = document.getElementById("testProgress");
const testProgressBar = document.getElementById("testProgressBar");

const questionCategory = document.getElementById("questionCategory");
const questionTitle = document.getElementById("questionTitle");
const questionSubtitle = document.getElementById("questionSubtitle");
const answerOptions = document.getElementById("answerOptions");

const previousQuestionButton = document.getElementById("previousQuestion");
const nextQuestionButton = document.getElementById("nextQuestion");
const testValidation = document.getElementById("testValidation");

const researchResults = document.getElementById("researchResults");
const interestMap = document.getElementById("interestMap");
const recommendedCourses = document.getElementById("recommendedCourses");

let currentQuestionIndex = 0;
let userAnswers = Array(researchQuestions.length).fill(null);

/* =========================================================
   4. RENDER A QUESTION
   ========================================================= */

function renderQuestion() {
    const question = researchQuestions[currentQuestionIndex];
    const selectedIndex = userAnswers[currentQuestionIndex];

    const progress = Math.round(
        ((currentQuestionIndex + 1) / researchQuestions.length) * 100
    );

    questionCounter.textContent =
        `QUESTION ${currentQuestionIndex + 1} OF ${researchQuestions.length}`;

    progressPercent.textContent = `${progress}%`;
    testProgress.style.width = `${progress}%`;
    testProgressBar.setAttribute("aria-valuenow", String(progress));

    questionCategory.textContent = question.category;
    questionTitle.textContent = question.title;
    questionSubtitle.textContent = question.subtitle;

    answerOptions.replaceChildren();

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";

        if (selectedIndex === index) {
            button.classList.add("selected");
        }

        button.setAttribute("aria-pressed", String(selectedIndex === index));

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.className = "option-text";
        text.textContent = option.text;

        const check = document.createElement("i");
        check.className = "bi bi-check-circle-fill option-check";

        button.append(letter, text, check);

        button.addEventListener("click", () => {
            userAnswers[currentQuestionIndex] = index;
            testValidation.textContent = "";
            renderQuestion();
        });

        answerOptions.appendChild(button);
    });

    previousQuestionButton.disabled = currentQuestionIndex === 0;

    nextQuestionButton.disabled = selectedIndex === null;

    nextQuestionButton.innerHTML =
        currentQuestionIndex === researchQuestions.length - 1
            ? 'View My Results <i class="bi bi-arrow-right ms-2"></i>'
            : 'Next Question <i class="bi bi-arrow-right ms-2"></i>';

    testValidation.textContent = "";
}

/* =========================================================
   5. NAVIGATION
   ========================================================= */

previousQuestionButton.addEventListener("click", () => {
    if (currentQuestionIndex === 0) return;

    currentQuestionIndex--;
    renderQuestion();
});

nextQuestionButton.addEventListener("click", () => {
    if (userAnswers[currentQuestionIndex] === null) {
        testValidation.textContent = "Please choose an answer to continue.";
        return;
    }

    if (currentQuestionIndex < researchQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        return;
    }

    calculateResearchResults();
});

/* =========================================================
   6. CALCULATE RESULTS
   ========================================================= */

function calculateResearchResults() {
    const scores = {};

    Object.keys(researchAreas).forEach(area => {
        scores[area] = 0;
    });

    userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex === null) return;

        const selectedOption =
            researchQuestions[questionIndex].options[answerIndex];

        selectedOption.scores.forEach(area => {
            if (Object.prototype.hasOwnProperty.call(scores, area)) {
                scores[area] += 1;
            }
        });
    });

    const sortedAreas = Object.keys(scores).sort((a, b) => {
        return scores[b] - scores[a] || a.localeCompare(b);
    });

    const result = {
        scores,
        ranking: sortedAreas,
        topArea: sortedAreas[0],
        answers: userAnswers.slice(),
        completedAt: new Date().toISOString()
    };

    /*
      Keep the storage keys used by the existing project.
      These keys are also commonly used by the Trainings flow.
    */
    try {
        localStorage.setItem("respairResearchCompleted", "true");
        localStorage.setItem("respairResearchResult", JSON.stringify(result));
    } catch (error) {
        console.error("Could not save research results:", error);
    }

    renderResults(result);

    document.getElementById("interest-test").hidden = true;
    researchResults.hidden = false;

    researchResults.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* =========================================================
   7. DISPLAY RESULTS
   ========================================================= */

function renderResults(result) {
    const topArea = researchAreas[result.topArea];

    document.getElementById("topAreaTitle").textContent = topArea.title;
    document.getElementById("topAreaDescription").textContent =
        topArea.description;

    document.getElementById("topAreaIcon").innerHTML =
        `<i class="bi ${topArea.icon}"></i>`;

    const topScore = result.scores[result.topArea];

    document.getElementById("topAreaScore").textContent =
        `${topScore} points`;

    /*
      Scores count selected interests, not percentages.
      The maximum varies by area because some answers cover
      more than one area.
    */
    const maximumScore = Math.max(
        1,
        ...Object.values(result.scores)
    );

    document.getElementById("topAreaProgress").style.width =
        `${(topScore / maximumScore) * 100}%`;

    interestMap.replaceChildren();

    result.ranking.forEach(area => {
        const data = researchAreas[area];
        const score = result.scores[area];

        const row = document.createElement("article");
        row.className = "interest-row";

        const top = document.createElement("div");
        top.className = "interest-row-top";

        const name = document.createElement("div");
        name.className = "interest-row-name";

        const icon = document.createElement("i");
        icon.className = `bi ${data.icon}`;

        const title = document.createElement("span");
        title.textContent = data.shortTitle;

        name.append(icon, title);

        const scoreText = document.createElement("span");
        scoreText.className = "interest-row-score";
        scoreText.textContent = `${score} points`;

        top.append(name, scoreText);

        const progress = document.createElement("div");
        progress.className = "progress";

        const bar = document.createElement("div");
        bar.className = "progress-bar";
        bar.style.width = `${(score / maximumScore) * 100}%`;

        progress.appendChild(bar);
        row.append(top, progress);
        interestMap.appendChild(row);
    });

    renderRecommendedCourses(result.ranking);
}

/* =========================================================
   8. RECOMMEND COURSES FROM SAVED TRAINING DATA
   ========================================================= */

function readSavedTrainings() {
    /*
      The project may use different training storage shapes.
      This function checks known storage keys without changing
      the stored data.
    */
    const keys = [
        "respairTrainings",
        "respairSavedTrainings"
    ];

    for (const key of keys) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) continue;

            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed)) return parsed;

            if (parsed && Array.isArray(parsed.trainings)) {
                return parsed.trainings;
            }
        } catch (error) {
            console.warn(`Unable to read ${key}:`, error);
        }
    }

    return [];
}

function getTrainingText(training) {
    return [
        training.title,
        training.name,
        training.courseName,
        training.description,
        training.category,
        training.topic
    ]
        .filter(value => typeof value === "string")
        .join(" ")
        .toLowerCase();
}

function getTrainingLink(training) {
    const possibleLinks = [
        training.url,
        training.link,
        training.href,
        training.detailsUrl
    ];

    return possibleLinks.find(link =>
        typeof link === "string" &&
        link.trim() &&
        !link.trim().toLowerCase().startsWith("javascript:")
    ) || "index.html#trainings";
}

function renderRecommendedCourses(ranking) {
    recommendedCourses.replaceChildren();

    const trainings = readSavedTrainings();

    /*
      Prefer actual saved training records. Do not fabricate
      course titles or pretend that a course exists.
    */
    const matched = [];

    ranking.forEach(area => {
        const keywords = researchAreas[area].courseKeywords;

        const candidates = trainings.filter(training => {
            if (!training || typeof training !== "object") return false;

            const text = getTrainingText(training);

            return keywords.some(keyword => text.includes(keyword));
        });

        candidates.slice(0, 2).forEach(training => {
            const identity = training.id ||
                training.slug ||
                training.title ||
                training.name;

            if (!matched.some(item => item.identity === identity)) {
                matched.push({ area, training, identity });
            }
        });
    });

    if (matched.length === 0) {
        const message = document.createElement("div");
        message.className = "col-12";

        const panel = document.createElement("div");
        panel.className = "course-recommendation";

        const title = document.createElement("h3");
        title.textContent = "Explore your learning options";

        const description = document.createElement("p");
        description.textContent =
            "Your results are ready. Visit Trainings to explore available courses. " +
            "Once your course data is connected, matching courses can appear here.";

        const link = document.createElement("a");
        link.href = "index.html#trainings";
        link.textContent = "Explore Trainings →";

        panel.append(title, description, link);
        message.appendChild(panel);
        recommendedCourses.appendChild(message);
        return;
    }

    matched.slice(0, 6).forEach(({ area, training }) => {
        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("article");
        card.className = "course-recommendation";

        const iconBox = document.createElement("div");
        iconBox.className = "course-recommendation-icon";

        const icon = document.createElement("i");
        icon.className = `bi ${researchAreas[area].icon}`;
        iconBox.appendChild(icon);

        const title = document.createElement("h3");
        title.textContent =
            training.title ||
            training.name ||
            training.courseName ||
            "Explore this course";

        const description = document.createElement("p");
        description.textContent =
            typeof training.description === "string" &&
            training.description.trim()
                ? training.description
                : `Explore learning opportunities related to ${researchAreas[area].shortTitle}.`;

        const link = document.createElement("a");
        link.href = getTrainingLink(training);
        link.textContent = "Explore course →";

        card.append(iconBox, title, description, link);
        column.appendChild(card);
        recommendedCourses.appendChild(column);
    });
}

/* =========================================================
   9. RETAKE TEST
   ========================================================= */

document.getElementById("retakeTest").addEventListener("click", () => {
    currentQuestionIndex = 0;
    userAnswers = Array(researchQuestions.length).fill(null);

    researchResults.hidden = true;
    document.getElementById("interest-test").hidden = false;

    renderQuestion();

    document.getElementById("interest-test").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

/* =========================================================
   10. CHAT INTERFACE
   ========================================================= */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendChatMessage = document.getElementById("sendChatMessage");

function addChatMessage(message, role) {
    const wrapper = document.createElement("div");
    wrapper.className =
        role === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";

    if (role !== "user") {
        const avatar = document.createElement("div");
        avatar.className = "message-avatar";

        const icon = document.createElement("i");
        icon.className = "bi bi-stars";

        avatar.appendChild(icon);
        wrapper.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = message;

    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return wrapper;
}

function setChatBusy(busy) {
    sendChatMessage.disabled = busy;
    chatInput.disabled = busy;

    sendChatMessage.innerHTML = busy
        ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>'
        : '<i class="bi bi-arrow-up"></i>';
}

async function requestAIResponse(message) {
    if (!AI_CHAT_ENDPOINT) {
        throw new Error(
            "The AI service has not been connected yet. " +
            "The chat interface is ready, but a secure API endpoint " +
            "must be configured before it can generate AI responses."
        );
    }

    const response = await fetch(AI_CHAT_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            context: {
                page: "research",
                researchResult: (() => {
                    try {
                        return JSON.parse(
                            localStorage.getItem("respairResearchResult") || "null"
                        );
                    } catch {
                        return null;
                    }
                })()
            }
        })
    });

    if (!response.ok) {
        throw new Error(
            `The AI service returned an error (${response.status}).`
        );
    }

    const data = await response.json();

    if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The AI service returned an empty response.");
    }

    return data.reply.trim();
}

async function sendUserMessage(message) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    addChatMessage(cleanMessage, "user");
    chatInput.value = "";
    setChatBusy(true);

    try {
        const reply = await requestAIResponse(cleanMessage);
        addChatMessage(reply, "assistant");
    } catch (error) {
        console.error("Research AI chat error:", error);

        addChatMessage(
            error.message ||
            "The assistant is temporarily unavailable. Please try again later.",
            "assistant"
        );
    } finally {
        setChatBusy(false);
        chatInput.focus();
    }
}

chatForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (sendChatMessage.disabled) return;

    await sendUserMessage(chatInput.value);
});

/* Suggested questions */
document.querySelectorAll(".prompt-chip").forEach(button => {
    button.addEventListener("click", () => {
        if (chatInput.disabled) return;

        const prompt = button.dataset.prompt || "";
        chatInput.value = prompt;
        chatInput.focus();

        /*
          Fill the input only. The user can review and send it.
        */
    });
});

/* Clear the chat */
document.getElementById("clearChat").addEventListener("click", () => {
    if (sendChatMessage.disabled) return;

    chatMessages.replaceChildren();

    addChatMessage(
        "Hello! I'm here to help you explore your interests and learning options. What would you like to discover today?",
        "assistant"
    );
});

/* =========================================================
   11. INITIALIZE
   ========================================================= */



renderQuestion();

/*
  Restore a previously completed result if one exists.
  Do not automatically skip the test; the learner can still
  retake it or view their saved results using the saved data.
*/
try {
    const savedResult = localStorage.getItem("respairResearchResult");

    if (savedResult) {
        const parsedResult = JSON.parse(savedResult);

        if (
            parsedResult &&
            parsedResult.scores &&
            parsedResult.ranking &&
            researchAreas[parsedResult.topArea]
        ) {
            // Saved results remain available to other project pages.
            // The test opens fresh so users can retake it at any time.
        }
    }
} catch (error) {
    console.warn("Could not restore saved research data:", error);
}
})();