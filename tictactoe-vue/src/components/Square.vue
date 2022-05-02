<template>
  <button
    class="square"
    :class="[{ winner: winner }]"
    :disabled="disabled"
    @click.stop="click"
  >
    {{ value }}
  </button>
</template>


<script>
export default {
  name: "Square",
  props: {
    value: String,
    disabled: Boolean,
    winner: Boolean,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.square {
  background-blend-mode: exclusion;
  background: #fff9 var(--noise-pattern);
  border: 1px solid #fffc;
  font-size: 10vmin;
  font-weight: bold;
  line-height: 34px;
  padding: 0;
  text-align: center;
  box-shadow: inset 0 0 0 #0004;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b,
    1px 1px 1px #000b;
  transition: all 0.25s ease;
  outline: none;
}

.square.winner {
  background: #8885;
}

.square:not([disabled]):empty:hover,
.square:not([disabled]):empty:focus {
  box-shadow: inset 0 2px 25px #0006;
  cursor: pointer;
}

.square:not([disabled]):empty:active {
  box-shadow: inset 0 2px 50px #0008;
}
</style>
