<template>
  <div class="d-flex align-center justify-center">
    <v-text-field
      class="flex flex-grow-0"
      v-model="cityName"
      v-on:keyup.enter="get"
      prepend-icon="mdi-city-variant-outline"
      label="Введите город..."
      :rules="rules"
    >
    </v-text-field>
    <app-search-button
      @clickGetForecast="get"
      :is-weather-loading="isWeatherLoading"
      :disabled="!!cityName.length"
    ></app-search-button>
  </div>
</template>

<script>
import AppSearchButton from "./AppSearchButton";

export default {
  name: "AppSearchField",
  components: {
    AppSearchButton,
  },
  props: {
    isWeatherLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      cityName: "",
      rules: [(val) => (val || "").length > 0 || "Заполните поле"], // валидация поля
    };
  },
  methods: {
    get() {
      this.$emit("get-forecast", this.cityName);
    },
  },
};
</script>

<style scoped></style>
