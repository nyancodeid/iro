<template>
  <AppHeader />
  
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name"/>
    </keep-alive>
  </router-view>

  <ReloadPrompt />
</template>

<script>
import { Notyf } from 'notyf';
import AppHeader from "@src/components/AppHeader.vue";
import ReloadPrompt from "@src/components/ReloadPrompt.vue";

const NotfyProvider = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'bottom'
  }
})

export default {
  name: "App",
  components: {
    AppHeader,
    ReloadPrompt
  },
  provide: {
    notyf: NotfyProvider
  }
}
</script>
