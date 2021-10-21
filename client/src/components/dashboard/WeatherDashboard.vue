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
import CurrentForecast from "@/components/currentForecast/CurrentForecast.vue";
import CurrentForecastDetails from "@/components/currentForecast/CurrentForecastDetails.vue";
import WeatherForecasts from "@/components/forecasts/WeatherForecasts.vue";
@Component({
  name: "WeatherDashboard",
  components: {
    CurrentForecast,
    CurrentForecastDetails,
    WeatherForecasts,
  },
})
export default class WeatherDashboard extends Vue {
  @Prop({ required: true, type: Array }) readonly dataForecasts;
  @Prop({ required: true, type: String }) readonly cityName;
  forecast: object = {};
  handleCurrentForecast(forecast) {
    this.forecast = forecast;
    console.log(this.forecast);
  }
  get isCurrentForecastEmpty() {
    return !!Object.keys(this.forecast).length;
  }
}
</script>

<style lang="scss" scoped></style>
