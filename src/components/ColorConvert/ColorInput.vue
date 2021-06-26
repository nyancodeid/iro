<template>
  <div class="section input-wrapper">
    <div class="label">
      <span class="heading">{{ type.title }}:</span>
      <div class="icon" :class="`icon-copy--${color}`" @click="onCopyClick" title="Copy color to clipboard"></div>
    </div>
    <div class="content color-input" :class="type.id" :style="`color: ${hex}`">
      <template v-if="property.inputType == 'number'">
        <input
          v-for="n in property.inputLength"
          type="number"
          name="values[]"
          v-model.number="values[n-1]"
          :maxlength="property.inputMaxLength"
          :key="`input-${n}`"
          :id="`${type.id}-input-${n}`"
          @input="onInputChanged"
        />
      </template>
      <template v-else>
        <input
          v-for="n in property.inputLength"
          type="text"
          name="values[]"
          v-model="values[n-1]"
          :maxlength="property.inputMaxLength"
          :key="`input-${n}`"
          :id="`${type.id}-input-${n}`"
          @input="onInputChanged"
        />
      </template>
      
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "../../services/utils";
import { colorValidate, getColorProperties } from "../../services/colors";

export default {
  name: "ColorInput",
  inject: ["notyf"],
  props: {
    type: Object,
    hex: String,
    color: String,
  },
  data () {
    return {
      values: []
    }
  },
  mounted () {
    this.onInitialized();
  },
  computed: {
    property () {
      return getColorProperties(this.type.id);
    }
  },
  methods: {
    onInitialized () {
      if (this.type.id == "hex") {
        this.values = [ this.type.value ];
      } else {
        this.values = [ ...this.type.value ];
      }
    },
    onCopyClick() {
      const color = this.property.toString(this.values);

      copyToClipboard(color);

      this.notyf.success("Color copied to clipboard!");
    },
    onInputChanged($event) {
      let color = [ ...this.values ];
      let isColorValid = colorValidate(this.type.id, color);

      if (this.type.id == "hex") {
        color = color[0];
      }

      this.$emit("changed", [ this.type.id, color ])
    },
  },
  watch: {
    hex () {
      this.onInitialized();
    },
    type () {
      this.onInitialized();
    }
  }
};
</script>

<style lang="scss">
.input-wrapper {
  .icon {
    cursor: pointer;
  }

  > .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
