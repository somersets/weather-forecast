<template>
  <v-container>
    <v-main>
      <search-forecast
        :is-weather-loading="isWeatherDataLoading"
        @get-forecast="getForecast"
      ></search-forecast>
      <weather-dashboard
        v-if="!isNotExistCity"
        :data-forecasts="sevenDaysForecast"
        :city-name="cityName"
      ></weather-dashboard>
      <app-error v-if="isNotExistCity"></app-error>
    </v-main>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import apiClient from "../../services/api";
import WeatherDashboard from "./weatherDashboard/WeatherDashboard.vue";
import AppError from "@/components/base/AppError.vue";
import SearchForecast from "@/components/searchForecast/SearchForecast.vue";
@Component({
  components: {
    SearchForecast,
    AppError,
    WeatherDashboard,
  },
})
export default class App extends Vue {
  cityName: string = "";
  sevenDaysForecast: Array<object> = []; // данные прогноза
  isNotExistCity: boolean = false; // флаг ошибки
  isWeatherDataLoading: boolean = false; // флаг загрузки
  isShowTable: boolean = true; // флаг показа таблицы при первом запуске
  backgroundCity: string = "";

  getForecast(cityName: string): void {
    if (!cityName.length) return;

    this.isShowTable = true;
    this.isWeatherDataLoading = true;
    this.isNotExistCity = false;

    this.clearDataBeforeRequest();

    apiClient
      .getWeatherCurrent(cityName)
      .then((response) => {
        console.log(response.data);
        this.cityName = response.data.name;
        return response;
      })
      .then((response) => {
        apiClient
          .oneCallForecast(response.data.coord.lat, response.data.coord.lon)
          .then((response) => {
            this.isWeatherDataLoading = false;
            this.sevenDaysForecast = response.data.daily;
            console.log(response.data);
            console.log(this.sevenDaysForecast);
          });
      })
      .catch(() => {
        this.isNotExistCity = true;
        this.isShowTable = false;
        this.isWeatherDataLoading = false;
      });
  }

  clearDataBeforeRequest() {
    this.cityName = "";
    this.sevenDaysForecast = [];
  }
}
</script>

<style lang="scss" scoped></style>
