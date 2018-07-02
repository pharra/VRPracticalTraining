<template>
  <canvas id="renderCanvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Game} from './Game';

  window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');
  
    // Create the scene.
    game.createScene();
  
    // Start render loop.
    game.doRender();
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
