import { defineStore } from "pinia";
import { LowSync, LocalStorage } from "lowdb";
import { getColorProperties } from "../services/colors";

const db = new LowSync(new LocalStorage("app-db"));

db.read();
db.data ||= { bookmarks: [], history: [], pickers: [] };

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    bookmarks: db.data.bookmarks,
    history: db.data.history,
    pickers: db.data.pickers,
  }),
  getters: {
    histories(state) {
      const history = [...state.history];

      history.pop();

      return history
        .map((item) => {
          const property = getColorProperties(item.type);

          return {
            ...item,
            title: `${item.type.toUpperCase()}`,
            colorText: property.toString(item.value),
            colorStyle: `#${item.colors.hex}`,
          };
        })
        .reverse();
    },
  },
  actions: {
    addBookmarks(data) {
      this.bookmarks.push(data);
      this.bookmarks = this.bookmarks.slice(
        Math.max(this.bookmarks.length - 20, 0)
      );

      db.write();
    },
    addHistory(data) {
      this.history.push(data);
      this.history = this.history.slice(Math.max(this.history.length - 20, 0));

      db.write();
    },
    addPicker(data) {
      this.pickers.push(data);
      this.pickers = this.pickers.slice(Math.max(this.pickers.length - 20, 0));

      db.write();
    },
  },
});
