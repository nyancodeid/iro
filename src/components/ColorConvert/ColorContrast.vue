<template>
  <div class="section contrast-wrapper">
    <div class="label"><span class="heading">YIQ</span> {{ t("yiq.label_small") }}:</div>
    <div class="content">
      {{ result }}
    </div>
  </div>
</template>

<script>
import {useI18n} from "vue-i18n";
import {yiqContrastColor} from "@src/services/colors";

export default {
  name: "ColorContrast",
  props: {
    contrast: Number,
  },
  setup () {
    const { t } = useI18n();
    return { t };
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
