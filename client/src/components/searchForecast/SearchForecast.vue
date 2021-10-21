<template>
  <div class="d-flex align-center justify-center">
    <v-text-field
      class="flex flex-grow-0"
      v-model="cityName"
      @keyup.enter="get"
      prepend-icon="mdi-city-variant-outline"
      label="Введите город..."
      :rules="rules"
    >
    </v-text-field>
    <search-forecast-button
      @clickGetForecast="get"
      :is-weather-loading="isWeatherLoading"
      :disabled="!!cityName.length"
    ></search-forecast-button>
  </div>
</template>

<script lang="ts">
import SearchForecastButton from "./SearchForecastButton.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {
    SearchForecastButton,
  },
})
export default class SearchForecast extends Vue {
  @Prop({ required: true }) readonly isWeatherLoading!: boolean;
  cityName: string = "";
  rules: Array<any> = [
    (val: string) => (val || "").length > 0 || "Заполните поле",
  ];

  get() {
    this.$emit("get-forecast", this.cityName);
  }
}
</script>

<style scoped lang="scss">
.v-text-field {
  flex-basis: 40%;
}
</style>
