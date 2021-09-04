import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    contrast: "white",
    historyPage: false,
    colors: {
      primary: [33, 33, 33],
      secondary: [33, 33, 33],
      text: [33, 33, 33],
      contrast: [255, 255, 255],
      variables: [
        ["--primary-color", "rgb(33, 33, 33)"],
        ["--secondary-color", "rgb(245, 245, 245)"],
        ["--text-color", "rgb(33, 33, 33)"],
        ["--contrast-color", "white"],
        ["--dark-color-value", "66, 66, 66"],
        ["--darken-color", "rgb(66, 66, 66)"],
        ["--modal-color", "rgb(245, 245, 245)"],
        ["--gradient-100", "rgb(245, 245, 245)"],
        ["--gradient-200", "rgb(238, 238, 238)"],
        ["--gradient-300", "rgb(224, 224, 224)"],
        ["--gradient-400", "rgb(189, 189, 189)"],
        ["--gradient-500", "rgb(158, 158, 158)"],
        ["--gradient-600", "rgb(117, 117, 117)"],
        ["--gradient-700", "rgb(97, 97, 97)"],
        ["--gradient-800", "rgb(66, 66, 66)"],
        ["--gradient-900", "rgb(33, 33, 33)"],
      ],
      primaryIndex: 0,
    },
  }),
  actions: {
    setContrast(contrast) {
      this.contrast = contrast;
    },
    toggleHistoryPage() {
      this.historyPage = !this.historyPage;
    },
    setColors(colors) {
      this.colors = { ...colors };
    },
  },
});
