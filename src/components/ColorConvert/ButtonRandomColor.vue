<template>
  <div class="section random-wrapper">
    <div class="label-wrapper">
      <div class="label"><span class="heading">Generate</span> random color:</div>
      <span class="label-right">or tab <strong>space</strong></span>
    </div>
    <div class="content">
      <button class="button" @click="onRandomColor">RANDOM COLOR</button>
    </div>
  </div>
</template>

<script>
import { generateRandomColor } from "@src/services/colors";

export default {
  name: "ButtonRandomColor",
  methods: {
    onRandomColor() {
      this.$emit("colorChanged", ["rgb", generateRandomColor()]);
    },
  }
};
</script>

<style lang="scss">
.random-wrapper {
  .label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .label-right {
      text-align: right;
      font-size: 0.7rem;
    }
  }

  .content .button {
    text-transform: uppercase;
  }
}
</style>
