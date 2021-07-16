<template>
  <div
    class="section gradstop-wrapper"
    :class="`gradstop-wrapper--${contrast}`"
  >
    <div class="label"><span class="heading">Gradient</span> color:</div>
    <div class="content">
      <div class="gradient-boxs">
        <div
          v-for="(gradient, index) in gradients"
          v-bind:key="index"
          class="gradient-box"
          :class="{ primary: isPrimary(gradient) }"
          @click="onColorChanged(gradient)"
        >
          <span class="color-label--hex">{{ hexColor(gradient) }}</span>
          <span class="color-label--primary" v-if="isPrimary(gradient)">P</span>
          <span class="color-label--index">{{ (9 - index) * 100 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
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
    const store = useAppStore();
    const color = computed(() => store.colors.primary);
    return {
      color,
      contrast: store.contrast,
      store,
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
  },
};
</script>

<style lang="scss">
.gradstop-wrapper {
  .gradient-boxs {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin: 0.5rem 0;

    .gradient-box {
      position: relative;
      cursor: pointer;
      height: 48px;
      width: 48px;
      transition: transform 165ms cubic-bezier(0.4, 0, 0.2, 1),
        border-radius 380ms cubic-bezier(0.4, 0, 0.2, 1) 215ms,
        background 500ms linear;

      &:nth-child(1) {
        background-color: var(--gradient-900);
      }
      &:nth-child(2) {
        background-color: var(--gradient-800);
      }
      &:nth-child(3) {
        background-color: var(--gradient-700);
      }
      &:nth-child(4) {
        background-color: var(--gradient-600);
      }
      &:nth-child(5) {
        background-color: var(--gradient-500);
      }
      &:nth-child(6) {
        background-color: var(--gradient-400);
      }
      &:nth-child(7) {
        background-color: var(--gradient-300);
      }
      &:nth-child(8) {
        background-color: var(--gradient-200);
      }
      &:nth-child(9) {
        background-color: var(--gradient-100);
      }

      &.primary {
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
        border-radius: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .primary-label {
          font-size: 16px;
          color: var(--contrast-color);
        }
      }

      .color-label {
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
        width: 100%;
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
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .gradstop-wrapper .gradient-boxs .gradient-box {
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
