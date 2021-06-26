<template>
  <header>
    <div>
      <h1>IRO</h1>
      <span>Amazing color tools</span>
    </div>
    <nav>
      <a v-if="$route.name == 'convert'" @click="toggleHistory">History</a>

      <router-link to="/" active-class="active">Convert</router-link>
      <router-link to="/picker" active-class="active">Picker</router-link>
    </nav>

    <img :src="`/icon-${contrast}.svg`" :alt="`icon-${contrast}`" />
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["contrast"]),
  },
  methods: {
    toggleHistory () {
      this.$store.commit("toggleHistoryPage");
    }
  }
};
</script>

<style lang="scss"></style>
