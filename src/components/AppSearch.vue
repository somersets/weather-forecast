<template>
  <div class="d-flex align-center justify-center">
    <v-text-field
      class="flex flex-grow-0"
      v-model="cityName"
      v-on:keyup.enter="getForecast"
      prepend-icon="mdi-city-variant-outline"
      label="Введите город..."
      :rules="rules"
    >
    </v-text-field>
    <v-btn
      class="ml-10"
      @click="getForecast"
      @keyup.enter="getForecast"
      :loading="isWeatherDataLoading"
    >Найти</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "AppSearchField",
};
</script>

<style scoped></style>
