const area = document.getElementById("buttonArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const bgHearts = document.getElementById("bgHearts");
const loveAudio = document.getElementById("loveAudio");

let noClicks = 0;
let isPlaying = false;

function createFloatingHearts(count = 90) {
  if (!bgHearts) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = "\u2665";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${8 + Math.random() * 22}px`;
    heart.style.animationDuration = `${5 + Math.random() * 6}s`;
    heart.style.animationDelay = `${-Math.random() * 10}s`;
    heart.style.opacity = `${0.35 + Math.random() * 0.55}`;
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

function autoPlaySong() {
  if (!loveAudio) {
    return;
  }

  loveAudio.play().then(() => {
    isPlaying = true;
  }).catch(() => {
    isPlaying = false;
  });
}

if (loveAudio) {
  loveAudio.addEventListener("ended", () => {
    isPlaying = false;
  });

  loveAudio.addEventListener("error", () => {});
}

createFloatingHearts();
autoPlaySong();

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  window.location.href = "yay.html";
});
