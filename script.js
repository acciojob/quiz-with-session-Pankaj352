const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous answers from session storage
const savedAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render Questions
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    
    q.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      if (savedAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      choiceElement.addEventListener("change", () => saveAnswer(i, choice));
      
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    
    questionsElement.appendChild(questionDiv);
  });
}

// Save Answer to Session Storage
function saveAnswer(questionIndex, answer) {
  savedAnswers[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(savedAnswers));
}

// Calculate and Display Score
function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedAnswers[i] === q.answer) {
      score++;
    }
  });
  scoreElement.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
}

// Load previous score if available
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your last score was ${savedScore} out of 5.`;
}

submitButton.addEventListener("click", submitQuiz);

// Initialize quiz
renderQuestions();