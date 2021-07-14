<template>
  <div class="section gradstop-wrapper">
    <div class="label"><span class="heading">Gradient</span> color:</div>
    <div class="content">
      <ul class="gradient-boxs">
        <li
          v-for="(grandient, index) in gradients"
          v-bind:key="index"
          class="gradient-box"
          title="Click to set color"
          :style="`background-color: ${grandient};`"
          @click="onColorChanged(grandient)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "../../store";
export default {
  name: "ColorGradient",
  props: {
    gradients: Array,
  },
  methods: {
    onColorChanged(color) {
      const extract = color.replace("rgb(", "").replace(")", "").split(", ");

      this.$emit("colorChanged", ["rgb", extract]);
    },
  },
};
</script>

<style lang="scss">
.gradient-boxs,
.color-boxs {
  padding-inline-start: unset;
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  > .gradient-box,
  > .color-box {
    cursor: pointer;
    height: 40px;
    width: 40px;

    &:hover {
      transform: scale(1.5);
      z-index: 100;
    }
  }
}
</style>
