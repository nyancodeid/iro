<template>
  <div id="content">
    <div class="main">
      <div class="main-wrapper">
        <color-input :type="activeColor" :hex="hex" :color="contrastColor" @changed="onColorChanged"></color-input>
        <color-contrast :contrast="contrast"></color-contrast>
      </div>
    </div>
    <div class="navbar">
      <color-gradient
        :gradients="gradients"
        @changed="onColorChanged"
      ></color-gradient>
      <button-convert :types="inactiveColor" @changed="onColorTypeChanged"></button-convert>
      <button-random-color @changed="onColorChanged"></button-random-color>
    </div>

    <history @changed="onColorChanged"></history>
  </div>
</template>

<script>
import { mapState } from "vuex";

import History from "../components/History.vue";
import ColorContrast from "../components/ColorConvert/ColorContrast.vue";
import ColorGradient from "../components/ColorConvert/ColorGradient.vue";
import ColorInput from "../components/ColorConvert/ColorInput.vue";
import ButtonConvert from "../components/ColorConvert/ButtonConvert.vue";
import ButtonRandomColor from "../components/ColorConvert/ButtonRandomColor.vue";

import { calculateColor, yiqContrastColor } from "../services/colors";
import { normalize } from "../services/utils";

export default {
  components: { ColorContrast, ButtonRandomColor, ColorGradient, ColorInput, ButtonConvert, History },
  data() {
    return {
      contrast: 0,
      gradients: [],
      hex: "212121",
      types: [
        { title: "HEX", id: "hex", selected: false, value: "212121" },
        { title: "RGB", id: "rgb", selected: false, value: [33, 33, 33] },
        { title: "HSL", id: "hsl", selected: false, value: [0, 0, 12.9] },
        { title: "CMYK", id: "cmyk", selected: true, value: [0, 0, 0, 87] },
      ],
    };
  },
  mounted() {
    this.setSelectedType();
  },
  computed: {
    ...mapState([
      "bookmarks", "history"
    ]),
    activeColor() {
      return this.types.find(type => type.selected);
    },
    inactiveColor() {
      return this.types.filter(type => !type.selected);
    },
    contrastColor () {
      return yiqContrastColor(this.contrast);
    }
  },
  methods: {
    setSelectedType() {
      const selected = this.types.find((type) => type.selected);
      const { colors, contrast, gradients } = calculateColor(
        selected.id,
        selected.value,
        false
      );

      this.contrast = contrast.yiq;
      this.gradients = gradients;
      this.hex = colors.hex;
    },
    onColorChanged([id, value]) {
      const { colors, contrast, gradients } = calculateColor(id, value, true);

      this.hex = colors.hex;
      this.contrast = contrast.yiq;
      this.gradients = gradients;
      this.types = this.types.map((type) => {
        let colorValues =
          type.id !== "hex"
            ? normalize(colors[type.id])
            : colors[type.id];

        return { ...type, value: colorValues };
      });

      this.$store.commit("setContrast", contrast.result);
      this.$store.dispatch("addHistory", {
        type: this.activeColor.id,
        value: this.activeColor.value,
        colors
      });
    },
    onColorTypeChanged (id) {
      this.types = this.types.map(type => {
        return { ...type, selected: type.id === id };
      });
    },
  },
};
</script>
