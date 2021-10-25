<template>
  <v-app>
    <app-header></app-header>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AppHeader from "@/components/base/AppHeader.vue";

@Component({
  name: "AppLayout",
  components: {
    AppHeader,
  },
})
export default class AppLayout extends Vue {}
</script>

<style lang="scss"></style>
