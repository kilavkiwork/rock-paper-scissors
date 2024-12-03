document.querySelectorAll(".hero__icon").forEach((icon) => {
  icon.addEventListener("click", (event) => {
    let selection;

    console.log(event.target.id);

    switch (event.target.id) {
      case "paper":
        selection = "paper";
        break;
      case "scissors":
        selection = "scissors";
        break;
      case "rock":
        selection = "rock";
        break;
    }

    let counter = parseInt(COUNTER.textContent, 10) || 0;
    let gameUrl = `game-page.html?choice=${selection}&counter=${counter}`;
    window.location.href = gameUrl;
  });
});

function getScoreForUrl() {
  let params = new URLSearchParams(window.location.search);
  return parseInt(params.get("counter"), 10) || 0;
}

const COUNTER = document.querySelector("#counter");
COUNTER.textContent = getScoreForUrl();

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
