<template>
  <v-card
    max-width="850"
    width="100%"
    min-height="300"
    class="
      parameters
      d-flex
      flex-column
      justify-center
      align-center
      rounded-lg
      pt-5
      pb-5
      pl-5
    "
  >
    <div class="cloud-back">
      <img src="../assets/cloud-background.png" alt="" />
    </div>
    <v-card-text class="d-flex align-center parameter pa-0">
      <div class="parameter__parameter-icon mr-5">
        <img src="../assets/temp.svg" alt="" />
      </div>
      <div class="parameter__name mr-5 blue-grey--text lighten-2">
        Температура
      </div>
      <div class="parameter__value">{{ forecastDetails.temp.max.toFixed(0) }}° - ощущается как undefined</div>
    </v-card-text>
    <v-card-text class="d-flex align-center parameter pa-0">
      <div class="parameter__parameter-icon mr-5">
        <img src="../assets/pressure.png" alt="" />
      </div>
      <div class="parameter__name mr-5 blue-grey--text lighten-2">Давление</div>
      <div class="parameter__value">{{ (forecastDetails.pressure / 1.333).toFixed(0) }} мм ртутного столба - нормальное</div>
    </v-card-text>
    <v-card-text class="d-flex align-center parameter pa-0">
      <div class="parameter__parameter-icon mr-5">
        <img src="../assets/precipitation.svg" alt="" />
      </div>
      <div class="parameter__name mr-5 blue-grey--text lighten-2">Осадки</div>
      <div class="parameter__value">Без осадков</div>
    </v-card-text>
    <v-card-text class="d-flex align-center parameter pa-0">
      <div class="parameter__parameter-icon mr-5">
        <img src="../assets/wind.svg" alt="" />
      </div>
      <div class="parameter__name mr-5 blue-grey--text lighten-2">Ветер</div>
      <div class="parameter__value">{{ forecastDetails.wind_speed }} м/с,
        <span v-html="getSideArrows(forecastDetails.wind_deg)"></span>
        - {{ getCategorySpeed(forecastDetails.wind_speed) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import enums from "@/utils/enums";
@Component({
  name: "CurrentForecastDetails",
})
export default class CurrentForecastDetails extends Vue {
  @Prop({ required: true }) readonly forecastDetails;

  getSideArrows(deg: number): string {
    return `${deg}${enums.sideArrows[(deg / 45) | 0]}`;
  }
  getCategorySpeed(windSpeed) {
    for (let key in enums.categorySpeed) {
      if (!Number.isNaN(Number(key))) {
        if (windSpeed < Number(key)) {
          return enums.categorySpeed[key];
        }
      }
    }
    return enums.categorySpeed[windSpeed];
  }
}
</script>

<style lang="scss" scoped>
.parameters {
  position: relative;
  .cloud-back {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.parameter {
  z-index: 1000;
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  &__parameter-icon {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 4px 10px -1px rgba(71, 147, 255, 0.2);
    border-radius: 50%;
  }
  &__name {
  }
  &__value {
  }
  &__name,
  &__value {
    line-height: 17px;
  }
}
</style>
