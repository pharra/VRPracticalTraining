<template>
  <div id='toolbar'>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';

  private data() {
    return {};
  }
}
</script>


<style>
#toolbar {
  width: 20%;
	height: 94%;
  float: right;
}
</style>
