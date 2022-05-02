<template>
  <div class="game">
    <div class="game-area">
      <div class="game-title">
        <img src="logo.png" alt="Vue" />
        <h1>Game Tictactoe!!</h1>
      </div>

      <div class="score-board d-flex justify-content-evenly">
        <h4>You: {{ yourScore }}</h4>
        <h4>Opponent: {{ botScore }}</h4>
      </div>

      <board :squares="squares" :winner="winner" @click="click"></board>

      <div class="game-info">
        <p v-if="stepNumber === 0">Let's go: {{ currentPlayer }}!</p>
        <p v-else-if="!!winner">
          Winner: {{ currentPlayer }}!
          <button @click="restart" style="cursor: pointer">
            Restart game!
          </button>
        </p>
        <p v-else-if="stepNumber > 8">
          Draw!
          <button @click="restart" style="cursor: pointer">
            Restart game!
          </button>
        </p>
        <p v-else>Playing turn: {{ currentPlayer }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import Board from "./Board";

export default {
  name: "Game",
  components: {
    Board,
  },
  data() {
    return {
      squares: Array(9).fill(null),
      stepNumber: 0,
      currentPlayer: "X",
      winner: null,
      yourScore: 0,
      botScore: 0,
    };
  },
  methods: {
    hasWinner() {
      if (this.winner) return true;
      const squares = this.squares;
      const matches = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < matches.length; i++) {
        const [a, b, c] = matches[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          this.winner = [a, b, c];
          return true;
        }
      }

      return false;
    },

    restart() {
      this.squares = Array(9).fill(null);
      this.stepNumber = 0;
      this.currentPlayer = "X";
      this.winner = null;
    },

    click(i) {
      console.log(i);
      if (!!this.squares[i] || !!this.winner) {
        return;
      }
      this.squares[i] = this.currentPlayer;
      if (!this.hasWinner()) {
        this.stepNumber++;
        this.currentPlayer = "O";
        this.botPick();
        return;
      }
      if (this.currentPlayer === "X") {
        this.yourScore++;
      } else {
        this.botScore++;
      }
    },

    botPick() {
      let emptySquare = [];
      for (let i = 0; i < 9; ++i) {
        if (this.squares[i] === null) {
          emptySquare.push(i);
        }
      }
      const randomIndex =
        emptySquare[Math.floor(Math.random() * emptySquare.length)];
      this.squares[randomIndex] = "O";
      if (!this.hasWinner()) {
        this.stepNumber++;
        this.currentPlayer = "X";
        return;
      }
      if (this.currentPlayer === "X") {
        this.yourScore++;
      } else {
        this.botScore++;
      }
    },
  },
};
</script>

<style>
.score-board {
  width: 100%;
}

.game {
  background-image: url("../../public/cosmos.png");
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-content: center;
  justify-content: center;
}

.game-area {
  grid-column-start: 2;
  display: grid;
  justify-content: center;
  justify-items: center;
}

.game-title {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 0 3vmin;
}

.game-title img {
  width: 40px;
  filter: drop-shadow(-1px 1px 0 #0007) drop-shadow(1px -1px 0 #0007)
    drop-shadow(1px 1px 0 #0007);
  margin-right: 9px;
  justify-self: right;
}

.game-title h1 {
  margin: 0;
  font-size: 2.25em;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b,
    1px 1px 1px #000b;
}

.game-info {
  margin: 3vmin 0 0;
  padding: 1rem 0.5rem;
  font-size: 1.95em;
  font-family: monospace;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b,
    1px 1px 1px #000b;
}

.game-info button {
  background-color: violet;
  border-radius: 4px;
  border: none;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b,
    1px 1px 1px #000b;
}

.game-info button:focus,
.game-info button:hover {
  background: #1115;
  border-color: rgba(var(--theme-color));
  box-shadow: 0 0 10px rgba(var(--theme-color), 0.75);
  color: rgba(var(--theme-color));
  text-shadow: -1px -1px 0 #0007, -1px 1px 0 #0007, 1px -1px 0 #0007,
    1px 1px 0 #0007;
}

.game-info button:active {
  background: #1119;
}
</style>
