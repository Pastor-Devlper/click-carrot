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
  if (stage == 'ready') {
    placeRandom(bugs);
    placeRandom(carrots);
    stage = 'proceed';
  }
  soundBgm.play();
  timer();
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  playStopBtnSwap();
  soundBgm.pause();
  stage = 'paused';
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
});

// carrot or bug clicked:
const area = document.querySelector('.items');
area.addEventListener('click', (e) => {
  if (carrots.includes(e.target)) {
    e.target.style.display = 'none';
    countDown();
  } else if (bugs.includes(e.target)) {
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
}

const notice = document.querySelector('.notice');
const noticeText = document.querySelector('.notice__text');
let counter = document.querySelector('.information__counter');

function countDown() {
  counter = document.querySelector('.information__counter');
  if (counter.textContent == 0) {
    judge();
  }
  counter.textContent--;
}

function judge() {
  if (sec == 0 && counter.textContent > 0) {
    lost();
  } else if (sec > 0 && counter.textContent == 0) {
    win();
  } else if (sec == 0 && counter.textContent == 0) {
    win;
  } else {
    console.log(sec, counter.textContent);
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
}

function lost() {
  soundBgm.pause();
  soundBugPull.play();
  clearInterval(intervalId);
  intervalId = null;
  notice.style.display = 'block';
  noticeText.textContent = 'YOU LOST 💩';
}
