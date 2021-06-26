<template>
  <div id="content" class="color-picker--page">
    <video-picker />
    <color-result />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ColorResult from "../components/ColorPicker/ColorResult.vue";
import VideoPicker from "../components/ColorPicker/VideoPicker.vue";

export default {
  name: 'ColorPicker',
  components: { ColorResult, VideoPicker },
}
</script>

<style lang="scss">
#content.color-picker--page {
  align-items: start;
  flex-direction: row !important;

  padding: 2em 0;
}

@media only screen and (max-width: 768px) {
  #content.color-picker--page {
    padding-top: 0;
  }
  .video-wrapper {
    margin: 0;
    width: 100%;
  }

  .video-control {
    width: calc(100% - 16px);
  }
  .video-wrapper--result {
    width: calc(100% - 25px);
  }

}
</style>