<template>
  <v-card-text class="d-flex align-center parameter pa-0">
    <div class="parameter__parameter-icon mr-5">
      <img src="../../../assets/precipitation.svg" alt="" />
    </div>
    <div class="parameter__name mr-5 blue-grey--text lighten-2">
      {{ $t("currentForecastDetails.precipitation") }}
    </div>
    <div class="parameter__value">Без осадков</div>
  </v-card-text>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "CurrentForecastDetailsPrecipitation",
})
export default class CurrentForecastDetailsPrecipitation extends Vue {}
</script>

<style lang="scss" scoped></style>
