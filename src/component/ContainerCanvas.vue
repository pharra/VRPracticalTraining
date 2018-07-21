<template>
  <div :style="{width: width, height: height - navHeight + 'px'}" class="canvas">
    <canvas id="renderCanvas" @click="emitData"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Container } from './Container';
import Share from '@/component/Share';
import DebugLog from '@/lib/DebugLog';
import { setTimeout } from 'timers';

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

@Component
export default class ContainerCanvas extends Vue {
  private el: string = '#renderCanvas';
  private name: string = 'ContainerCanvas';

  @Prop() private height: number;
  @Prop() private navHeight: number;
  @Prop() private width: string;

  private emitData() {
    DebugLog(Share.choseObjectName);
    if (Share.choseObjectName) {
      this.$emit('emitShowToolBar', true);
    } else {
      this.$emit('emitShowToolBar', false);
    }
  }
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

.canvas {
  float: left;
}
</style>
