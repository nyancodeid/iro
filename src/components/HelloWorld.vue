<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="onIncrement">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    msg: String,
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    ...mapActions({
      onIncrement: "increment",
    }),
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
