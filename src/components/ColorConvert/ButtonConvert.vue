<template>
  <div class="section convert-wrapper">
    <div class="label"><span class="heading">Convert</span> to:</div>
    <div class="content">
      <ul class="convert-wrapper">
        <li v-for="type in types" :key="type.id" class="button" @click="$emit('changed', type.id)">to {{type.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonConvert",
  props: {
    types: Array
  }
}
</script>