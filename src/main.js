import { createApp } from "vue";
import { createPinia } from "pinia";

import { isRunningOnPWA } from "./services/utils";
import App from "./App.vue";

import "notyf/notyf.min.css";
import "./styles/style.scss";

import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

if (isRunningOnPWA) window.resizeTo(400, 850);

app.mount("#app");
