// Start button clicked:
const start = document.querySelector('.information__btn-play');
const bugNodes = document.querySelectorAll('[src$="bug.png"]');
const bugs = Array.from(bugNodes);
const carrotsNodes = document.querySelectorAll('[src$="carrot.png"]');
const carrots = Array.from(carrotsNodes);
const targets = document.querySelector('.targets');
const bgm = document.querySelector('.bgm');

start.addEventListener('click', () => {
  // 01. place bugs and carrots in random posiotion
  targets.style.display = 'block';
  placeRandom(bugs);
  placeRandom(carrots);
  // 02. Music Start
  bgm.play();
  // 03. Timer start
  timer();
});

function placeRandom(items) {
  const innerWidth = window.innerWidth;
  items.forEach((element) => {
    element.style.position = 'absolute';
    element.style.top = Math.round(Math.random() * innerWidth) + 'px';
    element.style.left = Math.round(Math.random() * innerWidth) + 'px';
  });
}

function timer() {
  let minute = 0;
  let sec = 9;
  let intervalId;
  intervalId = setInterval(() => {
    const timer = document.querySelector('.information__timer');
    timer.innerHTML = minute + ':' + sec;
    if (sec == 0) {
      clearInterval(intervalId);
      return;
    } else {
      sec--;
    }
  }, 1000);

  // carrot clicked:
  // 1. erase it
  const area = document.querySelector('.targets');
  area.addEventListener('click', (e) => {
    if (carrots.includes(e.target)) {
      e.target.remove();
      countDown();
    } else if (bugs.includes(e.target)) {
      lost();
    }
  });
}

function countDown() {
  const counter = document.querySelector('.information__counter');
  counter.textContent--;
}

function lost() {
  // 01. Stop Bgm & Play
  bgm.
}

//3. incorrent:
// clicked bug; "you lost" in notice
// reload button appear
