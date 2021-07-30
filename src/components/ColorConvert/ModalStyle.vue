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
import { generateCssStyle, generateScssStyle } from "@src/services/utils";

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
        return generateCssStyle(style);
      } else if (this.selected === "scss") {
        return generateScssStyle(style);
      }
    },
  },
};
</script>

<style lang="scss">
.modal.modal-style {
  width: 536px;
  background-color: var(--dark-transparent-color);
}
@media only screen and (max-width: 768px) {
  .modal-style .modal-content pre {
    padding-bottom: 1rem;
    
    font-size: 14px;
    overflow-x: auto;
  }
}
</style>
