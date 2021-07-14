import { defineStore } from "pinia";
import { getColorProperties } from "../services/colors";
import Storage from "../services/storage";

const VERSION = "2.0.5";
const DEFAULT_DATA = { bookmarks: [], history: [], pickers: [], version: VERSION };

// const db = new LowSync(new LocalStorage("app-db"));
const db = new Storage("app-db");

db.read();
db.data ||= DEFAULT_DATA;

if (db.data.version !== VERSION) {
  db.data = DEFAULT_DATA;
  db.write();
}

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    bookmarks: db.data.bookmarks,
    history: db.data.history,
    pickers: db.data.pickers,
  }),
  getters: {
    histories(state) {
      const history = [...this.history];

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
      db.data.bookmarks.push(data);
      db.data.bookmarks = db.data.bookmarks.slice(
        Math.max(db.data.bookmarks.length - 20, 0)
      );

      this.bookmarks = db.data.bookmarks;

      db.write();
    },
    addHistory(data) {
      db.data.history.push(data);
      db.data.history = db.data.history.slice(Math.max(db.data.history.length - 20, 0));

      this.history = db.data.history;

      db.write();
    },
    addPicker(data) {
      db.data.pickers.push(data);
      db.data.pickers = db.data.pickers.slice(Math.max(db.data.pickers.length - 20, 0));

      this.pickers = db.data.pickers;

      db.write();
    },
  },
});
