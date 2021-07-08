import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    contrast: "white",
    historyPage: false,
  }),
  actions: {
    setContrast(contrast) {
      this.contrast = contrast;
    },
    toggleHistoryPage() {
      this.historyPage = !this.historyPage;
    },
  },
});
