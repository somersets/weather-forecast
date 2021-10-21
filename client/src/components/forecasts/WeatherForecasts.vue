<template>
  <v-sheet
    color="white"
    elevation="1"
    max-width="1350"
    width="100%"
    class="d-flex align-center justify-space-between pa-5"
    shaped
  >
    <v-card
      @click="$emit('getCurrentForecast', getCurrentForecast(index, forecast))"
      width="11.5%"
      ref="forecast"
      class="rounded-lg forecast pa-2"
      :class="{ active: current === index }"
      v-for="(forecast, index) of dataForecasts"
      :key="index"
    >
      <v-card-text class="forecast-wrapper pa-0">
        <div class="forecast__day text-h6 font-weight-medium text-no-wrap">
          {{
            getCorrectedWeekDay(
              index,
              normalizeDateFormat(forecast.dt, getOptionsWeekday)
            )
          }}
        </div>
        <div class="forecast__date blue-grey--text lighten-2">
          {{ normalizeDateFormat(forecast.dt, getOptionsMonthAndDay) }}
        </div>
        <div class="forecast__icon">
          <img
            :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
            alt=""
          />
        </div>
        <div class="text-h6 font-weight-medium forecast__temp-up">
          {{ normalizeTempSign(forecast.temp.max) }}
        </div>
        <div class="forecast__temp-low blue-grey--text lighten-2">
          {{ normalizeTempSign(forecast.temp.min) }}
        </div>
        <v-tooltip bottom class="blue lighten-3">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="
                forecast__sky
                blue-grey--text
                lighten-2
                text-no-wrap text-truncate
              "
            >
              {{ forecast.weather[0].description }}
            </div>
          </template>
          <span>{{ forecast.weather[0].description }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import enums from "@/utils/enums";
import checkLocale from "@/utils/checkLocale";

@Component({
  name: "WeatherForecasts",
})
export default class WeatherForecasts extends Vue {
  @Prop({ required: true, type: Array }) dataForecasts;
  current: string | number = 0;

  mounted() {
    this.getCurrentForecastOnMounted();
  }
  getCurrentForecastOnMounted() {
    const todayIndex = 0;
    this.$emit(
      "getCurrentForecast",
      this.prepareCurrentForecast(todayIndex, this.dataForecasts[0])
    );
  }

  getCurrentForecast(index, forecast) {
    this.current = index;
    return this.prepareCurrentForecast(index, forecast);
  }

  prepareCurrentForecast(index, forecast) {
    const day = this.getCorrectedWeekDay(
      index,
      this.normalizeDateFormat(forecast.dt, this.getOptionsWeekday)
    );
    const time = this.normalizeDateFormat(
      forecast.dt,
      this.getOptionsHourAndMinutes
    );
    const maxTemp = this.normalizeTempSign(forecast.temp.max);
    const pressure = forecast.pressure;
    const wind_deg = forecast.wind_deg;
    const wind_speed = forecast.wind_speed.toFixed(0);
    const feels_like = this.normalizeTempSign(forecast.feels_like.day);
    const icon = forecast.weather[0].icon;
    return {
      currentForecast: {
        day,
        time,
        maxTemp,
        icon,
      },
      forecastDetails: {
        maxTemp,
        pressure,
        wind_deg,
        wind_speed,
        feels_like,
      },
    };
  }

  normalizeTempSign(temp: number): string {
    if (temp >= 0) {
      return `+${temp.toFixed(0)}`;
    } else {
      return `${temp.toFixed(0)}`;
    }
  }

  normalizeDateFormat(timestamp: number, options: object): string {
    // перевод из UNIX в читабельный формат
    return new Date(timestamp * 1000).toLocaleString(
      `${this.$i18n.locale}-${this.$i18n.locale}`,
      options
    );
  }

  getCorrectedWeekDay(day, cb) {
    const locales = [
      { code: "ru", locale: enums.weekDaysRu[day] },
      { code: "en", locale: enums.weekDaysEng[day] },
    ];
    if (day === 0 || day === 1) {
      return checkLocale(this.$i18n.locale, locales);
    } else {
      return cb;
    }
  }

  get getOptionsMonthAndDay(): object {
    return {
      month: "short",
      day: "2-digit",
    };
  }
  get getOptionsWeekday(): object {
    return {
      weekday: "short",
    };
  }
  get getOptionsHourAndMinutes(): object {
    return {
      hour: "numeric",
      minute: "numeric",
    };
  }
}
</script>

<style lang="scss" scoped>
.forecast {
  background: rgba(71, 147, 255, 0.2);
  box-shadow: none !important;
  transition: 0.3s transform ease, 0.3s box-shadow ease;
  user-select: none;
  .forecast-wrapper {
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 1px 3px 8px 2px rgba(0, 0, 0, 0.3) !important;
  }
  &__day,
  &__sky {
    &:first-letter {
      text-transform: uppercase;
    }
  }
  &__sky {
  }
}

.active {
  transform: scale(1.05);
  box-shadow: 1px 3px 8px 2px rgba(0, 0, 0, 0.3) !important;
}

.v-tooltip__content {
  background-color: #90caf9;
}
</style>
