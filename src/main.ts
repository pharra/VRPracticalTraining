import Vue from 'vue';
import Project from './Project.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Project),
}).$mount('#app');
