<template>
  <v-card-text class="d-flex align-center parameter pa-0">
    <div class="parameter__parameter-icon mr-5">
      <img src="../../assets/temp.svg" alt="" />
    </div>
    <div class="parameter__name mr-5 blue-grey--text lighten-2">
      {{ $t("currentForecastDetails.temp") }}
    </div>
    <div class="parameter__value">
      {{ forecastDetails.maxTemp }}° -
      {{ $t("currentForecastDetails.feels_like") }}
      {{ forecastDetails.feels_like }}°
    </div>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ICurrentForecastDetails } from "../../types/types";
@Component({
  name: "CurrentForecastTemperature",
})
export default class CurrentForecastTemperature extends Vue {
  @Prop({ required: true, type: Object })
  forecastDetails!: ICurrentForecastDetails;
}
</script>

<style scoped></style>
