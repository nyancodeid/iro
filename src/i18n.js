import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const locale = (localStorage.getItem("iro-locale") || "en");

export default createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale,
  messages
});