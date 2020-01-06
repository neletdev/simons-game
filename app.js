const blue = document.getElementById("blue");
const violet = document.getElementById("violet");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const btnStart = document.getElementById("btnStart");
const LAST_LEVEL = 3;

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.togglebtnStart();
    this.level = 1;
    this.colors = {
      blue,
      violet,
      orange,
      green
    };
  }

  togglebtnStart() {
    if (btnStart.classList.contains("hide")) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add("hide");
    }
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.sublevel = 0;
    this.showSequence();
    this.addClickEvents();
  }

  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return "blue";
      case 1:
        return "violet";
      case 2:
        return "orange";
      case 3:
        return "green";
    }
  }

  transformColorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "violet":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
    }
  }

  showSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i]);
      setTimeout(() => this.showColor(color), 1000 * i);
    }
  }

  showColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addClickEvents() {
    this.colors.blue.addEventListener("click", this.chooseColor);
    this.colors.green.addEventListener("click", this.chooseColor);
    this.colors.violet.addEventListener("click", this.chooseColor);
    this.colors.orange.addEventListener("click", this.chooseColor);
  }

  removeClickEvents() {
    this.colors.blue.removeEventListener("click", this.chooseColor);
    this.colors.green.removeEventListener("click", this.chooseColor);
    this.colors.violet.removeEventListener("click", this.chooseColor);
    this.colors.orange.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.transformColorToNumber(nameColor);
    this.showColor(nameColor);
    if (numberColor === this.sequence[this.sublevel]) {
      this.sublevel++;
      if (this.sublevel === this.level) {
        this.level++;
        this.removeClickEvents();
        if (this.level === LAST_LEVEL + 1) {
          this.winner()();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.loser()();
    }
  }

  winner() {
    swal("Simon's Game", "🎉 Congratulations! You are the winner! 🎉", "success").then(
      this.initialize
    );
  }

  loser() {
    swal("Simon's Game", "🥴 Sorry, you are wrong. Try again. 🥴", "error").then(() => {
      this.removeClickEvents();
      this.initialize();
    });
  }
}

function startGame() {
  window.Game = new Game();
}
