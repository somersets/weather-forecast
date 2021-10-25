<template>
  <app-layout>
    <router-view></router-view>
  </app-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppLayout from "./layouts/AppLayout.vue";

@Component({
  name: "App",
  components: {
    AppLayout,
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap");
* {
  font-family: "Montserrat", sans-serif;
  color: #000;
}

html,
body {
}
</style>
