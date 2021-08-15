<template>
  <slot v-if="shouldRender" />
</template>

<script>
import { ref, nextTick } from 'vue';
export default {
  name: "Lazy",
  setup() {
    const shouldRender = ref(false);

    nextTick(() => {
      shouldRender.value = true;
    });

    return { shouldRender };
  }
}
</script>