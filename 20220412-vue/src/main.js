import vueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(vueCompositionApi);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
