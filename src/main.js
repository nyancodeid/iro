import { createApp } from "vue";
import { createPinia } from "pinia";

import { isRunningOnPWA } from "@src/services/utils";
import App from "@src/App.vue";

import "notyf/notyf.min.css";
import "@src/styles/style.scss";

import router from "@src/router";
import i18n from "@src/i18n";

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(i18n)
  .use(router);

if (isRunningOnPWA) window.resizeTo(400, 800);

app.mount("#app");
