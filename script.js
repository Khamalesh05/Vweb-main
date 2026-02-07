const area = document.getElementById("buttonArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const bgHearts = document.getElementById("bgHearts");
const musicBtn = document.getElementById("musicBtn");
const loveAudio = document.getElementById("loveAudio");
const musicHint = document.getElementById("musicHint");

let noClicks = 0;
let isPlaying = false;

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
  if (!loveAudio) {
    return;
  }

  if (isPlaying) {
    loveAudio.pause();
    isPlaying = false;
    musicBtn.textContent = "Play Our Song";
  } else {
    loveAudio.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = "Pause Song";
      if (musicHint) {
        musicHint.textContent = "Now playing.";
      }
    }).catch(() => {
      if (musicHint) {
        musicHint.textContent = "Tap Play Our Song to enable audio.";
      }
    });
  }
}

function autoPlaySong() {
  if (!loveAudio) {
    return;
  }

  loveAudio.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = "Pause Song";
    if (musicHint) {
      musicHint.textContent = "Now playing.";
    }
  }).catch(() => {
    isPlaying = false;
    musicBtn.textContent = "Play Our Song";
    if (musicHint) {
      musicHint.textContent = "Autoplay was blocked. Tap Play Our Song.";
    }
  });
}

if (loveAudio) {
  loveAudio.addEventListener("ended", () => {
    isPlaying = false;
    musicBtn.textContent = "Play Our Song";
  });

  loveAudio.addEventListener("error", () => {
    if (musicHint) {
      musicHint.textContent = "Song file missing. Add assets/song.mp3.";
    }
    musicBtn.disabled = true;
    musicBtn.textContent = "Song Not Found";
  });
}

createFloatingHearts();
autoPlaySong();

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  result.classList.add("show");
  yesBtn.textContent = "YAY!";
  yesBtn.disabled = true;
  noBtn.disabled = true;
});

if (musicBtn) {
  musicBtn.addEventListener("click", toggleMusic);
}
