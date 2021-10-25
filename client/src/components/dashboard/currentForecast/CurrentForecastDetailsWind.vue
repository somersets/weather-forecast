<template>
  <v-card-text class="d-flex align-center parameter pa-0">
    <div class="parameter__parameter-icon mr-5">
      <img src="../../../assets/wind.svg" alt="" />
    </div>
    <div class="parameter__name mr-5 blue-grey--text lighten-2">
      {{ $t("currentForecastDetails.wind") }}
    </div>
    <div class="parameter__value">
      {{ forecastDetails.wind_speed }} м/с,
      <span v-html="getSideArrows(forecastDetails.wind_deg)"></span>
      - {{ getCategorySpeed(forecastDetails.wind_speed) }}
    </div>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ICurrentForecastDetails } from "../../../types/types";
import enums from "../../../utils/enums";
import { checkLocale, createLocales } from "../../../utils/locale";
@Component({
  name: "CurrentForecastDetailsWind",
})
export default class CurrentForecastDetailsWind extends Vue {
  @Prop({ required: true, type: Object })
  forecastDetails!: ICurrentForecastDetails;

  getSideArrows(deg: number): string {
    const arrowDegRu: string = `${deg}${enums.sideArrowsRu[(deg / 45) | 0]}`;
    const arrowDegEng: string = `${deg}${enums.sideArrowsEng[(deg / 45) | 0]}`;
    const locales = createLocales(["ru", "en"], [arrowDegRu, arrowDegEng]);
    return checkLocale(this.$i18n.locale, locales);
  }

  getCategorySpeed(windSpeed: string) {
    for (let key in enums.categorySpeedRu) {
      if (!Number.isNaN(Number(key))) {
        if (Number.parseInt(windSpeed) < Number(key)) {
          const locales = createLocales(
            ["ru", "en"],
            [enums.categorySpeedRu[key], enums.categorySpeedEng[key]]
          );
          return checkLocale(this.$i18n.locale, locales);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
