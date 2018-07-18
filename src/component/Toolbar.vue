<template>
  <div id='toolbar'>{{info}}
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';



@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';
  private ObjInfoJson: any | null = null;
  private url: string = 'static/objectModel/project1/';
  private info: string = "";

  constructor(){
    super();
    this.preload();
  }

  public preload = () => {
        Axios.get(this.url + 'ObjInfo.json')
            .then((response) => {
                DebugLog("123");
                DebugLog(response.data);
                this.ObjInfoJson = response.data;
                // this.GetObjInfo();
                this.info = this.ObjInfoJson[0].Stone1.type;
            }).catch((error) => {
                DebugLog(error);
            });
    }
    public GetObjInfo = () => {
      // this.ObjInfoJson[0].Stone1.forEach((sample: any) => {
      
      //})
    }
}
</script>


<style>
#toolbar {
  width: 20%;
	height: 94%;
  float: right;
}
</style>
