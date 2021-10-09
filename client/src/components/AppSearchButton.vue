<template>
  <v-btn
    :disabled="!disabled"
    class="ml-10"
    @click="$emit('clickGetForecast')"
    :loading="isWeatherLoading"
    >Найти
    <v-icon right size="25px"> mdi-cloud-search-outline </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true }) readonly isWeatherLoading!: boolean;
  @Prop({ required: true }) readonly disabled!: boolean;
}
</script>

<style scoped></style>
