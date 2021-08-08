<template>
  <v-app>
    <v-app-bar app color="blue accent-4">
      <h1 class="white--text">
        <v-icon large color="white">mdi-weather-cloudy</v-icon>
        WeatherForecast
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
          :city="cityData"
          :background="backgroundCity"
        ></app-weather-data-table>
        <app-error v-if="isNotExistCity"></app-error>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import AppSearch from "./components/AppSearch";
import apiClient from "./api";
import AppWeatherDataTable from "./components/AppWeatherDataTable";
import AppError from "./components/AppError";
export default {
  name: "App",

  components: {
    AppSearch,
    AppWeatherDataTable,
    AppError,
  },

  data() {
    return {
      cityData: {}, // данные первого запроса
      sevenDaysForecast: [], // данные прогноза
      isNotExistCity: false, // флаг ошибки
      isWeatherDataLoading: false, // флаг загрузки
      isShowTable: false, // флаг показа таблицы при первом запуске
      backgroundCity: "",
    };
  },
  computed: {
    getOptionsDate() {
      // настройки для формата даты
      return {
        weekday: "short",
        month: "short",
        day: "2-digit",
      };
    },
  },
  methods: {
    normalizeTemp(temps) {
      for (let tmp in temps) {
        temps[tmp] = temps[tmp].toFixed(0);
      }
    },
    normalizeMinMaxTemp(min, max) {
      // добавление знака плюс и минус в зависимости от температуры
      // меньше или больше 0 и т.д.
      if (min > 0 && max > 0) {
        return `+${min.toFixed(0)}...+${max.toFixed(0)}`;
      } else if (min < 0 && max > 0) {
        return `-${min.toFixed(0)}...+${max.toFixed(0)}`;
      } else {
        return `-${min.toFixed(0)}...-${max.toFixed(0)}`;
      }
    },
    normalizeProbability(pop) {
      // преобразовывает десятичный коэффициент вероятности исхода в проценты
      return (pop * 100).toFixed(0);
    },
    normalizeDateFormat(timestamp) {
      // перевод из UNIX в читабельный формат
      return new Date(timestamp * 1000).toLocaleTimeString(
        "ru-ru",
        this.getOptionsDate
      );
    },
    getForecast(cityName) {
      if (!cityName.length) {
        return;
      }
      // меняем флаги
      this.isShowTable = true;
      this.isWeatherDataLoading = true;
      this.isNotExistCity = false;

      // чистим данные перед запросом
      this.cityData = {};
      this.sevenDaysForecast = [];

      // первый запрос чтобы получить координаты города,
      // и по нему идёт второй запрос о погоде на 7 дней, т.к api на 10 платное
      apiClient
        .getWeatherCurrent(cityName)
        .then((response) => {
          this.cityData = response.data;
        })
        .then(() => {
          apiClient
            .oneCallForecast(this.cityData.coord.lat, this.cityData.coord.lon)
            .then((response) => {
              this.isWeatherDataLoading = false;
              // перезапись некоторых полей для корректного отображения в таблице
              response.data.daily.forEach((el) => {
                const { min, max } = el.temp;
                el.tempMinMax = this.normalizeMinMaxTemp(min, max);

                // проверка на существование поля объёма осадков
                if (!el.rain) {
                  el.rain = "-";
                }
                this.normalizeTemp(el.temp);
                this.normalizeTemp(el.feels_like);

                // т.к всегда приходит массив из 1 элемента достаем первый
                // и забираем у него описание погоды
                const { description } = el.weather[0];
                el.weatherDesc = description;

                el.pop = this.normalizeProbability(el.pop);

                el.dt = this.normalizeDateFormat(el.dt);
              });
              this.sevenDaysForecast = response.data.daily;
            });
        })
        .catch(() => {
          this.isNotExistCity = true;
          this.isShowTable = false;
          this.isWeatherDataLoading = false;
        });
    },
  },
};
</script>

<style scoped>
/deep/ .v-text-field {
  flex-basis: 40%;
}
</style>
