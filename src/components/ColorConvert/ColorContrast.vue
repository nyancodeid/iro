<template>
  <div class="section contrast-wrapper">
    <div class="label"><span class="heading">YIQ</span> Contrast Ratio:</div>
    <div class="content">
      {{ result }}
    </div>
  </div>
</template>

<script>
import {yiqContrastColor} from "@src/services/colors";
export default {
  name: "ColorContrast",
  props: {
    contrast: Number,
  },
  computed: {
    result() {
      const contrast = yiqContrastColor(this.contrast);
      const contrastText = this.t(`yiq.contrast_${contrast}`);

      return `${this.contrast.toFixed(0)} (${contrastText})`;
    },
  },
};
</script>

<style></style>
