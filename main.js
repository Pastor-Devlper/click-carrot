const playBtn = document.querySelector('.information__btn-play');
const bugNodes = document.querySelectorAll('[src$="bug.png"]');
const bugs = Array.from(bugNodes);
const carrotsNodes = document.querySelectorAll('[src$="carrot.png"]');
const carrots = Array.from(carrotsNodes);
const targets = document.querySelector('.targets');
const soundBgm = document.querySelector('.sound__bgm');
const soundAlert = document.querySelector('.sound__alert');
const soundBugPull = document.querySelector('.sound__bug-pull');
const soundCarrotPull = document.querySelector('.sound__carrot-pull');
const soundGameWin = document.querySelector('.sound__game-win');
const replayBtn = document.querySelector('.notice__replay');

// Start game
playBtn.addEventListener('click', () => {
  targets.style.display = 'block';
  placeRandom(bugs);
  placeRandom(carrots);
  soundBgm.play();
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

let intervalId;
let minute = 0;
let sec = 9;
const clock = document.querySelector('.information__clock');
function timer() {
  intervalId = setInterval(() => {
    clock.textContent = minute + ':' + sec;
    if (sec == 0) {
      clearInterval(intervalId);
      return;
    } else {
      sec--;
    }
  }, 1000);
}

// carrot or bug clicked:
const area = document.querySelector('.targets');
area.addEventListener('click', (e) => {
  if (carrots.includes(e.target)) {
    e.target.style.display = 'none';
    countDown();
  } else if (bugs.includes(e.target)) {
    lost();
  }
});

const notice = document.querySelector('.notice');
const noticeText = document.querySelector('.notice__text');

const counter = document.querySelector('.information__counter');
function countDown() {
  counter.textContent--;
  if (counter.textContent == 0) {
    soundBgm.pause();
    soundGameWin.play();
    notice.style.display = 'block';
  }
}

function lost() {
  soundBgm.pause();
  soundBugPull.play();
  clearInterval(intervalId);
  intervalId = null;
  notice.style.display = 'block';
  noticeText.textContent = 'YOU LOST 💩';
}

// Replay
replayBtn.addEventListener('click', () => {
  notice.style.display = 'none';
  clock.textContent = '0:10';
  sec = 9;
  counter.textContent = 10;
  placeRandom(bugs);
  placeRandom(carrots);
  soundBgm.play();
  timer();
});
