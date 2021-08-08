<template>
  <div class="section convert-wrapper">
    <div class="label"><span class="heading" v-t="'convert.label_title'"></span> {{ t("convert.label_small") }}:</div>
    <div class="content">
      <div class="button-convert--items">
        <div
          v-for="type in types"
          :key="type.id"
          class="button"
          @click="$emit('typeChanged', type.id)"
        >
          {{ t("convert.btn_to") }} {{ type.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useI18n} from "vue-i18n";

export default {
  name: "ButtonConvert",
  props: {
    types: Array,
  },
  setup () {
    const { t } = useI18n();
    return { t };
  }
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