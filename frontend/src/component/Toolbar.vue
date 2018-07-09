<template>
  <div id="toolbar">
      <p v-text="message"></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class Toolbar extends Vue {
 el:string = '#toolbar'
 name:string = 'Toolbar'

 data() {
   return {
     message: 'hello'
   }
 }
}
</script>

<style>
</style>
