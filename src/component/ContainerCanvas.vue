<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Container } from './Container';

@Component
export default class ContainerCanvas extends Vue {
  private el: string = '#renderCanvas';
  private name: string = 'ContainerCanvas';
}
</script>

<style>
#renderCanvas {
          width   : 80%;
          height  : 94%;
          touch-action: none;
      }
</style>
