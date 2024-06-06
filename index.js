//startBtn
//cards
//timeController
//modal
//board
//time
//scoreE1

const startBtn = document.getElementById("start");
console.log(startBtn);
const cards = document.querySelectorAll(".card");
console.log(cards);
const time = document.getElementById("time");
console.log(time);
const modal = document.getElementById("modal");
console.log(modal);
const board = document.getElementById("board");
console.log(board);
const timeController = document.getElementById("time-list");
console.log(timeController);
const scoreE1 = document.getElementById("score");
console.log(scoreE1);

let selectedTime = null;
let time_;
let idSetInterval = null;

function handlerSrartBtn(e) {
  e.preventDefault();
  cards[0].classList.add("up");
}
function handlerTimeController(e) {
  if (e.target.classList.contains("time-list__item")) {
    console.log(e.target);
    cards[1].classList.add("up");
    //   selectedTime = +e.target.dataset.time;
    selectedTime = parseInt(e.target.dataset.time);
    time_ = selectedTime;
    startGame();
  }
}

startBtn.addEventListener("click", handlerSrartBtn);

timeController.addEventListener("click", handlerTimeController);

function startGame() {
  setTime(time_);
  idSetInterval = setInterval(decTime, 1000);
}

function finishGame() {
  console.log(" Game over");
  clearInterval(idSetInterval);
}
function decTime() {
  //   --time_;
  //   console.log(time_);
  if (time_ === 0) {
    finishGame();
  } else {
    let current = --time_; // time_-1
    if (time_ < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(timeGame) {
  time.innerHTML = `00:${timeGame}`;
}

// setTimeout(() => {
//   console.log("setTimeout");
// }, 3500);
// setInterval(() =>{
// console.log(new Date().getSeconds);
// },1000);
