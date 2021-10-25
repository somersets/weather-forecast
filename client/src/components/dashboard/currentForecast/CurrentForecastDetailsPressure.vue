<template>
  <v-card-text class="d-flex align-center parameter pa-0">
    <div class="parameter__parameter-icon mr-5">
      <img src="../../../assets/pressure.png" alt="" />
    </div>
    <div class="parameter__name mr-5 blue-grey--text lighten-2">
      {{ $t("currentForecastDetails.pressure.name") }}
    </div>
    <div class="parameter__value">
      {{ (forecastDetails.pressure / 1.333).toFixed(0) }}
      {{ $t("currentForecastDetails.pressure.pressureInMM") }} -
      {{ $t("currentForecastDetails.pressure.status") }}
    </div>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ICurrentForecastDetails } from "../../../types/types";
@Component({
  name: "CurrentForecastDetailsPressure",
})
export default class CurrentForecastDetailsPressure extends Vue {
  @Prop({ required: true, type: Object })
  forecastDetails!: ICurrentForecastDetails;
}
</script>

<style lang="scss" scoped></style>
