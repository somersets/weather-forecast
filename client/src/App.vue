<template>
  <v-app>
    <v-app-bar app color="blue accent-4">
      <h1 class="white--text">
        <v-icon large color="white">mdi-weather-cloudy</v-icon>
        Прогноз погоды на 7 дней
      </h1>
    </v-app-bar>
    <v-container>
      <v-main>
        <search-forecast
          :is-weather-loading="isWeatherDataLoading"
          @get-forecast="getForecast"
        ></search-forecast>
        <weather-dashboard :data-forecasts="sevenDaysForecast" :city-name="cityName" ></weather-dashboard>
        <!--        <app-weather-data-table
          v-if="isShowTable"
          :forecasts-data="sevenDaysForecast"
          :is-weather-loading="isWeatherDataLoading"
          :city="cityName"
          :background="backgroundCity"
        ></app-weather-data-table>-->
        <app-error v-if="isNotExistCity"></app-error>
      </v-main>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import apiClient from "./services/api";
import AppWeatherDataTable from "./components/AppWeatherDataTable.vue";
import WeatherDashboard from "./components/dashboard/WeatherDashboard.vue";
import AppError from "./components/base/AppError.vue";
import SearchForecast from "@/components/searchForecast/SearchForecast.vue";
@Component({
  components: {
    SearchForecast,
    AppError,
    AppWeatherDataTable,
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap");
* {
  font-family: "Montserrat", sans-serif;
  color: #000;
}

html, body {
}
</style>
