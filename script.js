const bingoGrid = document.querySelector('.mainGrid');
const removeButton = document.querySelector('.remove');
const generateButton = document.querySelector('.generate');

const arr = [
  "J says he's sorry",
  "Uluktia part 2",
  "LoTML part 2",
  "Free hammer",
  "T10 Mats",
  "Bounty System",
  "RBF Rewards",
  "New PvP mode",
  "Demon region",
  "New mount",
  "Dancing for everyone",
  "Crystal rework",
  "Preset rework",
  "New treasure item",
  "Fairy rework",
  "Lifeskills family wide QoL",
  "Korean Drama mentioned",
  "New gearslot (like artifacts i.e)",
  "Artifact cups",
  "New class",
  "Grindable costume",
  "New Sea content",
  "New dungeon",
  "Calamity 8-10",
  "New Collab"
]

const options = new Map();

removeButton.addEventListener('click', (e) => {
    removeSavedBingo();
    bingoGrid.replaceChildren('');
})

generateButton.addEventListener('click', (e) => {
    generateNewGrid();
})

function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const randomArr = shuffleArray(arr);

for (let n of randomArr) {
    options.set(n, false);
}

const optionsObject = Object.fromEntries(options);

let obj = JSON.parse(window.localStorage.getItem("bingoOptions"))
function loadGrid() {
    for (const [key, value] of Object.entries(obj)) {
        let bingoBox = document.createElement('div');
        bingoBox.classList.add('bingoBox');
        bingoBox.textContent = key;
        if (value) {
            bingoBox.style.backgroundColor = 'green';
        }
        bingoGrid.appendChild(bingoBox);
    }
}

function generateNewGrid() {
    for (const [key] of Object.entries(optionsObject)) {
        let bingoBox = document.createElement('div');
        bingoBox.classList.add('bingoBox');
        bingoBox.textContent = key;
        bingoGrid.appendChild(bingoBox);
    }
}

bingoGrid.addEventListener('click', (e) => {
    changeBox(e.target, e.target.innerText);
    saveBingo(e.target.innerText);
})

function changeBox(box, boxText) {
    box.style.backgroundColor = 'green';
    if (obj !== null) {
        obj[boxText] = true;
    } else optionsObject[boxText] = true;
}

function saveBingo() {
    if (obj !== null) {
       window.localStorage.setItem("bingoOptions", JSON.stringify(obj)); 
    } else window.localStorage.setItem("bingoOptions", JSON.stringify(optionsObject));
}

function removeSavedBingo() {
    window.localStorage.removeItem("bingoOptions");
}

loadGrid();
