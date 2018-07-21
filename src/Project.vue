<template>
<div>
  <Navibar></Navibar>
  <ContainerCanvas :height='this.height'></ContainerCanvas>
  <Toolbar :height='this.height'></Toolbar>
</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Container } from './component/Container';
import ContainerCanvas from './component/ContainerCanvas.vue';
import Toolbar from './component/Toolbar.vue';
import Navibar from './component/Navibar.vue';
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
    Navibar,
  },
})
export default class Project extends Vue {
  private name = 'Project';
  private height: number = 0;

  private mounted() {
    this.height = document.body.clientHeight;
    window.addEventListener('resize', (event) => {
      this.height = document.body.clientHeight;
    });
  }
}
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
