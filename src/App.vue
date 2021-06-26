<template>
  <Header />
  
  <router-view />

  <ReloadPrompt />
</template>

<script setup>
import { Notyf } from 'notyf';
import { provide } from 'vue';

import Header from "./components/Header.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";

provide('notyf', new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'bottom'
  }
}))
</script>

<style></style>
