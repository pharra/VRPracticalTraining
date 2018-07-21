<template>
  <div>
    <Navibar :showClass="true"></Navibar>
    <ContainerCanvas :height='this.height' :navHeight="navHeight"></ContainerCanvas>
    <Toolbar :height='this.height' :navHeight="navHeight"></Toolbar>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Container } from './component/Container';
import ContainerCanvas from './component/ContainerCanvas.vue';
import Toolbar from './component/Toolbar.vue';
import Navibar from './home/Navibar.vue';

const getUrlParam = (name: string): string => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
};

window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'.
  const container = new Container('renderCanvas', getUrlParam('url'));
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
  private navHeight: number = 86.2;

  private mounted() {
    this.height = document.body.clientHeight;
    window.addEventListener('resize', (event) => {
      this.height = document.body.clientHeight;
    });
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
