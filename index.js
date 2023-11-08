
const container  = document.querySelector("div.color-output")
const matches = container.querySelectorAll('div.color')
const hexMatches = container.querySelectorAll('div.hex > p')
const generateBtn = document.getElementById('generate-scheme')

generateBtn.addEventListener('click', generateScheme)

function generateScheme() {
    let seedColor = document.getElementById('color').value
    seedColor = seedColor.slice(1)
    const mode = document.getElementById('color-modes').value
    getColors(seedColor, mode)
}

function init() {
    getColors('F55A5A', 'monochrome')
}

function getColors(seedColor, mode){
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
        data.colors.forEach((color, index) => {
            matches[index].style.backgroundColor = color.hex.value
            hexMatches[index].textContent = color.hex.value
        });
    })
}

init()