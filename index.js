const startBtn = document.getElementById("start");
console.log(startBtn);
const cards = document.querySelectorAll(".card");
console.log(cards);
const timeEl = document.getElementById("time");
console.log(timeEl);
const modal = document.getElementById("modal");
console.log(modal);
const board = document.getElementById("board");
console.log(board);
const timeController = document.getElementById("time-list");
console.log(timeController);
const scoreE1 = document.getElementById("score");
console.log(scoreE1);

let selectedTime = null;
let time = null;
let score = 0;
//чтобы можно было очищать интервал
let idSetInterval = null;

function handlerStartBtn(e) {
  //Предотвращает стандартное действие по умолчанию (переход по ссылке)
  e.preventDefault();
  cards[0].classList.add("up");
}

startBtn.addEventListener("click", handlerStartBtn);

function handlerTimeController(e) {
  if (e.target.classList.contains("time-list__item")) {
    cards[1].classList.add("up");
    //   selectedTime = +e.target.dataset.time;
    selectedTime = parseInt(e.target.dataset.time);
    time = selectedTime;
    startGame();
  }
}

timeController.addEventListener("click", handlerTimeController);

function handlerCircleClick(e) {
  if (e.target.classList.contains("circle")) {
    score++; //score +1
    e.target.remove();
  }
  createRandomCircle();
}

board.addEventListener("click", handlerCircleClick);

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const size = getRandomInt(15, 50);
  //рандомный цвет
  let color = getRandomColor();
  circle.style.backgroundColor = color;
  //деструктуризация
  const { width, height } = board.getBoundingClientRect();
  console.log(board.getBoundingClientRect());
  circle.style.width = circle.style.height = size + "px";
  console.log(width, height);
  const x = getRandomInt(0, width - size);
  const y = getRandomInt(0, width - size);
  circle.style.top = y + "px";
  circle.style.left = x + "px";

  board.append(circle);
}

function startGame() {
  setTime(time);
  idSetInterval = setInterval(decTime, 1000);
  //создать Circle
  createRandomCircle();
  // getRandomColor();
}

function finishGame() {
  console.log(" Game over");
  scoreE1.innerHTML = score;
  modal.classList.add("open");
  clearInterval(idSetInterval);
}
function decTime() {
  //   --time_;
  //   console.log(time_);
  if (time === 0) {
    finishGame();
  } else {
    let current = --time; // time_-1
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(timeGame) {
  timeEl.innerHTML = `00:${timeGame}`;
}

// setTimeout(() => {
//   console.log("setTimeout");
// }, 3500);
// setInterval(() =>{
// console.log(new Date().getSeconds);
// },1000);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

function getRandomColor() {
  return `rgb(${getRandomInt(0, 256)},${getRandomInt(0, 256)},${getRandomInt(
    0,
    256
  )}`;
}

modal.addEventListener("click", handlerModalClick);

function resetGame() {
  this.classList.remove("open");
  time = selectedTime;
  score = 0;
  board.innerHTML = "";
}

function handlerModalClick(e) {
  // console.log(e.target.getAttribute("id"));
  if (e.target.getAttribute("id") === "restart") {
    console.log(this);
    resetGame.call(this);
    startGame();
  }
  if (e.target.getAttribute("id") === "cancel") {
    resetGame.call(this);
    cards.forEach((card) => {
      card.classList.remove("up");
    });
  }
}
