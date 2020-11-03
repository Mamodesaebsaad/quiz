// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const submit = document.getElementById("submit");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
  {
    question: "In what year was the first iphone released?",
    choice: ["2007", "2010", "2000", "2004"],
    correct: "0",
  },
  {
    question: "The tallest building in the world is located in which city?",
    choice: [
      "Paris (Eiffel Tower)",
      "New York (Statue of Liberty)",
      "Dubai (Burj Khalifa)",
      "Egypt (Pyramid)",
    ],
    correct: "2",
  },
  {
    question:
      "In the Harry Potter book series, which character is described as having a “wild, tangled beard”?",
    choice: ["Harry", "Dumbledore", "Hagrid", "Voldemort"],
    correct: "2",
  },
  {
    question: "What is the busiest airport in Britain called?",
    choice: ["Gatwick", "London Heathrow", "John F. Kennedy", "Stewart"],
    correct: "1",
  },
  {
    question: "How many hearts does an octopus have?",
    choice: ["Three", "One", "Two", "Eight"],
    correct: "0",
  },
];

// load questionq
//gets access to the quest then change the innerHTML of the right elem
let i = 0;
let currentQuestion = 0; //index of the first quest - zero
function renderQuestion() {
  let q = questions[currentQuestion];

  // question.innerHTML = "<p>" + q.question + "</p>";
  // choiceA.innerHTML = `<input type="radio" name = "ans${currentQuestion}"  id="ans" value = "q.choice[i]">` + q.choice[i];
  // choiceB.innerHTML = `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "q.choice[i + 1]">` + q.choice[i + 1];
  // choiceC.innerHTML = `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "q.choice[i + 2]">` + q.choice[i + 2];
  // choiceD.innerHTML = `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "q.choice[i + 3]">` + q.choice[i + 3];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML =
    `<input type="radio" name = "ans${currentQuestion}"  id="ans" value = "0">` +
    q.choice[i];
  choiceB.innerHTML =
    `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "1">` +
    q.choice[i + 1];
  choiceC.innerHTML =
    `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "2">` +
    q.choice[i + 2];
  choiceD.innerHTML =
    `<input type="radio" name = "ans${currentQuestion}" id="ans"  value = "3">` +
    q.choice[i + 3];
}

//when page is loaded click on start quiz
start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  quiz.style.display = "block";
  renderQuestion();

  if (currentQuestion == 0) {
    prev.style.display = "none";
  }
}

if (currentQuestion == 0) {
  prev.style.display = "none";
}
if (currentQuestion > 0) {
  prev.style.display = "block";
}
// checkAnwer
let numCorrect = 0;
let lastQuestion = questions.length - 1; //index of the last quest

//progress bar
function progressBar(n) {
  var prog = 100 / questions.length;
  n *= prog;
  let progress = document.getElementById("progress");
  if (currentQuestion === 0) {
    progress.style.width = prog + "%";
  } else {
    progress.style.width = n + "%";
  }
}

function previous() {
  if (currentQuestion > 0) {
    renderQuestion();
    currentQuestion--;
    progressBar(currentQuestion);
    prev.style.display = "inline-block";
    console.log(currentQuestion);
  }
  if (currentQuestion == 0) {
    renderQuestion();
    prev.style.display = "none";
    console.log(currentQuestion);
  }
  if(currentQuestion < lastQuestion){
    next.style.display = "inline-block";
  }
}

let arr = [];
viewAnswer = () => {
  var element = document.getElementsByTagName("input");

  for (let i = 0; i < element.length; i++) {
    if ((element[i].type = "radio")) {
      if (element[i].checked) {
        console.log(element[i].value);
        arr.push(element[i].value);
      }
    }
  }
  console.log("In Array: " + arr);
};

function nextBtn() {
  if (currentQuestion <= lastQuestion) {
    viewAnswer();
    currentQuestion++;
    renderQuestion();
    //submit.style.display = "none";
    progressBar(currentQuestion);

    if (currentQuestion > 0) {
      prev.style.display = "inline-block";
    }
  }

  if (currentQuestion >= lastQuestion) {
    next.style.display = "none";
  }
  
}

function submitBtn() {
  console.log(arr);
  console.log(currentQuestion);
  console.log(lastQuestion);
  if (currentQuestion == lastQuestion) {
    viewAnswer();
    // submit.style.display = "inline-block";
    // next.style.display = "none";
    checkAnswer();
    scoreRender();
  }
}

//score render
let score = 0;
function scoreRender() {
  scoreDiv.style.display = "block";
  //clculate amt of quest percent answered
  const scorePercent = Math.round((100 * score) / questions.length);
  scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>";
}

//check answer
function checkAnswer() {
  // let arr=[];
  // for (let i = 0; i < questions.length; i++) {
  //   var answers = (document.querySelectorAll(`input[name=ans${i}]:checked`) || {});
  //   arr.push(answers);

  // }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == questions[i].correct) {
      console.log("correct answer will be here");
      score++
    }
    else{
      console.log("Incorrect answer");
    }
  }

  // console.log(arr + "array found in checkAnswer");
  // if (answers.checked == questions[currentQuestion].correct) {
  //   score++;
  //   answers.style.backgroundColor = "green";
  // } else {
  //   answers.style.backgroundColor = "red";
  // }
}

//database
var db;
//methos chk if database exists thn open database
//if not create one
var request = window.indexedDB.open("QuizQuestions", 1);
//if failed to open - error event is fired
request.onerror = function (event) {
  console.log("error: ");
};

//on success opening
request.onsuccess = function (event) {
  db = request.result; //database obj is saved for later use
  console.log("success: " + db);
};

//define structure of the database
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("questionsObjStr", {
    keyPath: "id", //the key to the data
    autoIncrement: true, //key for new item stored generated automatically
  });

  //create indexes
  //create an index to search answer by the key path answer
  objectStore.createIndex("question", "question", { unique: true });
  //create index to search choice by the key path choice
  objectStore.createIndex("choice", "choice", { unique: false });
  //create index to search correct ans by key path correct
  objectStore.createIndex("correct", "correct", { unique: false });
  questions.forEach((questions) => {
    objectStore.add({
      question: questions.question,
      choice: questions.choice,
      correct: questions.correct,
      answer: questions.answer,
    });
  });
};

function add(choice) {
  var transaction = db.transaction("questionsObjStr", "readwrite");
  var objectStore = transaction.objectStore("questionsObjStr");
  objectStore.put(choice);
  request.onsuccess = function (event) {
    alert("Record added to your database.");
  };
  request.onerror = function (event) {
    alert("Unable to add data in database! ");
  };
}

// //retrieve data
// function readAll() {
//   var transaction = db.transaction("studentObjStr");
//   var objectStore = transaction.objectStore("studentObjStr");
//   objectStore.openCursor().onsuccess = function (event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " +
//         cursor.value.age + ", Email: " + cursor.value.email);
//       cursor.continue();
//     }
//     else {
//       alert("No more entries!");
//     }
//   };
// }

/*function checkAnswer(answer) {
  //console.log(answer)
    if (answer == questions[currentQuestion].correct) {
      //console.log(answer);
      // answer is correct
      score++;
      // change progress color to green
      //answerIsCorrect();
    } else {
      // answer is wrong
      // change progress color to red
      //answerIsWrong();
    }
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    renderQuestion();
  }
}*/

// // answer is correct
// function answerIsCorrect(){
//     document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
// }

// // answer is Wrong
// function answerIsWrong(){
//     document.getElementById(currentQuestion).style.backgroundColor = "#f00";
// }
