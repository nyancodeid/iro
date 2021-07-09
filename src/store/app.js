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
    },
  }),
  actions: {
    setContrast(contrast) {
      this.contrast = contrast;
    },
    toggleHistoryPage() {
      this.historyPage = !this.historyPage;
    },
    setColors({ primary, secondary, text, contrast }) {
      this.colors = {
        primary,
        secondary,
        text,
        contrast,
      };
    },
  },
});
