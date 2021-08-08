<template>
  <header>
    <div class="header-title">
      <h1>IRO</h1>
      <span>Amazing color tools</span>
    </div>
    <div class="header-menu">
      <nav class="header-navbar">
        <a v-if="$route.name === 'convert'" @click="toggleHistory" v-t="'navbar.history'"></a>

        <router-link :to="{ name: 'convert' }" active-class="active" exact v-t="'navbar.convert'"></router-link>
        <router-link :to="{ name: 'picker' }" active-class="active" exact v-t="'navbar.picker'"></router-link>

        <a href="https://github.com/nyancodeid/iro" target="_blank" rel="noopener">Github</a>

        <select class="select-locale" v-model="locale" :title="t('tooltip.select_lang')">
          <option value="en">🇺🇸 EN</option>
          <option value="id">🇮🇩 ID</option>
        </select>
      </nav>
      <div
        class="icon icon-lg"
        :class="`icon-theme-indicator--${contrast}`"
      ></div>
    </div>
  </header>
</template>

<script>
import {computed, watch} from "vue";
import { useAppStore } from "@src/store";
import { useI18n } from "vue-i18n";

export default {
  name: "AppHeader",
  setup() {
    const { t, locale } = useI18n();
    const store = useAppStore();

    const toggleHistory = () => {
      store.toggleHistoryPage();
    };

    watch(locale, (now, prev) => {
      localStorage.setItem("iro-locale", now);
    });

    return {
      t,
      locale,
      contrast: computed(() => store.contrast),
      toggleHistory,
    };
  },
};
</script>

<style lang="scss">
header {
  .select-locale {
    padding: 0.6rem 0.8rem;
    border-radius: 4px;
    outline: none;
    background-color: var(--contrast-color);
    color: var(--text-color);
    border: none;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%), 0 1px 3px 0 rgb(0 0 0 / 20%);

    font-weight: bold;
  }
}

.icon.icon-lg {
  transition: background-image 0.3s ease-in-out;

  &.icon-theme-indicator--white {
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 51 51' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.7078 4.24246C25.9996 6.42838 27.7388 9.25142 28.6184 12.5343C31.1715 22.0625 25.517 31.8564 15.9888 34.4095C12.7058 35.2891 9.3914 35.1945 6.35245 34.3027C10.6877 42.8354 20.5352 47.4724 30.1493 44.8963C41.1876 41.9386 47.7382 30.5926 44.7805 19.5544C42.2044 9.94031 33.265 3.73059 23.7078 4.24246Z' fill='white'/%3E%3C/svg%3E%0A");
  }
  &.icon-theme-indicator--black {
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.0893 4.73837L20 0L15.9107 4.73837L10 2.67949L8.82771 8.82771L2.67949 10L4.73837 15.9107L0 20L4.73837 24.0893L2.67949 30L8.82771 31.1723L10 37.3205L15.9107 35.2616L20 40L24.0893 35.2616L30 37.3205L31.1723 31.1723L37.3205 30L35.2616 24.0893L40 20L35.2616 15.9107L37.3205 10L31.1723 8.82771L30 2.67949L24.0893 4.73837ZM20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z' fill='%23212121'/%3E%3Ccircle cx='20' cy='20' r='8' fill='%23212121'/%3E%3C/svg%3E");
  }
}
</style>
