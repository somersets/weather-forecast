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
        <app-search
          :is-weather-loading="isWeatherDataLoading"
          @get-forecast="getForecast"
        ></app-search>
        <app-weather-data-table
          v-if="isShowTable"
          :forecasts-data="sevenDaysForecast"
          :is-weather-loading="isWeatherDataLoading"
          :city="cityName"
          :background="backgroundCity"
        ></app-weather-data-table>
        <app-error v-if="isNotExistCity"></app-error>
      </v-main>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppSearch from "./components/AppSearch.vue";
import apiClient from "./services/api";
import AppWeatherDataTable from "./components/AppWeatherDataTable.vue";
import AppError from "./components/AppError.vue";
@Component({
  components: {
    AppSearch,
    AppError,
    AppWeatherDataTable,
  },
})
export default class App extends Vue {
  cityName: string = "";
  sevenDaysForecast: Array<object> = []; // данные прогноза
  isNotExistCity: boolean = false; // флаг ошибки
  isWeatherDataLoading: boolean = false; // флаг загрузки
  isShowTable: boolean = false; // флаг показа таблицы при первом запуске
  backgroundCity: string = "";

  getForecast(cityName: string): void {
    if (!cityName.length) {
      return;
    }
    // меняем флаги
    this.isShowTable = true;
    this.isWeatherDataLoading = true;
    this.isNotExistCity = false;
    // чистим данные перед запросом
    this.cityName = "";
    this.sevenDaysForecast = [];
    // первый запрос чтобы получить координаты города,
    // и по нему идёт второй запрос о погоде на 7 дней, т.к api на 10 платное
    apiClient
      .getWeatherCurrent(cityName)
      .then((response) => {
        this.cityName = response.data.name;
        return response;
      })
      .then((response) => {
        apiClient
          .oneCallForecast(response.data.coord.lat, response.data.coord.lon)
          .then((response) => {
            this.isWeatherDataLoading = false;
            console.log(response.data);
            this.sevenDaysForecast = response.data.daily;
          });
      })
      .catch(() => {
        this.isNotExistCity = true;
        this.isShowTable = false;
        this.isWeatherDataLoading = false;
      });
  }
}
</script>

<style scoped>
/deep/ .v-text-field {
  flex-basis: 40%;
}
</style>
