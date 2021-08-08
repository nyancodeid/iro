<template>
  <div class="video-color--result" :class="`bg-${contrast}-contrast`">
    <div class="video-color--result-label">
      <span class="heading" v-t="'color_result.label_title'"></span> {{ t("color_result.label_small") }} :
    </div>
    <div class="video-color--result-wrapper">
      <div class="video-color--result-empty" v-if="pickers.length == 0">
        <span v-t="'color_result.empty'"></span>
      </div>

      <div
        class="video-color--result-item"
        v-for="(item, index) in pickers"
        :key="index"
      >
        <div
          class="result-item--color"
          :style="`background-color: ${item.colorStyle}`"
          @click="openColor(item)"
        ></div>
        <div class="result-item--text">{{ item.colorText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";

import { useAppStore, useDataStore } from "@src/store";
import {useI18n} from "vue-i18n";

export default {
  name: "ColorResult",
  props: {
    colors: Array,
  },
  setup() {
    const { t } = useI18n();

    return { t };
  },
  computed: {
    ...mapState(useAppStore, ["contrast"]),
    ...mapState(useDataStore, ["pickers"]),
  },
  methods: {
    openColor(item) {
      this.$router.push({
        name: "convert",
        params: {
          type: "hex",
          color: item.value,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.video-color--result {
  border-radius: 0.5em;

  width: 414px;
  padding: 12px;

  .video-color--result-label {
    color: var(--contrast-color);
    font-size: 0.7rem;

    padding-left: 6px;
    margin-bottom: 8px;

    > .heading {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .video-color--result-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    .video-color--result-empty {
      background-color: var(--black-contrast);
      text-align: center;
      width: 100%;
      border-radius: 0.5em;
      padding: 16px;
      margin: 8px 8px 16px 8px;
      color: var(--darker-color);
      font-size: 14px;
    }

    .video-color--result-item {
      margin-bottom: 12px;
      margin-right: 8px;
      margin-left: 8px;
      width: calc((100% / 6) - 3px);
      cursor: pointer;

      .result-item--color {
        width: 100%;
        height: 54px;

        border-radius: 0.3em;
      }
      .result-item--text {
        color: var(--contrast-color);
        font-size: 12.5px;

        font-weight: bold;
        margin-top: 8px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .video-color--result {
    margin-top: 16px;
    justify-content: center;
    width: calc(100% - 24px);

    .video-color--result-wrapper .video-color--result-item {
      width: calc((100% / 5) - 1px);

      .result-item--text {
        font-size: 12px;
      }
    }
  }
}
</style>
