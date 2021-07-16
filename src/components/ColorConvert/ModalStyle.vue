<template>
  <div class="modal modal-style" tabindex="0">
    <div class="modal-header">
      <div class="modal-header--title label">
        <span class="heading">Style</span> color:
      </div>

      <div class="modal-header--action">
        <div class="action-switch">
          <div
            v-for="tab in tabs"
            :key="tab"
            class="action-switch--item"
            :class="{ active: selected === tab }"
            @click="selected = tab"
          >
            {{ tab.toUpperCase() }}
          </div>
        </div>

        <div
          class="icon"
          :class="`icon-close--${contrast}`"
          @click="$emit('closed', 'style')"
        ></div>
      </div>
    </div>
    <div class="modal-content">
      <pre>{{ code }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";

import { useAppStore } from "@src/store";

export default {
  name: "ModalStyle",
  data() {
    return {
      tabs: ["css", "scss"],
      selected: "css",
    };
  },
  computed: {
    ...mapState(useAppStore, ["contrast", "colors"]),
    code() {
      return this.generateStyleCode();
    },
  },
  methods: {
    generateStyleCode() {
      const style = this.colors.variables;

      if (this.selected === "css") {
        let css = style
          .map(([name, value], index) => {
            if (style.length - 1 !== index) return `  ${name}: ${value}\n`;

            return `  ${name}: ${value}`;
          })
          .join("");

        return `:host {\n${css}\n}`;
      } else if (this.selected === "scss") {
        let css = style
          .map(([name, value], index) => {
            if (style.length - 1 !== index)
              return `  ${name.replace("--", "$")}: ${value}\n`;

            return `  ${name.replace("--", "$")}: ${value}`;
          })
          .join("");

        return `body {\n${css}\n}`;
      }
    },
  },
};
</script>

<style lang="scss">
.modal.modal-style {
  background-color: var(--dark-transparent-color);
}
@media only screen and (max-width: 768px) {
  .modal-style .modal-content pre {
    font-size: 14px;
    overflow-x: auto;
  }
}
</style>
