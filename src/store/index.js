import { createStore } from "vuex";
import { LowSync, LocalStorage } from "lowdb";
import { getColorProperties } from "../services/colors";

const db = new LowSync(new LocalStorage('app-db'))

db.read();
db.data ||= { bookmarks: [], history: [], pickers: [] };

const store = createStore({
  state: {
    contrast: "white",
    bookmarks: db.data.bookmarks,
    history: db.data.history,
    pickers: db.data.pickers,
    historyPage: false,
  },
  getters: {
    histories (state) {
      const history = [ ...state.history ];

      history.pop();

      return history.map(item => {
        const property = getColorProperties(item.type)

        return {
          ...item,
          title: `${item.type.toUpperCase()}`,
          colorText: property.toString(item.value),
          colorStyle: `#${item.colors.hex}`
        }
      }).reverse();
    },
    rePickers (state) {
      return state.pickers.reverse();
    },
    incontrast (state) {
      return (state.contrast == "white") ? "black" : "white";
    }
  },
  mutations: {
    setContrast(state, contrast) {
      state.contrast = contrast;
    },
    addBookmarks (state, data) {
      state.bookmarks.push(data);
      state.bookmarks = state.bookmarks.slice(Math.max(state.bookmarks.length - 20, 0));

      db.write();
    },
    addHistory (state, data) {
      state.history.push(data);
      state.history = state.history.slice(Math.max(state.history.length - 20, 0));

      db.write();
    },
    addPicker (state, data) {
      state.pickers.push(data);
      state.pickers = state.pickers.slice(Math.max(state.pickers.length - 20, 0));

      db.write();
    },
    toggleHistoryPage (state) {
      state.historyPage = !state.historyPage;
    }
  },
  actions: {
    addBookmarks ({ commit }, data) {
      commit("addBookmarks", data);
    },
    addHistory ({ commit }, data) {
      commit("addHistory", data);
    },
    addPicker ({ commit }, data) {
      commit("addPicker", data);
    }
  },
  modules: {},
});

export default store;
