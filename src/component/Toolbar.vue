<template>
  <div id="toolbar">
      <div v-text="message"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
 private el: string = '#toolbar';
 private name: string = 'Toolbar';

 private data() {
   return {
     message: 'hello',
   };
 }
}
</script>

<style>
#toolbar 
{
  width: 20%;
  float: right;
}
</style>
