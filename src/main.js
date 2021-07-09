import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "notyf/notyf.min.css";
import "./styles/style.scss";

import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

app.mount("#app");
