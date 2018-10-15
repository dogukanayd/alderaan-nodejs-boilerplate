/*eslint-disable*/
let Vue = require('vue/dist/vue.js');

Vue.component('loginForm', require('./components/user/Login.vue'));

const app = new Vue({
  el: '#app',
});