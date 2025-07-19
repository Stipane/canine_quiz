document.addEventListener("DOMContentLoaded", () => {
  // Display the current year in the footer
  document.querySelector(".year").innerHTML = new Date().getFullYear();

  // Get references to HTML elements
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const submitBtn = document.getElementById("submit-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const userAnswer = document.getElementById("userAnswer");
  const scoreDisplay = document.getElementById("score");
  const quizAnswer = document.getElementById("quizAnswer");
  const thankYou = document.getElementById("thank-you");

  // Store the questions in an array of objects
  const questions = [
    {
      question: "Which one of these dog breeds has a black tongue?",
      choices: ["Bloodhound", "Rat Terrier", "Chihuahua", "Chow Chow"],
      answer: "Chow Chow",
    },
    {
      question: "Which dog breed yodels instead of barking?",
      choices: ["Doberman", "Shih Tzu", "Basenji", "Alaskan Malamute"],
      answer: "Basenji",
    },
    {
      question: "Where are dog's sweat glands located?",
      choices: ["Paws", "Nose", "Neck", "Tail"],
      answer: "Paws",
    },
    {
      question: "What breed is Scooby Doo?",
      choices: [
        "German Shepherd",
        "Dalmation",
        "Great Dane",
        "Airedale Terrier",
      ],
      answer: "Great Dane",
    },
    {
      question: "What is the name of the smallest dog breed?",
      choices: ["Corgi", "Poodle", "Pug", "Chihuahua"],
      answer: "Chihuahua",
    },
    {
      question: "Which medical condition affects dogs the most?",
      choices: ["Arthritis", "Obesity", "Anxiety", "Depression"],
      answer: "Obesity",
    },
    {
      question: "Which dog breed is considered the heaviest?",
      choices: ["St. Bernard", "Great Dane", "Newfoundland", "Irish Wolfhound"],
      answer: "St. Bernard",
    },
    {
      question: "Which breed is considered the world's rarest?",
      choices: ["Saluki", "Malamut", "Boston Terrier", "Cesky Terrier"],
      answer: "Cesky Terrier",
    },
    {
      question: "Which human organ do dogs lack?",
      choices: ["Prostate", "Appendix", "Pancreas", "Uterus"],
      answer: "Appendix",
    },
    {
      question: "Which dog's name translates to dwarf dog?",
      choices: ["Mastiff", "Chihuahua", "Dachshund", "Corgi"],
      answer: "Corgi",
    },
    {
      question: "Why dogs curl up when they sleep?",
      choices: [
        "To make themselves invisible",
        "To ease aches & pains",
        "To protect their organs",
        "To show dominance",
      ],
      answer: "To protect their organs",
    },
  ];

  submitBtn.addEventListener("click", showResult);

  let userAnswers = Array(questions.length).fill(null);
  // Initially display the main content showing the instructions for the quiz
  showMain();

  // Function to hide the main content
  function hideMain() {
    document.querySelector(".main").classList.add("hidden");
  }

  // Function to show the main content
  function showMain() {
    document.querySelector(".main").classList.remove("hidden");
  }

  // Initialize the quiz
  let currentQuestionIndex = 0;
  let score = 0;
  startBtn.addEventListener("click", startQuiz);
  startBtn.addEventListener("click", hideMain);
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });

  // Function to start the quiz
  function startQuiz() {
    startBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  // Function to display the current question and choices
  function showQuestion() {
    nextBtn.classList.add("hidden");
    prevBtn.classList.toggle("hidden", currentQuestionIndex === 0);
    nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; // Clear previous choices
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      // If user already answered this question
      if (userAnswers[currentQuestionIndex] === choice) {
        li.classList.add("selected");
        if (choice === questions[currentQuestionIndex].answer) {
          li.classList.add("correct");
        } else {
          li.classList.add("incorrect");
          // Show the correct one
          const correct = questions[currentQuestionIndex].answer;
          if (choice !== correct) {
            // add correct to correct choice
            if (choice !== correct) {
              // Mark correct answer
              setTimeout(() => {
                [...choicesList.children].forEach((otherLi) => {
                  if (otherLi.textContent === correct) {
                    otherLi.classList.add("correct");
                  }
                });
              }, 0);
            }
            if (currentQuestionIndex < questions.length - 1) {
              nextBtn.classList.remove("hidden");
            } else {
              submitBtn.classList.remove("hidden");
            }
          }
        }
      }
      li.addEventListener("click", (event) => selectChoice(event, choice));
      choicesList.appendChild(li);
    });
    // Determine if this is the last question
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    nextBtn.classList.toggle("hidden", isLastQuestion);
    submitBtn.classList.toggle("hidden", !isLastQuestion);
  }

  // Function to handle choice selection
  function selectChoice(event, choice) {
    nextBtn.disabled = false;

    const selectedChoice = event.target;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const previousAnswer = userAnswers[currentQuestionIndex];
    // Remove previous styling
    [...choicesList.children].forEach((li) => {
      li.classList.remove("correct", "incorrect", "selected");
    });

    // Update the answer
    userAnswers[currentQuestionIndex] = choice;

    // Adjust score if changed answer
    if (previousAnswer !== choice) {
      if (previousAnswer === correctAnswer) score--;
      if (choice === correctAnswer) score++;
    }

    selectedChoice.classList.add("selected");

    // Disable all choices after selection and show the next button
    if (currentQuestionIndex < questions.length - 1) {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    } else {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    }
    prevBtn.classList.remove("hidden");
    choicesList
      .querySelectorAll("li")
      .forEach((li) => li.removeEventListener("click", selectChoice));
  }
  
  // Function to display the result after the quiz is completed
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `Your score: ${score} / ${questions.length} (${(
      (score / questions.length) *
      100
    ).toFixed(2)}%)`;

    userAnswer.innerHTML = "<h3>Your Answers:</h3>";
    quizAnswer.innerHTML = "<h3>Correct Answers:</h3>";

    // Map through the answers array and display the users answers on the page
    userAnswers.map((answer, i) => {
      const isCorrect = answer === questions[i].answer;
      userAnswer.innerHTML += `<h4 style="background-color: ${
        isCorrect ? "green" : "red"
      }">${i + 1}. ${answer}</h4>`;
    });

    // Map through the questions array and display the correct answers on the page
    questions.map((question, i) => {
      return (quizAnswer.innerHTML += `<h4>${i + 1}. ${question.answer}</h4>`);
    });
    thankYou.innerHTML = `<h2>Thank you for taking the quiz!</h2>`;
  }

  // Function to restart the quiz
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(questions.length).fill(null);
    resultContainer.classList.add("hidden");
    questionContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
    showMain();
  });
});
