<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-container class="d-flex align-center justify-center">
      <current-forecast
        v-if="isCurrentForecastEmpty"
        :current-forecast="forecast.currentForecast"
        :city-name="cityName"
      />
      <current-forecast-details
        :forecast-details="forecast.forecastDetails"
        v-if="isCurrentForecastEmpty"
      />
    </v-container>
    <weather-forecasts
      v-if="dataForecasts.length"
      :data-forecasts="dataForecasts"
      @getCurrentForecast="handleCurrentForecast"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CurrentForecast from "../currentForecast/CurrentForecast.vue";
import CurrentForecastDetails from "../currentForecast/CurrentForecastDetails.vue";
import WeatherForecasts from "../forecasts/WeatherForecasts.vue";
import { ICurrentForecast, IForecast } from "../../../types/types";

@Component({
  name: "WeatherDashboard",
  components: {
    CurrentForecast,
    CurrentForecastDetails,
    WeatherForecasts,
  },
})
export default class WeatherDashboard extends Vue {
  @Prop({ required: true, type: Array })
  readonly dataForecasts!: Array<IForecast>;
  @Prop({ required: true, type: String }) readonly cityName!: string;
  forecast: object = {};
  handleCurrentForecast(forecast: ICurrentForecast) {
    this.forecast = forecast;
  }
  get isCurrentForecastEmpty() {
    return !!Object.keys(this.forecast).length;
  }
}
</script>

<style lang="scss" scoped></style>
