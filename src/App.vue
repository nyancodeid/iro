<template>
  <AppHeader />
  
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name"/>
    </keep-alive>
  </router-view>

  <ReloadPrompt />
</template>

<script setup>
import { Notyf } from 'notyf';
import { provide } from 'vue';

import AppHeader from "./components/AppHeader.vue";
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
