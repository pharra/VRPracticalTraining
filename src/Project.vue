<template>
  <div>
    <Navibar :showClass="showClass"></Navibar>
    <ContainerCanvas :height='this.height' :navHeight="navHeight" :width="canvasWidth" v-on:emitShowToolBar="showToolBar = $event"></ContainerCanvas>
    <Toolbar :height='this.height' :navHeight="navHeight" :width="toolBarWidth"></Toolbar>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Container } from './component/Container';
import ContainerCanvas from './component/ContainerCanvas.vue';
import Toolbar from './component/Toolbar.vue';
import Navibar from './home/Navibar.vue';
import DebugLog from '@/lib/DebugLog';

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
  private showToolBar: boolean = false;
  private canvasWidth: string = '100%';
  private toolBarWidth: string = '0%';
  private showClass: boolean = true;

  private mounted() {
    this.height = document.body.clientHeight;
    window.addEventListener('resize', (event) => {
      this.height = document.body.clientHeight;
    });
  }

  @Watch('showToolBar')
  private watchCount(newVal: any, oldVal: any) {
    if (newVal === true) {
      this.canvasWidth = '70%';
      this.toolBarWidth = '30%';
    } else {
      this.canvasWidth = '100%';
      this.toolBarWidth = '0%';
    }
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
