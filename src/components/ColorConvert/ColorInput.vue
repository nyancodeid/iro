<template>
	<div class="section input-wrapper">
		<div class="label">
			<span class="heading">{{ type.title }}:</span>
			<div class="label-action">
				<div
					class="icon"
					:class="`icon-style--${color}`"
					@click="$emit('toggleStyle')"
					title="Open css style"
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
			<template v-if="property.inputType == 'number'">
				<input
					v-for="n in property.inputLength"
					type="number"
					name="values[]"
					v-model.number="values[n - 1]"
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
					v-model="values[n - 1]"
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
  data() {
    return {
      isError: false,
      values: [],
    };
  },
  mounted() {
    this.onInitialized();
  },
  computed: {
    property() {
      return getColorProperties(this.type.id);
    },
  },
  methods: {
    onInitialized() {
      if (this.type.id == "hex") {
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
    onInputChanged($event) {
      let color = [...this.values];
      let isColorValid = colorValidate(this.type.id, color);

      if (this.type.id == "hex") {
        color = color[0];
      }

      if (isColorValid) {
        this.isError = false;
        this.$emit("colorChanged", [this.type.id, color]);
      } else {
        this.isError = true;
      }
    },
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
		width: 100%;

		&.error input {
			border-inline: 3px solid #d32f2f;
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
				0 2px 1px -1px rgba(0, 0, 0, 0.12),
				0 1px 3px 0 rgba(0, 0, 0, 0.2);
			font-size: 1.5rem;
			font-weight: bold;

			color: #212121;
			border-inline: 3px solid transparent;
			transition: border-inline 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		&.hex {
			> input {
				width: calc(100% - 32px);
				padding-left: 1em;
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

		&.rgb input,
		&.hsl input {
			width: calc((100% / 3) - 12px);
			margin-right: 8px;

			&:last-child {
				margin-right: 0;
			}
		}

		&.cmyk input {
			width: calc(25% - 12px);
			margin-right: 8px;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
