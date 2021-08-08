<template>
  <div class="section random-wrapper">
    <div class="label-wrapper">
      <div class="label"><span class="heading" v-t="'random.label_title'"></span> {{ t("random.label_small") }}:</div>
      <span class="label-right" v-t="'random.label_space'"></span>
    </div>
    <div class="content">
      <button class="button" @click="onRandomColor" v-t="'random.btn_text'"></button>
    </div>
  </div>
</template>

<script>
import { generateRandomColor } from "@src/services/colors";
import {useI18n} from "vue-i18n";

export default {
  name: "ButtonRandomColor",
  setup () {
    const { t } = useI18n();
    return { t };
  },
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
