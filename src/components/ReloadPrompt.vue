<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="pwa-toast--offline" v-if="offlineReady">
      <i class="icon icon-offline"></i>
      <span v-t="'pwa.offline_ready'"></span>
    </div>

    <div class="pwa-toast--update" v-if="needRefresh">
      <i class="icon icon-loading"></i>
      <span v-t="'pwa.update_ready'"></span>
    </div>
  </div>
</template>

<script>
import {watch} from 'vue';
import {useI18n} from "vue-i18n";

import { useRegisterSW } from "virtual:pwa-register/vue";

export default {
  name: "ReloadPrompt",
  setup() {
    const { t } = useI18n();
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

    const watcherStop = watch([ offlineReady, needRefresh ], (now, prev) => {
      const [ offlineNow, refreshNow ] = now;
      const [ offlinePrev, refreshPrev ] = prev;
      if (offlineNow === true && offlinePrev === false) {
        setTimeout(() => {
          offlineReady.value = false;
          watcherStop();
        }, 3000);
      } else if (refreshNow === true && refreshPrev === false) {
        setTimeout(() => {
          needRefresh.value = false;
          updateServiceWorker();
          watcherStop();
        }, 3000);
      }
    });

    return {
      t,
      offlineReady,
      needRefresh
    }
  }
};
</script>

<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 64px;
  bottom: 142px;
  border-radius: 4px;
  z-index: 1;

  .pwa-toast--offline,
  .pwa-toast--update {
    box-shadow: var(--box-shadow);
    background-color: var(--darken-color);
    color: white;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    padding: 0.8rem;
    margin-bottom: 0.8rem;

    font-size: 0.8rem;
    i.icon {
      display: inline-flex;
      margin-right: 0.4rem;
    }
  }
}

@media only screen and (max-width: 768px) {
  .pwa-toast {
    bottom: unset;
    top: 2rem;
    right: 0;

    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>