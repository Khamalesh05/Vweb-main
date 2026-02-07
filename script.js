const area = document.getElementById("buttonArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const bgHearts = document.getElementById("bgHearts");
const musicBtn = document.getElementById("musicBtn");
const playerWrap = document.getElementById("playerWrap");
const songFrame = document.getElementById("songFrame");
const SONG_URL = "https://www.youtube.com/embed/nyuo9-OjNNg?autoplay=1&rel=0&playsinline=1";

let noClicks = 0;
let songLoaded = true;

function createFloatingHearts(count = 28) {
  if (!bgHearts) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = "\u2665";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 26}px`;
    heart.style.animationDuration = `${8 + Math.random() * 10}s`;
    heart.style.animationDelay = `${-Math.random() * 14}s`;
    heart.style.opacity = `${0.25 + Math.random() * 0.45}`;
    bgHearts.appendChild(heart);
  }
}

function moveNoButton() {
  const areaRect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noClicks += 1;
  if (noClicks % 3 === 0) {
    noBtn.textContent = "Nope";
  } else if (noClicks % 3 === 1) {
    noBtn.textContent = "No";
  } else {
    noBtn.textContent = "Not a chance";
  }
}

function toggleMusic() {
  if (playerWrap.hidden) {
    if (!songLoaded) {
      songFrame.src = SONG_URL;
      songLoaded = true;
    }
    playerWrap.hidden = false;
    musicBtn.textContent = "Pause Song";
  } else {
    playerWrap.hidden = true;
    songFrame.src = "";
    songLoaded = false;
    musicBtn.textContent = "Play Our Song";
  }
}

createFloatingHearts();
songFrame.src = SONG_URL;
playerWrap.hidden = false;
musicBtn.textContent = "Pause Song";

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  result.classList.add("show");
  yesBtn.textContent = "YAY!";
  yesBtn.disabled = true;
  noBtn.disabled = true;
});

musicBtn.addEventListener("click", toggleMusic);
