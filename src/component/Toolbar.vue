<template>
  <div id='toolbar' :style="{width: width, height: height - navHeight + 'px'}">
    <h1>
      <span class="label label-default">{{ObjSample.info1}}</span>
    </h1><br>
    <hr>
    <h3>{{ObjSample.info2}}</h3><br>
    <h3>{{ObjSample.info3}}</h3><br>
    <h3>{{ObjSample.info4}}</h3><br>
    <button v-on:click="show = !show"> click</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GetData from './GetData';
import DebugLog from '@/lib/DebugLog';
import { Share, getUrlParam } from './Share';

@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';
  private ObjSample: any = null;
  private show: boolean = true;

  @Prop() private height: number;
  @Prop() private navHeight: number;
  @Prop() private width: string;

  @Watch('width')
  private watchWidth(newval: any, oldval: any) {
    if (newval === '20%' && Share.choseObjectName) {
      this.ObjSample = GetData.getObjInfo(getUrlParam('url'))[
        Share.choseObjectName
      ];
    }
  }
}
</script>


<style scoped>
#toolbar {
  float: right;
}
</style>
