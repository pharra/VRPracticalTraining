<template>
  <div id='toolbar' :style="{width: width, height: height - navHeight + 'px'}" v-if="ObjSample !== null" style="overflow:auto;padding:15px;">
    <b-form @submit="onSubmit" @reset="onReset">
      <!-- <b-form-group v-for="(value, key) in ObjSample.textField" :key="key" :label="key">
        <b-form-input type="text" v-model="ObjSample.textField[key]" required placeholder="Enter answer">
        </b-form-input>
      </b-form-group> -->
      <b-container fluid>
        <b-row class="my-1" v-for="(value, key) in ObjSample.textField" :key="key">
          <b-col sm="3">
            <label>{{ key }}</label>
          </b-col>
          <b-col sm="9">
            <b-form-input type="text" v-model="ObjSample.textField[key]" required placeholder="Enter answer"></b-form-input>
          </b-col>
        </b-row>
      </b-container>

      <b-form-group v-for="(value, key) in ObjSample.optionField" :key="key" :label="key+' :'">
        <b-form-select :options="value" required v-model="option[key]">
        </b-form-select>
      </b-form-group>
      <b-form-group v-for="(value, key) in ObjSample.checkBoxField" :key="key" :label="key + ' :'">
        <b-form-checkbox-group :name="key" v-model="selected[key]">
          <b-form-checkbox v-for="(subvalue, subkey) in value" :key="subkey" :value="subvalue">{{ subvalue }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GetData from './GetData';
import DebugLog from '@/lib/DebugLog';
import { Share, getUrlParam } from './Share';
import Base64 from 'js-base64';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

@Component
export default class Toolbar extends Vue {
  private el: string = '#toolbar';
  private name: string = 'Toolbar';
  private ObjSample: any = null;
  private show: boolean = true;
  private selected: { [index: string]: string[] } = {};
  private option: { [index: string]: any[] } = {};

  @Prop() private height: number;
  @Prop() private navHeight: number;
  @Prop() private width: string;

  @Watch('width')
  private watchWidth(newval: any, oldval: any) {
    if (newval !== '0%' && Share.choseObjectName) {
      this.ObjSample = GetData.getObjInfo(getUrlParam('url') + 'ObjInfo.json')[
        Share.choseObjectName
      ];
      for (const key in this.ObjSample.checkBoxField) {
        if (key) {
          this.selected[key] = [];
        }
      }

      for (const key in this.ObjSample.optionField) {
        if (key) {
          this.option[key] = [];
          this.option[key].push({ text: '请选择', value: null });
          for (const value of this.ObjSample.optionField[key]) {
            this.option[key].push(value);
          }
        }
      }
    }
  }

  private onReset() {}

  private onSubmit() {}

  private encode(str: string) {
    return Base64.Base64.encode(str);
  }
}
</script>


<style scoped>
#toolbar {
  float: right;
}
</style>
