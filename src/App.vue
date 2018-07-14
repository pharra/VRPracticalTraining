<template>
<div style='width:100%;height:100%;'>
  <ContainerCanvas></ContainerCanvas>
  <Toolbar></Toolbar>
</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Container } from './component/Container';
import ContainerCanvas from './component/ContainerCanvas.vue';
import Toolbar from './component/Toolbar.vue';
window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'.
  const container = new Container(
    'renderCanvas',
    'static/objectModel/project1/',
  );
});

@Component({
  components: {
    ContainerCanvas,
    Toolbar,
  },
})
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
