<template>
  <header>
    <div>
      <h1>IRO</h1>
      <span>Amazing color tools</span>
    </div>
    <nav>
      <a v-if="$route.name == 'convert'" @click="toggleHistory">History</a>

      <router-link :to="{name: 'convert'}" active-class="active" exact>Convert</router-link>
      <router-link :to="{name: 'picker'}" active-class="active" exact>Picker</router-link>
    </nav>

    <img :src="`/icon-${contrast}.svg`" :alt="`icon-${contrast}`" />
  </header>
</template>

<script>
import { useAppStore } from "../store/app";

export default {
  name: "Header",
  setup() {
    const store = useAppStore();
    const toggleHistory = () => {
      store.toggleHistoryPage();
    };
    return {
      store,
      toggleHistory,
    };
  },
  computed: {
    contrast() {
      return this.store.contrast;
    },
  },
};
</script>

<style lang="scss"></style>
