<template>
  <div class="section convert-wrapper">
    <div class="label"><span class="heading">Convert</span> to:</div>
    <div class="content">
      <div class="button-convert--items">
        <div
          v-for="type in types"
          :key="type.id"
          class="button"
          @click="$emit('typeChanged', type.id)"
        >
          to {{ type.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonConvert",
  props: {
    types: Array,
  },
};
</script>

<style lang="scss">
.convert-wrapper .content {
  margin: .5em 0;

  .button-convert--items {
    display: flex;
    justify-content: space-between;
    
    >.button:last-child {
      margin-right: 0;
    }

    >.button {
      width: calc((100% / 3) - (43px));
    }
  }
}
</style>