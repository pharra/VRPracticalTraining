<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Container} from '@/component/Container';

  window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let container = new Container('renderCanvas');
  
    // Create the scene.
    container.createScene();
  
    // Start render loop.
    container.doRender();
  });
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
