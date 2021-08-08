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

<script>
export default {
  name: "AppSearchButton",
  props: {
    isWeatherLoading: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style scoped></style>
