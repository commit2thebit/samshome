
const questions = [
    {
        question: "How often do you host guests?",
        options: [
            { text: "Rarely", description: "Netflix and chill doesn’t count as hosting." },
            { text: "Occasionally", description: "Wine night for two is hosting, right?" },
            { text: "Frequently", description: "People don’t leave your house till 2 AM. Every weekend." }
        ],
        category: "hosting",
    },
    {
        question: "How often do you cook at home?",
        options: [
            { text: "LOL, what’s a stove?", description: "Takeout life forever." },
            { text: "Does pasta count as cooking?", description: "Boiling water is a skill." },
            { text: "I’d sprinkle in some cooking if my GF wanted to", description: "Smooth operator." },
            { text: "Where’s my Michelin star?", description: "Gordon Ramsay, who?" }
        ],
        category: "cooking",
    },
    {
        question: "How important is music in your life?",
        options: [
            { text: "Background noise is fine.", description: "Silence is awkward, sure." },
            { text: "I like my tunes.", description: "Casual Spotify playlists for the win." },
            { text: "Whole-house concert vibes. Give me the good stuff.", description: "Bring the party to every room." },
            { text: "Girlfriend says record player will get you some serious ROI. ;)", description: "P.S. She's right." }
        ],
        category: "music",
    },
];

let currentQuestionIndex = 0;
let scores = {
    hosting: 0,
    cooking: 0,
    music: 0,
};

function showIntroPage() {
    document.getElementById("intro-page").classList.remove("hidden");
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("results-container").classList.add("hidden");
}

function startQuiz() {
    try {
        document.getElementById("intro-page").classList.add("hidden");
        showQuestion();
    } catch (error) {
        console.error("Error starting quiz:", error);
        alert("Something went wrong! Please try refreshing the page.");
    }
}

function showQuestion() {
    try {
        const questionContainer = document.getElementById("question-container");
        questionContainer.classList.remove("hidden");
        const currentQuestion = questions[currentQuestionIndex];

        questionContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            <div>
                ${currentQuestion.options
                    .map(
                        (option, index) => `
                        <button class="option-btn" onclick="selectOption(${index}, this)">
                            ${option.text}
                            <small>${option.description}</small>
                        </button>
                    `
                    )
                    .join("")}
            </div>
        `;
    } catch (error) {
        console.error("Error displaying question:", error);
        alert("Something went wrong! Please try refreshing the page.");
    }
}

function selectOption(index, button) {
    try {
        // Highlight selected button
        button.style.backgroundColor = "#d4edda";
        button.style.color = "#155724";

        const category = questions[currentQuestionIndex].category;
        scores[category] += index + 1; // Scoring system: higher index = higher priority
        console.log(`Updated scores:`, scores); // Debugging: Log scores after every selection
        currentQuestionIndex++;

        // Delay to show feedback before navigating to next question
        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }, 300);
    } catch (error) {
        console.error("Error processing selection:", error);
        alert("Something went wrong! Please try refreshing the page.");
    }
}

function showResults() {
    try {
        const resultsContainer = document.getElementById("results-container");
        const questionContainer = document.getElementById("question-container");
        questionContainer.classList.add("hidden");
        resultsContainer.classList.remove("hidden");

        const procureItems = [
            "<li>Bottle Opener: <a href='https://www.lecreuset.com/'>Le Creuset Waiter's Friend</a></li>",
            ...(scores.hosting > 3
                ? ["<li>High-end Chess Set: <a href='https://www.hermes.com/us/en/'>Hermès Chess Set</a></li>"]
                : []),
            ...(scores.music > 3
                ? ["<li>Record Player: <a href='https://www.project-audio.com/en/product/debut-carbon-evo/'>Pro-Ject Debut Carbon EVO</a></li>"]
                : []),
            ...(scores.hosting <= 3 && scores.music <= 3
                ? ["<li>Wine Glasses: <a href='https://www.riedel.com/en-us'>Riedel</a></li>"]
                : []),
        ];

        const wishlistItems = [
            "<li>High-end Chess Set: <a href='https://www.hermes.com/us/en/'>Hermès Chess Set</a></li>",
            ...(scores.cooking > 3
                ? ["<li>Cookware Set: <a href='https://www.carawayhome.com/'>Caraway Cookware</a></li>"]
                : []),
            ...(scores.hosting > 3
                ? ["<li>Barware Set: <a href='https://www.williams-sonoma.com/'>Williams Sonoma</a></li>"]
                : []),
            ...(scores.music > 3
                ? ["<li>Portable Speaker: <a href='https://www.sonos.com/en-us/shop/move.html'>Sonos Move</a></li>"]
                : []),
            ...(scores.cooking <= 3 && scores.hosting <= 3 && scores.music <= 3
                ? ["<li>Outdoor Fire Pit: <a href='https://www.solostove.com/'>Solo Stove Bonfire</a></li>"]
                : []),
        ];

        // Ensure results container is properly defined in HTML
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = `
            <h3>Procure ASAP:</h3>
            <ul>${procureItems.join("")}</ul>
            <h3>Shop Around/Wishlist:</h3>
            <ul>${wishlistItems.join("")}</ul>
        `;
        console.log("Results rendered successfully."); // Debugging
    } catch (error) {
        console.error("Error displaying results:", error);
        alert("Something went wrong! Please try refreshing the page.");
    }
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

// Initialize the quiz
showIntroPage();
