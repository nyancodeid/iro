<template>
  <div id="content" class="color-picker--page">
    <VideoPicker />
    <Lazy>
      <ColorResult />
    </Lazy>
  </div>
</template>

<script>
import Lazy from "@src/components/Lazy.vue";
import ColorResult from "@src/components/ColorPicker/ColorResult.vue";
import VideoPicker from "@src/components/ColorPicker/VideoPicker.vue";

export default {
  name: "ColorPicker",
  components: { VideoPicker, ColorResult, Lazy },
};
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

    .video-wrapper--control {
      width: calc(100% - 16px);
    }
  }
  .video-wrapper--result {
    width: calc(100% - 25px);
  }
}
</style>
