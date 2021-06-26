import { createApp } from "vue";
import App from "./App.vue";

import 'notyf/notyf.min.css';
import "./styles/style.scss";

import store from "./store";
import router from "./router";

const app = createApp(App);

app.use(store).use(router);

app.mount("#app");
