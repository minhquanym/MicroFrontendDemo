<template>
  <div class="board">
    <div v-for="row in 3" :key="row" class="board-row">
      <square
        v-for="j in 3"
        :key="j"
        :value="squares[(row - 1) * 3 + j - 1]"
        :disabled="!!winner"
        :winner="!!winner && winner.includes((row - 1) * 3 + j - 1)"
        @click="clickHandler(row - 1, j - 1)"
      />
    </div>
  </div>
</template>

<script>
import Square from "./Square";

export default {
  name: "Board",
  components: { Square },
  props: {
    squares: Array,
    winner: Array,
  },
  methods: {
    clickHandler(i, j) {
      this.$emit("click", i * 3 + j);
    },
  },
};
</script>

<style>
.board {
  display: grid;
  border: 1rem solid rgba(188, 112, 196, 0.27);
  box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
  border-radius: 0.5rem;
  width: 40vmin;
  height: 40vmin;
  grid-template-rows: repeat(3, 1fr);
  backdrop-filter: blur(10px);
}

.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
