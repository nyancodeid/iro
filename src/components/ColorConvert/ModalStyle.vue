<template>
	<div class="modal-style">
		<div class="modal-style--header">
      <div class="label">
        <span class="heading">Style</span> color:
      </div>

      <div class="icon" :class="`icon-close--${contrast}`" @click="$emit('closed')"></div>
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
        id: "rgb",
        value: color.value
      });

      let css = style.cssVariable.map((item, index) => {
        if (style.cssVariable.length-1 != index) return `  ${item}\n`;

        return `  ${item}`;
      }).join("");

      return `:host {\n${css}\n}`;
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

    .icon {
      width: 18px !important;
      height: 18px !important;

      cursor: pointer;
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