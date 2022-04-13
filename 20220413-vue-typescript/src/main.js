import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import vueCompositionApi from "@vue/composition-api";

import App from "~/App";
import { router } from "~/router";

Vue.use(vueCompositionApi);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
