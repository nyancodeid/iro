<template>
  <div id="content">
    <div class="main">
      <div class="main-wrapper">
        <ColorInput
          :type="activeColor"
          :hex="hexColor"
          :color="contrastColor"
          @colorChanged="onColorChanged"
          @toggleModal="toggleModalStatus"
        />
        <ColorContrast :contrast="contrast" />
        <ColorContrastChecker
          :foreground="colors.text"
          :background="colors.contrast"
          :color="contrastColor"
        />
      </div>
    </div>
    <div class="navbar">
      <ColorGradient
        :gradients="gradients"
        @colorChanged="onColorChanged"
      />
      <ButtonConvert
        :types="inactiveColor"
        @typeChanged="onColorTypeChanged"
      />
      <ButtonRandomColor @colorChanged="onColorChanged" />
    </div>

    <ColorHistory :contrast="contrastColor" @colorChanged="onColorChanged" />
  </div>

  <div id="modal" :class="{ active: modal.status }">
    <transition name="modal">
      <ModalStyle
        v-if="modal.status && modal.activeId === 'style'"
        @closed="toggleModalStatus"
      />
      <ModalPalette
        v-else-if="modal.status && modal.activeId === 'palette'"
        :color="hexColor"
        @closed="toggleModalStatus"
        @colorChanged="onColorChanged"
      />
    </transition>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState, mapActions } from "pinia";

import { useAppStore, useDataStore } from "@src/store";

import ColorContrast from "@src/components/ColorConvert/ColorContrast.vue";
import ColorContrastChecker from "@src/components/ColorConvert/ColorContrastChecker.vue";
import ColorGradient from "@src/components/ColorConvert/ColorGradient.vue";
import ColorInput from "@src/components/ColorConvert/ColorInput.vue";
import ButtonConvert from "@src/components/ColorConvert/ButtonConvert.vue";
import ButtonRandomColor from "@src/components/ColorConvert/ButtonRandomColor.vue";

const ColorHistory = defineAsyncComponent(() => import("@src/components/ColorConvert/ColorHistory.vue"));
const ModalStyle = defineAsyncComponent(() => import("@src/components/ColorConvert/ModalStyle.vue"));
const ModalPalette = defineAsyncComponent(() => import("@src/components/ColorConvert/ModalPalette.vue"));

import {
  calculateColor,
  generateCssColor,
  yiqContrastColor,
  generateRandomColor,
} from "@src/services/colors";
import { normalize, isString } from "@src/services/utils";

export default {
  components: {
    ColorContrast,
    ColorContrastChecker,
    ButtonRandomColor,
    ColorGradient,
    ColorInput,
    ButtonConvert,
    ColorHistory,
    ModalStyle,
    ModalPalette,
  },
  data() {
    return {
      modal: {
        activeId: "style",
        status: false,
      },
      contrast: 0,
      gradients: [],
      types: [
        { title: "HEX", id: "hex", selected: true, value: "212121" },
        { title: "RGB", id: "rgb", selected: false, value: [33, 33, 33] },
        { title: "HSL", id: "hsl", selected: false, value: [0, 0, 12.9] },
        { title: "CMYK", id: "cmyk", selected: false, value: [0, 0, 0, 87] },
      ],
    };
  },
  activated() {
    window.addEventListener("keyup", this.onKeyPressed);
    this.initialize();
  },
  mounted() {
    this.onColorChanged(["hex", "212121"]);
  },
  computed: {
    ...mapState(useAppStore, ["colors", "historyPage"]),
    ...mapState(useDataStore, ["bookmarks", "history"]),
    hexColor() {
      const hex = this.types.find((type) => type.id === "hex");
      return hex.value;
    },
    activeColor() {
      return this.types.find((type) => type.selected);
    },
    inactiveColor() {
      return this.types.filter((type) => !type.selected);
    },
    contrastColor() {
      return yiqContrastColor(this.contrast);
    },
  },
  methods: {
    ...mapActions(useAppStore, ["setContrast", "setColors", "toggleHistoryPage"]),
    ...mapActions(useDataStore, ["addHistory"]),
    initialize() {
      const params = this.$route.params;

      if (isString(params.type) && isString(params.color)) {
        let { type, color } = params;

        if (type !== "hex") {
          color = color.split(",");

          this.onColorTypeChanged(type);
        }

        this.onColorChanged([type, color]);
      }
    },
    onKeyPressed($event) {
      if (this.modal.status && $event.code === "Escape") {
        this.modal.status = false;
      } else if (this.historyPage && $event.code === "Escape") {
        this.toggleHistoryPage();
      } else if ($event.code === "Space") {
        this.onColorChanged(["rgb", generateRandomColor()]);
      }
    },
    setSelectedType() {
      const selected = this.types.find((type) => type.selected);
      const { contrast, gradients } = generateCssColor({
        type: selected.id,
        value: selected.value,
      });

      this.contrast = contrast.yiq;
      this.gradients = gradients;
    },
    onColorChanged([id, value]) {
      const { colors, contrast, gradients, variable } = calculateColor(
        id,
        value
      );

      this.contrast = contrast.yiq;
      this.gradients = gradients;
      this.types = this.types.map((type) => {
        let colorValues =
          type.id !== "hex" ? normalize(colors[type.id]) : colors[type.id];

        return { ...type, value: colorValues };
      });

      this.$nextTick(() => {
        this.setContrast(contrast.result);
        this.setColors(variable);
        this.addHistory({
          type: this.activeColor.id,
          value: this.activeColor.value,
          colors,
        });
      });
    },
    onColorTypeChanged(id) {
      this.types = this.types.map((type) => {
        return { ...type, selected: type.id === id };
      });
    },
    toggleModalStatus(type) {
      this.modal.activeId = type;
      this.modal.status = !this.modal.status;
    },
  },
  deactivated() {
    window.removeEventListener("keyup", this.onKeyPressed);
  },
};
</script>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  transform: scale(0);
}
.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
}
</style>
