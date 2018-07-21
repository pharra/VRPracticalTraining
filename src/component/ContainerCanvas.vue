<template>
<div  :style="{width:'80%', height: height - navHeight + 'px'}" class="canvas">
  <canvas id="renderCanvas"></canvas>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Container } from './Container';

@Component
export default class ContainerCanvas extends Vue {
  private el: string = '#renderCanvas';
  private name: string = 'ContainerCanvas';

  @Prop() private height: number;
  @Prop() private navHeight: number;

  // private created() {
  //   sessionStorage.setItem("name", res.data.name);
  // }
}
</script>

<style scoped>
#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

.canvas{
  float: left;
}
</style>
