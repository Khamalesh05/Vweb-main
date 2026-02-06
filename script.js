const area = document.getElementById("buttonArea");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");

let noClicks = 0;

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

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  result.classList.add("show");
  yesBtn.textContent = "YAY!";
  yesBtn.disabled = true;
  noBtn.disabled = true;
});
