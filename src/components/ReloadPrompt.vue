<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady" v-t="'pwa.offline_ready'"></span>
      <span v-else v-t="'pwa.update_ready'"></span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()" v-t="'pwa.btn_update'"></button>
    <button @click="close" v-t="'pwa.btn_close'"></button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

const { t } = useI18n();
</script>

<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%),
      0 1px 3px 0 rgb(0 0 0 / 20%);
  background-color: var(--dark-color);
  color: var(--secondary-color);

  .message {
    margin-bottom: 8px;
  }
  button {
    margin-right: 5px;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%),
      0 1px 3px 0 rgb(0 0 0 / 20%);
    background: var(--secondary-color);
    color: var(--text-color);
    border-radius: 2px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 11px 16px;
    display: inline-block;
    width: 120px;
  }
}
</style>
