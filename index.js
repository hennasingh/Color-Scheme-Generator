const container = document.querySelector("div.color-output-container");
const matches = container.querySelectorAll("div.color");
const hexMatches = container.querySelectorAll("div.hex-values");
const generateBtn = document.getElementById("generate-scheme");

/** Copy hex code and create animation when copying **/

document.addEventListener("click", function (event) {
  if (event.target.dataset.color) {
    copyColorCode(event.target.dataset.color);
    handleCopyAnimation(event.target);
  }
});

function copyColorCode(hexCode) {
  console.log("Copy!");
  navigator.clipboard.writeText(hexCode);
}

function handleCopyAnimation(targetColor) {
  console.log(targetColor);
  matches.forEach((item) => {
    item.classList.remove("copied");
  });
  hexMatches.forEach((item) => {
    item.classList.remove("copied");
  });

  targetColor.classList.add("copied");

  setTimeout(() => {
    targetColor.classList.remove("copied");
  }, 250);
}

generateBtn.addEventListener("click", generateScheme);

/** Get initial color scheme */

init();

function init() {
  getColors("F55A5A", "monochrome");
}

function getColors(seedColor, mode) {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color, index) => {
        matches[index].style.backgroundColor = color.hex.value;
        matches[index].setAttribute("data-color", color.hex.value);

        hexMatches[index].textContent = color.hex.value;
        hexMatches[index].setAttribute("data-color", color.hex.value);
      });
    });
}

/** Generate new color scheme on button click */
function generateScheme() {
  const seedColor = document.getElementById("color").value.slice(1);

  const mode = document.getElementById("color-modes").value;
  getColors(seedColor, mode);
}
