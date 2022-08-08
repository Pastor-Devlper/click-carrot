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
  // 03. count down
  timer(10);
});

function placeRandom(items) {
  const innerWidth = window.innerWidth;
  items.forEach((element) => {
    element.style.position = 'absolute';
    element.style.top = Math.round(Math.random() * innerWidth) + 'px';
    element.style.left = Math.round(Math.random() * innerWidth) + 'px';
  });
}

function timer(start) {
  setInterval(() => {
    for (let i = start, i > 0; i--) {
      console.log(i);
    }
  }, 1000);
}

// when push btn-play
// 1. music start

// 2. place bugs and carrots

// 3. timer counts down

// function: erase carrot
//1. judge clicked carrot

//2. correct:
// erase the clicked carrot
// count down num-remain on information

//3. incorrent:
// clicked bug; "you lost" in notice
// reload button appear
