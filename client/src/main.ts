require("dotenv").config();
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n/i18n";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
