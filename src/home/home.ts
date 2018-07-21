import Vue from 'vue';
import Home from './Home.vue';
import Navibar from './Navibar.vue';

new Vue({
  render: (h) => h(Home),
}).$mount('#container');

new Vue({
  render: (h) => h(Navibar),
}).$mount('#header');
