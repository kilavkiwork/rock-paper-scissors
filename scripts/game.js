const PATH_ICON = {
  paper: "assets/images/icon-paper.svg",
  scissors: "assets/images/icon-scissors.svg",
  rock: "assets/images/icon-rock.svg",
};

const WINNERS = {
  1: "you win",
  0: "tie",
  "-1": "you lose",
};

const PLAYER_IMAGE = document.querySelector("#player-image");
const COMPUTER_IMAGE = document.querySelector("#computer-image");
const COUNTER = document.querySelector("#counter");
const PLAY_AGAIN = document.querySelector("#play-again");
// const RULES_GAME = document.querySelector("#rules");

function chooseIconForComputer() {
  let keys = Object.keys(PATH_ICON);
  let randomNumber = Math.floor(Math.random() * keys.length);
  return keys[randomNumber];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 0;

  let winCondition = {
    paper: "rock",
    scissors: "paper",
    rock: "scissors",
  };

  return winCondition[playerChoice] === computerChoice ? 1 : -1;
}

function updateTextWinner(result) {
  document.querySelector(".winner-title").textContent = WINNERS[result];
}

function addAnimation(result) {
  let icons = document.querySelectorAll(".choice__icon");
  if (result > 0) {
    icons[0].classList.add("ripple-active");
  } else if (result < 0) {
    icons[1].classList.add("ripple-active");
  } else {
    icons.forEach((icon) => icon.classList.add("ripple-active"));
  }
}

// some game
let incomingUrl = new URLSearchParams(window.location.search);
let playerChoice = incomingUrl.get("choice");
let computerChoice = chooseIconForComputer();
let score = parseInt(incomingUrl.get("counter"), 10) || 0;

let result = determineWinner(playerChoice, computerChoice);
COUNTER.textContent = score += result;

PLAYER_IMAGE.src = PATH_ICON[`${playerChoice}`];
COMPUTER_IMAGE.src = PATH_ICON[`${computerChoice}`];

PLAY_AGAIN.addEventListener("click", () => {
  let queryString = `index.html?counter=${COUNTER.textContent}`;
  window.location.href = queryString;
});

document.querySelector("#rules").addEventListener("click", () => {
  let popup = document.querySelector("#popup");
  popup.style.display = "flex";
  popup.classList.remove("hide");
  popup.classList.add("show");
});

window.addEventListener("click", (event) => {
  let popup = document.querySelector("#popup");
  let close = document.querySelector("#close");

  if (event.target === popup || event.target === close) {
    popup.classList.remove("show");
    popup.classList.add("hide");

    setTimeout(() => {
      if (popup.classList.contains("hide")) {
        popup.style.display = "none";
      }
    }, 300);
  }
});

updateTextWinner(result);
addAnimation(result);
