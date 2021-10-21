<template>
  <v-card width="400px" class="mx-auto">
    <v-card-title>
      <h1>Ошибка</h1>
    </v-card-title>
    <v-card-text> Неккоректный запрос! </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style scoped></style>
