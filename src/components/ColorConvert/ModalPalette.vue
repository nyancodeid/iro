<template>
  <div class="modal modal-palette" tabindex="0">
    <div class="modal-header">
      <div class="modal-header--title label">
        <span class="heading">{{ t("modal.palette.label_title") }}</span> {{ t("modal.palette.label_small") }}:
      </div>

      <div class="modal-header--action">
        <div
          class="icon icon-close--black"
          @click="$emit('closed', 'palette')"
        ></div>
      </div>
    </div>
    <div class="modal-content">
      <p class="modal-content--description" v-t="'modal.palette.description'"></p>

      <div class="modal-content--sections" v-if="palette">
        <div class="content-section">
          <div class="content-section--title">
            Complementary <span v-t="'modal.palette.p1_label_small'"></span>
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
          <div class="content-section--title">Analogous <span v-t="'modal.palette.p2_label_small'"></span></div>
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
          <div class="content-section--title">Triadic <span v-t="'modal.palette.p3_label_small'"></span></div>
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
      <div class="modal-content--sections" v-else>
        <span>Loading</span>
      </div>

      <p class="modal-content--description">
        <span>{{ t('modal.palette.learn_more') }} <a href="https://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm" rel="noreferrer" v-t="'modal.palette.label_small'"></a></span>
      </p>
    </div>
  </div>
</template>

<script>
import {useI18n} from "vue-i18n";
import { mapState } from "pinia";

import { useAppStore } from "@src/store";
import { generateMaterialPalette } from "@src/services/colors";

export default {
  name: "ModalPalette",
  props: {
    color: String,
  },
  data() {
    return {
      palette: null
    };
  },
  setup () {
    const { t } = useI18n();
    return { t };
  },
  async mounted() {
    const palette = await generateMaterialPalette(this.color);

    this.palette = palette;
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
        return this.palette.harmonies.complementary === gradient.toLowerCase();
      } else if (type === "analogous.primary") {
        return this.palette.harmonies.analogous[0] === gradient.toLowerCase();
      } else if (type === "analogous.secondary") {
        return this.palette.harmonies.analogous[1] === gradient.toLowerCase();
      } else if (type === "triadic.primary") {
        return this.palette.harmonies.triadic[0] === gradient.toLowerCase();
      } else if (type === "triadic.secondary") {
        return this.palette.harmonies.triadic[1] === gradient.toLowerCase();
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
    async color() {
      this.palette = await generateMaterialPalette(this.color);
    },
  },
};
</script>

<style lang="scss">
.modal.modal-palette {
  color: black;
  background-color: var(--modal-color, #F5F5F5);

  .modal-content {
    .modal-content--description {
      width: calc(48px * 9);
      display: block;
      font-size: 0.7rem;
    }
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
  .modal.modal-palette .modal-content {
    .modal-content--description {
      width: 100%;
    }
    
    .content-section .content-section--items .content-section--item {
      height: calc((100vw - 32px) / 9);
      width: calc((100vw - 32px) / 9);
    }
  }
}
</style>
