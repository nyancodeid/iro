<template>
  <div id="content">
    <div class="main">
      <div class="main-wrapper">
        <color-input
          :type="activeColor"
          :hex="hexColor"
          :color="contrastColor"
          @colorChanged="onColorChanged"
          @toggleStyle="toggleModalStyle"
        ></color-input>
        <color-contrast :contrast="contrast"></color-contrast>
        <color-contrast-checker
          :foreground="colors.text"
          :background="colors.contrast"
          :color="contrastColor"
        ></color-contrast-checker>
      </div>
    </div>
    <div class="navbar">
      <color-gradient
        :gradients="gradients"
        @colorChanged="onColorChanged"
      ></color-gradient>
      <button-convert
        :types="inactiveColor"
        @typeChanged="onColorTypeChanged"
      ></button-convert>
      <button-random-color @colorChanged="onColorChanged"></button-random-color>
    </div>

    <history :contrast="contrastColor" @colorChanged="onColorChanged"></history>
  </div>

  <div id="modal" :class="{ active: modalStatus }">
    <modal-style
      :status="modalStatus"
      :colors="types"
      :gradients="gradients"
      @closed="toggleModalStyle"
    ></modal-style>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";

import History from "../components/History.vue";
import ColorContrast from "../components/ColorConvert/ColorContrast.vue";
import ColorContrastChecker from "../components/ColorConvert/ColorContrastChecker.vue";
import ColorGradient from "../components/ColorConvert/ColorGradient.vue";
import ColorInput from "../components/ColorConvert/ColorInput.vue";
import ButtonConvert from "../components/ColorConvert/ButtonConvert.vue";
import ButtonRandomColor from "../components/ColorConvert/ButtonRandomColor.vue";
import ModalStyle from "../components/ColorConvert/ModalStyle.vue";

import { useAppStore } from "../store/app";
import { useDataStore } from "../store/data";

import { calculateColor, yiqContrastColor } from "../services/colors";
import { normalize } from "../services/utils";

export default {
  components: {
    ColorContrast,
    ColorContrastChecker,
    ButtonRandomColor,
    ColorGradient,
    ColorInput,
    ButtonConvert,
    ModalStyle,
    History,
  },
  data() {
    return {
      modalStatus: false,
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
  beforeMount() {
    this.initialize();
  },
  activated() {
    this.initialize();
  },
  mounted() {
    this.setSelectedType();
  },
  computed: {
    ...mapState(useAppStore, ["colors"]),
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
    ...mapActions(useAppStore, ["setContrast", "setColors"]),
    ...mapActions(useDataStore, ["addHistory"]),
    initialize() {
      const params = this.$route.params;

      if (params?.type && params?.color) {
        let { type, color } = params;

        if (type != "hex") {
          color = color.split(",");

          this.onColorTypeChanged(type);
        }

        this.onColorChanged([type, color]);
      } else {
        this.setContrast("white");
      }
    },
    setSelectedType() {
      const selected = this.types.find((type) => type.selected);
      const { contrast, gradients } = calculateColor(
        selected.id,
        selected.value,
        false
      );

      this.contrast = contrast.yiq;
      this.gradients = gradients;
    },
    onColorChanged([id, value]) {
      const { colors, contrast, gradients, variable } = calculateColor(
        id,
        value,
        true
      );

      this.contrast = contrast.yiq;
      this.gradients = gradients;
      this.types = this.types.map((type) => {
        let colorValues =
          type.id !== "hex" ? normalize(colors[type.id]) : colors[type.id];

        return { ...type, value: colorValues };
      });

      this.setContrast(contrast.result);
      this.setColors(variable);
      this.addHistory({
        type: this.activeColor.id,
        value: this.activeColor.value,
        colors,
      });
    },
    onColorTypeChanged(id) {
      this.types = this.types.map((type) => {
        return { ...type, selected: type.id === id };
      });
    },
    toggleModalStyle() {
      this.modalStatus = !this.modalStatus;
    },
  },
  deactivate() {},
};
</script>
