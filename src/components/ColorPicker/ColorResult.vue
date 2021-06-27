<template>
  <div class="video-color--result" :class="`bg-${contrast}-contrast`">
    <div class="video-color--result-label"><span class="heading">Result</span> color:</div>
    <div class="video-color--result-wrapper">
      <div
        class="video-color--result-item"
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
    ...mapState([ "pickers", "contrast" ])
  },
  methods: {
    openColor (item) {
      this.$router.push(`/hex/${item.value}`)
    }
  }
}
</script>

<style lang="scss">
.video-color--result {
  border-radius: 0.5em;

  width: 414px;
  padding: 12px;

  .video-color--result-label {
    color: var(--contrast-color);
    font-size: 0.7rem;

    padding-left: 6px;
    margin-bottom: 8px;

    >.heading {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .video-color--result-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    .video-color--result-item {
      margin-bottom: 12px;
      margin-right: 8px;
      margin-left: 8px;
      width: calc((100% / 6) - 3px);
      cursor: pointer;

      .result-item--color {
        width: 100%;
        height: 54px;

        border-radius: 0.3em;
      }
      .result-item--text {
        color: var(--contrast-color);
        font-size: 12.5px;

        font-weight: bold;
        margin-top: 8px;
      }
    }  
  }
}

@media only screen and (max-width: 768px) {
  .video-color--result {
    margin-top: 16px;
    justify-content: center;
    width: calc(100% - 24px);
  }
}
</style>