<template>
  <div id='toolbar' :style="{width:'20%', height: this.height - 56 + 'px'}">
    <h1><span class="label label-default">{{ObjSample.info1}}</span></h1><br>
    <hr>
    <h3>{{ObjSample.info2}}</h3><br>
    <h3>{{ObjSample.info3}}</h3><br>
    <h3>{{ObjSample.info4}}</h3><br>
    <button v-on:click="show = !show"> click</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ObjInfo } from './ObjInfo';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';

@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';
  private ObjSample: ObjInfo = new ObjInfo();
  private show: boolean = true;

  @Prop() private height: number;
}
</script>


<style scoped>
#toolbar {
  float: right;
}
.test{
  background-color: blue;
}
</style>
