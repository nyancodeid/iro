<template>
  <div class="modal modal-palette" tabindex="0" :style="`background-color: ${palette[100]}`">
    <div class="modal-header">
      <div class="modal-header--title label">
        <span class="heading">Palette</span> color harmonies:
      </div>

      <div class="modal-header--action">
        <div
          class="icon icon-close--black"
          @click="$emit('closed', 'palette')"
        ></div>
      </div>
    </div>
    <div class="modal-content">
      <div class="content-section">
        <div class="content-section--title">
          Complementary <span>color:</span>
        </div>
        <div class="content-section--items">
          <div
            v-for="(gradient, index) in gradients.complementary"
            v-bind:key="index"
            class="content-section--item"
            :class="{ primary: isPrimary('complementary', gradient) }"
            :style="`background-color: ${gradient}`"
            :title="gradient"
            @click="onColorChanged(gradient)"
          >
            <span class="color-label">{{ colorIndexName(index) }}</span>
          </div>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section--title">Analogous <span>color:</span></div>
        <div class="content-section--items without-label">
          <div
            v-for="(gradient, index) in gradients.analogous[0]"
            :key="index"
            class="content-section--item"
            :class="{ primary: isPrimary('analogous.primary', gradient) }"
            :style="`background-color: ${gradient}`"
            :title="gradient"
            @click="onColorChanged(gradient)"
          ></div>
        </div>
        <div class="content-section--items">
          <div
            v-for="(gradient, index) in gradients.analogous[1]"
            :key="index"
            class="content-section--item"
            :class="{ primary: isPrimary('analogous.secondary', gradient) }"
            :style="`background-color: ${gradient}`"
            :title="gradient"
            @click="onColorChanged(gradient)"
          >
            <span class="color-label">{{ colorIndexName(index) }}</span>
          </div>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section--title">Triadic <span>color:</span></div>
        <div class="content-section--items without-label">
          <div
            v-for="(gradient, index) in gradients.triadic[0]"
            :key="index"
            class="content-section--item"
            :class="{ primary: isPrimary('triadic.primary', gradient) }"
            :style="`background-color: ${gradient}`"
            :title="gradient"
            @click="onColorChanged(gradient)"
          ></div>
        </div>
        <div class="content-section--items">
          <div
            v-for="(gradient, index) in gradients.triadic[1]"
            :key="index"
            class="content-section--item"
            :class="{ primary: isPrimary('triadic.secondary', gradient) }"
            :style="`background-color: ${gradient}`"
            :title="gradient"
            @click="onColorChanged(gradient)"
          >
            <span class="color-label">{{ colorIndexName(index) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";

import { useAppStore } from "@src/store";
import { generateMaterialPalette } from "@src/services/colors";

export default {
  name: "ModalPalette",
  props: {
    color: String,
  },
  data() {
    const palette = generateMaterialPalette(this.color);
    return {
      palette,
    };
  },
  computed: {
    ...mapState(useAppStore, { contrast: "contrast" }),
    gradients() {
      return {
        complementary: this.palette.toGradient("hex", true, "complementary"),
        analogous: [
          this.palette.toGradient("hex", true, "analogous.primary"),
          this.palette.toGradient("hex", true, "analogous.secondary"),
        ],
        triadic: [
          this.palette.toGradient("hex", true, "triadic.primary"),
          this.palette.toGradient("hex", true, "triadic.secondary"),
        ],
      };
    },
  },
  methods: {
    isPrimary(type, gradient) {
      if (type === "complementary") {
        return this.palette._raw_.complementary() === gradient.toLowerCase();
      } else if (type === "analogous.primary") {
        return this.palette._raw_.firstAnalogous() === gradient.toLowerCase();
      } else if (type === "analogous.secondary") {
        return this.palette._raw_.secondAnalogous() === gradient.toLowerCase();
      } else if (type === "triadic.primary") {
        return this.palette._raw_.firstTriadic() === gradient.toLowerCase();
      } else if (type === "triadic.secondary") {
        return this.palette._raw_.secondTriadic() === gradient.toLowerCase();
      }
    },
    onColorChanged(color) {
      this.$emit("colorChanged", ["hex", color.replace("#", "")]);
    },
    colorIndexName(index) {
      return (9 - index) * 100;
    }
  },
  watch: {
    color() {
      this.palette = generateMaterialPalette(this.color);
    },
  },
};
</script>

<style lang="scss">
.modal.modal-palette {
  color: black;

  .modal-content {
    .content-section {
      margin: 1rem 0 1.5rem 0;

      .content-section--title {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;

        > span {
          font-size: 11px;
          font-weight: normal;
        }
      }
      .content-section--items {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        margin-bottom: 2rem;

        &.without-label {
          margin-bottom: 2px;
        }

        .content-section--item {
          position: relative;
          cursor: pointer;
          height: 48px;
          width: 48px;
          transition: transform 165ms cubic-bezier(0.4, 0, 0.2, 1),
            border-radius 380ms cubic-bezier(0.4, 0, 0.2, 1) 215ms,
            background 500ms linear;

          &.primary {
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
            border-radius: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
          }
          .color-label {
            position: absolute;
            display: block;
            font-size: 11px;
            bottom: -16px;
            width: 100%;

            text-align: center;
          }
        }
      }
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .modal-palette .content-section--items .content-section--item:not(.primary):hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    transform: scale(1.25);
    z-index: 100;
  }
}
@media only screen and (max-width: 768px) {
  .modal.modal-palette .modal-content .content-section .content-section--items .content-section--item {
    height: calc((100vw - 32px) / 9);
    width: calc((100vw - 32px) / 9);
  }
}
</style>
