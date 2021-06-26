<template>
  <div class="video-wrapper--result">
    <div
      class="video-wrapper--result-item"
      v-for="(item, index) in pickers"
      :key="index"
    >
      <div
        class="result-item--color"
        :style="`background-color: ${item.colorStyle}`"
        @click="openColor(item)"
      ></div>
      <div class="result-item--text">{{ item.colorText }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'ColorResult',
  props: {
  	colors: Array
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([ "pickers" ])
  },
  methods: {
    openColor (item) {
      this.$router.push(`/hex/${item.value}`)
    }
  }
}
</script>

<style lang="scss">
.video-wrapper--result {
  border-radius: 0.5em;
  background: var(--secondary-color);

  width: 56%;
  padding: 12px;

  display: flex;
  flex-wrap: wrap;

  .video-wrapper--result-item {
    margin-bottom: 12px;
    margin-right: 12px;

    .result-item--color {
      width: 100%;
      height: 54px;

      border-radius: 0.3em;
    }
    .result-item--text {
      color: var(--text-color);
      font-size: 12.5px;

      font-weight: bold;
      margin-top: 8px;
    }
  }  

}

@media only screen and (max-width: 768px) {
  .video-wrapper--result {
    margin-top: 16px;
    justify-content: center;

    .video-wrapper--result-item {
      width: calc((100% / 5) - 8px);
    }
  }
}
</style>