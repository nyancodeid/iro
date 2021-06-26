<template>
  <div class="section contrast-wrapper">
    <div class="label"><span class="heading">YIQ</span> Contrast Ratio:</div>
    <div class="content">
      {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorContrast",
  props: {
    contrast: Number,
  },
  computed: {
    result() {
      const color = this.contrast >= 128 ? "black" : "white";

      return `${this.contrast.toFixed(0)} (${color})`;
    },
  },
};
</script>

<style></style>
