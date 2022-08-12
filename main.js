const playBtn = document.querySelector('.information__btn-play');
const stopBtn = document.querySelector('.information__btn-stop');
const bugNodes = document.querySelectorAll('[src$="bug.png"]');
const bugs = Array.from(bugNodes);
const carrotsNodes = document.querySelectorAll('[src$="carrot.png"]');
const carrots = Array.from(carrotsNodes);
const items = document.querySelector('.items');
const soundBgm = document.querySelector('.sound__bgm');
const soundAlert = document.querySelector('.sound__alert');
const soundBugPull = document.querySelector('.sound__bug-pull');
const soundCarrotPull = document.querySelector('.sound__carrot-pull');
const soundGameWin = document.querySelector('.sound__game-win');
const replayBtn = document.querySelector('.notice__replay');
let stage = 'ready';

// Start stop game
playBtn.addEventListener('click', () => {
  playStopBtnSwap();
  items.style.display = 'block';
  if (stage === 'ready') {
    placeRandom(bugs);
    placeRandom(carrots);
    stage = 'proceed';
  } else if (stage === 'paused') {
    stage = 'proceed';
  }
  soundBgm.play();
  timer();
});

stopBtn.addEventListener('click', () => {
  if (stage === 'proceed') {
    clearInterval(intervalId);
    playStopBtnSwap();
    soundBgm.pause();
    stage = 'paused';
  }
});

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
  stage = 'proceed';
});

// carrot or bug clicked:
const area = document.querySelector('.items');
area.addEventListener('click', (e) => {
  if (carrots.includes(e.target) && stage === 'proceed') {
    soundCarrotPull.play();
    e.target.style.display = 'none';
    countDown();
  } else if (bugs.includes(e.target) && stage === 'proceed') {
    lost();
  }
});

function playStopBtnSwap() {
  if (playBtn.style.display == 'none') {
    playBtn.style.display = 'inline';
    stopBtn.style.display = 'none';
  } else {
    playBtn.style.display = 'none';
    stopBtn.style.display = 'inline';
  }
}

function placeRandom(items) {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  items.forEach((element) => {
    const itemWidth = element.clientWidth;
    const itemHeight = element.clientHeight;
    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.top =
      Math.round(Math.random() * (innerHeight - itemHeight)) + 'px';
    element.style.left =
      Math.round(Math.random() * (innerWidth - itemWidth)) + 'px';
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
      judge();
      stage = 'ready';
    } else {
      sec--;
    }
  }, 1000);
  return;
}

const notice = document.querySelector('.notice');
const noticeText = document.querySelector('.notice__text');
let counter = document.querySelector('.information__counter');

let count = 10;
function countDown() {
  // counter = document.querySelector('.information__counter');
  counter.textContent = --count;
  if (count == 0) {
    judge();
  }
}

function judge() {
  if (sec === 0 && count === 0) {
    win();
  } else if (sec === 0 && count > 0) {
    lost();
  } else if (sec > 0 && count === 0) {
    win();
  } else {
    return;
  }
}

function win() {
  soundBgm.pause();
  soundGameWin.play();
  clearInterval(intervalId);
  intervalId = null;
  notice.style.display = 'block';
  noticeText.textContent = 'YOU WON 🎉';
  stage = 'ready';
  count = 10;
}

function lost() {
  soundBgm.pause();
  soundBugPull.play();
  clearInterval(intervalId);
  intervalId = null;
  notice.style.display = 'block';
  noticeText.textContent = 'YOU LOST 💩';
  stage = 'ready';
  count = 10;
}
