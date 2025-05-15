let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

fetch("./questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  clearOptions();
  document.getElementById("question-count").textContent =
  `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;

  q.options.forEach((option, index) => {
    // TODO:
    // 1. Create a button element
    const btn = document.createElement("btn");
    // 2. Set the button's text to the option
    btn.textContent = option;
    // 3. Add a class to style it
    btn.classList.add("option");
    // 4. Add an onclick event that calls checkAnswer(index)
    btn.addEventListener("click", function(){ checkAnswer(index) });
    // 5. Add the button to the optionsContainer
    optionsContainer.appendChild(btn);
});
}

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestionIndex].answer;
  if (selectedIndex === correct) {
    score++;
  }
  nextBtn.disabled = false;
  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.backgroundColor = "#a4edba";
    if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
  });
}

function clearOptions() {
  // INPUT YOUR CODE HERE
  // HINT
  // 1. Clear the contents of the options container
  for (const child of optionsContainer.children){
    optionsContainer.removeChild(child);
  }
  nextBtn.disabled = true;
}

nextBtn.addEventListener("click", () => {
  // INPUT YOUR CODE HERE
  // HINT
  // 1. Move to the next question by increasing the question index
  currentQuestionIndex++;
  // 2. If there are questions left, show the next one
  if (currentQuestionIndex < questions.length){
    showQuestion();
  }
  // 3. Otherwise, call a function to show the final result
  else{
    showResult();
  }
});


function showResult() {
  document.querySelector(".quiz-box").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
}
