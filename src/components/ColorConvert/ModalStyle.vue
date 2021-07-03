<template>
	<div class="modal-style">
		<div class="modal-style--header">
      <div class="modal-style--header-title label">
        <span class="heading">Style</span> color:
      </div>

      <div class="model-style--header-action">
        <div class="action-switch">
          <div class="action-switch--item" :class="{ active: isCSS }" @click="toggleActiveClass">CSS</div>
          <div class="action-switch--item" :class="{ active: isSCSS }" @click="toggleActiveClass">SCSS</div>
        </div>

        <div class="icon" :class="`icon-close--${contrast}`" @click="$emit('closed')"></div>
      </div>
    </div>
    <div class="modal-style--content">
      <pre>{{ code }}</pre>
    </div> 
	</div>
</template>

<script>
import { mapState } from "vuex";

import { generateCssColor } from "../../services/colors";

export default {
  name: 'ModalStyle',
  props: {
    status: Boolean,
    colors: Array,
    gradients: Array
  },
  data () {
    return {
      isCSS: true,
      isSCSS: false
    }
  },
  computed: {
    ...mapState(["contrast"]),
    code () {
      return this.generateStyleCode();
    }
  },
  mounted () {
    this.generateStyleCode()
  },
  methods: {
    generateStyleCode () {
      const color = this.colors.find(color => (color.id == "rgb"));
      const style = generateCssColor({
        type: "rgb",
        value: color.value
      });

      if (this.isCSS) {
        let css = style.cssVariable.map((item, index) => {
          if (style.cssVariable.length-1 != index) return `  ${item}\n`;

          return `  ${item}`;
        }).join("");

        return `:host {\n${css}\n}`;
      } else {
        let css = style.cssVariable.map((item, index) => {
          if (style.cssVariable.length-1 != index) return `  ${item.replace("--", "$")}\n`;

          return `  ${item.replace("--", "$")}`;
        }).join("");

        return `body {\n${css}\n}`;
      }
    },
    toggleActiveClass () {
      this.isCSS = !this.isCSS;
      this.isSCSS = !this.isSCSS;
    }
  }
}
</script>

<style lang="scss">
#modal.active .modal-style {
  transform: scale(1);
}
.modal-style {
  background-color: var(--dark-transparent-color);
  padding: 16px;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);

  border-radius: 0.5em;

  transition: transform .2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0);

  .modal-style--header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .model-style--header-action {
      display: flex;
      align-items: center;

      .action-switch {
        margin-right: 16px;
        display: flex;

        > .action-switch--item {
          padding: 4px 8px;
          border: 1px solid var(--secondary-color);
          cursor: pointer;

          &:first-child {
            border-radius: 4px 0 0 4px;
          }
          &:last-child {
            border-radius: 0 4px 4px 0;
          }
          &.active {
            background-color: var(--secondary-color);
            color: var(--text-color);
          }
        }
      }

      .icon {
        width: 18px !important;
        height: 18px !important;

        cursor: pointer;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .modal-style {
    width: 90%;

    .modal-style--content pre {
      font-size: 14px;
      overflow-x: auto;
    }
  }
}
</style>