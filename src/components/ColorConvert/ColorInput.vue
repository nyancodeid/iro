<template>
  <div class="section input-wrapper">
    <div class="label">
      <span class="heading">{{ type.title }}:</span>
      <div class="label-action">
        <div
          class="icon"
          :class="`icon-palette--${color}`"
          @click="$emit('toggleModal', 'palette')"
          title="Palette Color"
        ></div>
        <div
          class="icon"
          :class="`icon-style--${color}`"
          @click="$emit('toggleModal', 'style')"
          title="CSS/SCSS Style"
        ></div>
        <div
          class="icon"
          :class="`icon-copy--${color}`"
          @click="onCopyClick"
          title="Copy color to clipboard"
        ></div>
      </div>
    </div>
    <div
      class="content color-input"
      :class="{ error: isError, [type.id]: true }"
      :style="`color: ${hex}`"
    >
      <template v-if="property.inputType === 'number'">
        <label
          class="color-input--wrapper"
          v-for="n in property.inputLength"
          :key="`input-${n}`"
        >
          <input
            type="number"
            name="values[]"
            v-model.number="values[n - 1]"
            :maxlength="property.inputMaxLength(n - 1)"
            :id="`${type.id}-input-${n}`"
            @input="onInputChanged"
            @paste.prevent="onColorPaste"
          />
        </label>
      </template>
      <template v-else>
        <label
          class="color-input--wrapper"
          v-for="n in property.inputLength"
          :key="`input-${n}`"
        >
          <input
            type="text"
            name="values[]"
            v-model="values[n - 1]"
            :maxlength="property.inputMaxLength()"
            :id="`${type.id}-input-${n}`"
            @input="onInputChanged"
          />
        </label>
      </template>
    </div>
  </div>
</template>

<script>
import {copyToClipboard, normalize} from "@src/services/utils";
import { colorValidate, getColorProperties } from "@src/services/colors";

export default {
  name: "ColorInput",
  inject: ["notyf"],
  props: {
    type: Object,
    hex: String,
    color: String,
  },
  data() {
    return {
      timeoutId: null,
      values: [],
    };
  },
  mounted() {
    this.onInitialized();
  },
  computed: {
    isError() {
      let color = [...this.values];
      let isColorValid = colorValidate(this.type.id, color);

      return !isColorValid;
    },
    property() {
      return getColorProperties(this.type.id);
    },
  },
  methods: {
    onInitialized() {
      if (this.type.id === "hex") {
        this.values = [this.type.value];
      } else {
        this.values = [...this.type.value];
      }
    },
    onCopyClick() {
      const color = this.property.toString(this.values);

      copyToClipboard(color);

      this.notyf.success("Color copied to clipboard!");
    },
    onInputChanged() {
      let color = [...this.values];

      if (this.type.id === "hex") {
        color = color[0];
      }

      if (!this.isError) {
        this.$emit("colorChanged", [this.type.id, color]);
      }
    },
    onColorPaste($event) {
      let data = $event.clipboardData.getData('text')

      if (data.indexOf(",") > 0) {
        let colors = data.split(",")
            .slice(0, this.property.inputLength);

        colors = normalize(colors);

        if (colorValidate(this.type.id, colors)) {
          this.$nextTick(() => {
            this.$emit("colorChanged", [this.type.id, colors]);
          });
        } else {
          this.notyf.error("Invalid color format on clipboard");
        }
      }
    }
  },
  watch: {
    hex() {
      this.onInitialized();
    },
    type() {
      this.onInitialized();
    },
  },
};
</script>

<style lang="scss">
.input-wrapper {
  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    > .heading {
      display: inline-block;
      width: calc(100% - 24px);
    }

    .label-action {
      display: flex;

      .icon {
        cursor: pointer;
        background-size: contain;
        width: 20px !important;
        height: 20px !important;

        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    .hidden-label {
      display: none;
    }
  }

  .color-input {
    position: relative;
    display: flex;

    &.error input {
      color: #d32f2f;
    }

    input {
      font-family: "IBM Plex Mono", monospace;
      letter-spacing: 0.4em;

      -webkit-appearance: none;
      border: 0;
      outline: none;
      background: #ffffff;
      padding: 20px 0;
      border-radius: 3px;
      text-align: center;

      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      font-size: 1.5rem;
      font-weight: bold;

      color: #212121;
      border-inline: 3px solid transparent;
      transition: border-inline 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &.hex {
      > .color-input--wrapper {
        width: calc(100% - 6px);

        > input {
          width: 100%;
        }
      }

      &:before {
        content: "#";
        position: absolute;
        color: #9e9e9e;
        top: 20px;
        left: 20px;
        font-family: monospace;
        font-size: 2em;
      }
    }

    &.rgb .color-input--wrapper,
    &.hsl .color-input--wrapper {
      width: calc((100% / 3));
      margin-right: 8px;

      > input {
        width: calc(100% - 6px);
      }

      &:last-child {
        margin-right: 0;
      }
    }

    &.hsl .color-input--wrapper {
      position: relative;

      &:not(:first-child)::after {
        content: "%";
        position: absolute;
        top: 4px;
        right: 4px;
        color: #222222;
      }
    }

    &.cmyk .color-input--wrapper {
      width: calc((100% / 4));
      margin-right: 8px;
      position: relative;

      > input {
        width: calc(100% - 6px);
      }

      &::after {
        content: "%";
        position: absolute;
        top: 4px;
        right: 4px;
        color: #222222;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

</style>
