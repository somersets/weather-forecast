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
      <img src="../../assets/cloud-background.png" alt="" />
    </div>

    <CurrentForecastDetailsPressure :forecast-details="forecastDetails" />
    <CurrentForecastDetailsPrecipitation />
    <CurrentForecastDetailsWind :forecast-details="forecastDetails" />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ICurrentForecastDetails } from "../../types/types";
import CurrentForecastDetailsPrecipitation from "@/components/currentForecast/CurrentForecastDetailsPrecipitation.vue";
import CurrentForecastDetailsWind from "@/components/currentForecast/CurrentForecastDetailsWind.vue";
import CurrentForecastDetailsPressure from "@/components/currentForecast/CurrentForecastDetailsPressure.vue";

@Component({
  name: "CurrentForecastDetails",
  components: {
    CurrentForecastDetailsPrecipitation,
    CurrentForecastDetailsWind,
    CurrentForecastDetailsPressure,
  },
})
export default class CurrentForecastDetails extends Vue {
  @Prop({ required: true, type: Object })
  readonly forecastDetails!: ICurrentForecastDetails;
}
</script>

<style lang="scss">
.parameters {
  position: relative;
  .cloud-back {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.parameter {
  z-index: 1;
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
