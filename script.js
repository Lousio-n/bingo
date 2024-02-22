const bingoGrid = document.querySelector('.mainGrid');
const removeButton = document.querySelector('.remove');
const generateButton = document.querySelector('.generate');

const arr = [
   "3 kills with grenades",
   "20 kills with model 37 in one life", 
   "5 kills with revolver (mk or 27) in one life",
   "10 kills with throwing knife",
   "4 kills with welrod",
   "Top 3 in 2 games",
   "3 kills with Boys AT rifle in one life", 
   "Kill 5 people from a stationary turret",
   "10 kills from a tank or plane",
   "3 kills with fliegerfaust",
   "2 kills with tank mine/s",
   "1 kill with flares",
   "69 kills in a game (nice)",
   "110 kills in a game",
   "Get hackusated",
   "Get two people to agree with you in all-chat",
   "Get 5 kills with any MG laying prone in one position (you can't move)",
   "Meet a cheater",
   "3+ Roadkills",
   "Kill/ed by smokebarrage",
   "Negative k/d",
   "Killed 2x or more by artillery",
   "Get t-bagged",
   "Killed by same sniper twice",
   "Over 50% of team is sniper",
   "Knife the sniper that killed you",
   "chat: This game is good",
   "Collateral",
   "2+ kills with throwing knife in one life",
   "3 kills one mag revolver",
   "Chat: Shotgun abuser",
   "30+ kills TDM",
   "4 kills 1 mag (no shotgun)",
   "Get killed by stationary twice",
   "Run over by vehicle",
   "Killed by MG camper in enemy spawn",
   "15+ killstreak",
   "3+ kills with one nade",
   "STG 5+ kills in one life",
   "SMLE 5+ kills in one life",
   "MG42 5+ kills in one life",
   "BAR 5+ kills in one life",
   "MP40 5+ kills in one life",
   "Ruby 5+ kills in one life",
   "Revolver 5+ kills in one life",
   "ZK 5+ kills in one life",
   "3+ melee kills in one life",
   "5+ kills while prone",
   "2+ kills with tripmine",
   "2+ kills with AT mine",
   "Roadkill with plane",
   "5+ kills with fliegerfaust",
   "0 deaths 10+ K/D",
   "70+ kill game",
   "90+ kill game",
   "100+ kill game",
   "120+ kill game",
   "10+ K/D",
   "10+ kills with stationary",
   "50+ kills TDM"
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

let counter = 0;

for (let n of randomArr) {
    if (counter === 25) break;
    options.set(n, false);
    counter++
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
