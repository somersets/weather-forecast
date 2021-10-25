<template>
  <Dashboard />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Dashboard from "@/components/dashboard/index.vue";
@Component({
  name: "AppDashboard",
  components: {
    Dashboard,
  },
})
export default class AppDashboard extends Vue {}
</script>

<style lang="scss"></style>
