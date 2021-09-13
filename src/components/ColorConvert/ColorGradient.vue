<template>
  <div
    class="section gradient-wrapper"
    :class="`gradient-wrapper--${contrast}`"
  >
    <div class="label"><span class="heading" v-t="'gradient.label_title'"></span> {{ t("gradient.label_small") }}:</div>
    <div class="content">
      <div class="gradient-boxs">
        <div
          class="gradient-box"
          v-for="(gradient, index) in gradients"
          :key="index"
          :class="{ primary: isPrimary(gradient) }"
          :style="{ backgroundColor: gradient }"
          @click="onColorChanged(gradient)"
        >
          <span class="color-label--hex">{{ hexColor(gradient) }}</span>
          <span class="color-label--primary" v-if="isPrimary(gradient)">P</span>
          <span class="color-label--index">{{ colorIndexName(index) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { getColorProperties } from "@src/services/colors";
import { rgb as converter } from "@src/services/converter";
import { useAppStore } from "@src/store";

const rgb = getColorProperties("rgb");

export default {
  name: "ColorGradient",
  props: {
    gradients: Array,
  },
  setup() {
    const { t } = useI18n();
    const store = useAppStore();
    const color = computed(() => store.colors.primary);
    return {
      t,
      color,
      contrast: store.contrast
    };
  },
  methods: {
    isPrimary(gradient) {
      const primaryColor = this.color.join(",");
      const gradientColor = rgb.toArray(gradient).join(",");

      return gradientColor === primaryColor;
    },
    onColorChanged(color) {
      this.$emit("colorChanged", ["rgb", rgb.toArray(color)]);
    },
    hexColor(gradient) {
      const color = rgb.toArray(gradient);
      return `#${converter.toHex(color)}`;
    },
    colorIndexName(index) {
      return (9 - index) * 100;
    }
  },
};
</script>

<style lang="scss">
.gradient-wrapper {
  .gradient-boxs {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin: 0.5rem 0;

    .gradient-box {
      position: relative;
      cursor: pointer;
      width: 40px;
      height: 40px;
      transition: transform 165ms cubic-bezier(0.4, 0, 0.2, 1),
        border-radius 380ms cubic-bezier(0.4, 0, 0.2, 1) 215ms;

      &.primary {
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
        border-radius: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .color-label--primary {
          font-size: 16px;
          color: var(--contrast-color);
        }
      }

      .color-label--index {
        position: absolute;
        display: block;
        font-size: 11px;
        bottom: -16px;
        width: 100%;

        text-align: center;
      }
      .color-label--hex {
        position: absolute;
        top: -28px;
        width: 50px;
        height: 22px;
        display: none;
        background: var(--secondary-color);
        border-radius: 2px;
        color: var(--text-color);
        font-size: 10px;
        font-weight: 500;
        line-height: 22px;
        text-align: center;
        text-transform: uppercase;
      }

      @media only screen and (max-width: 768px) {
        .color-label--index {
          bottom: -17px;
          font-size: 10px;
        }
      }
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .gradient-wrapper .gradient-boxs .gradient-box {
    &:hover {
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
      transform: scale(1.25);
      z-index: 100;

      .color-label--hex {
        display: block;
      }
    }
  }
}
</style>
