<template>
  <v-card
    max-width="450"
    width="100%"
    min-height="300"
    class="custom-card rounded-lg pa-5 mr-13"
  >
    <v-card-text class="d-flex align-center pa-0">
      <div class="current-temp-title mr-16">
        <div
          class="text-lg-h1 font-weight-medium current-temp-title--text-color"
        >
          {{ currentForecast.maxTemp }}
        </div>
        <div class="current-temp-title__day text-h3 font-weight-medium mb-8">
          {{ currentForecast.day }}
        </div>
      </div>
      <div>
        <img
          :src="`https://openweathermap.org/img/wn/${currentForecast.icon}@2x.png`"
          alt=""
        />
      </div>
    </v-card-text>
    <v-card-text class="current-temp-body pa-0">
      <div class="text-h5 blue-grey--text lighten-2 mb-3">
        {{ $t("currentForecast.time") }} {{ currentForecast.time }}
      </div>
      <div class="text-h5 blue-grey--text lighten-2">{{ $t("currentForecast.city") }} {{ cityName }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "CurrentForecast",
})
export default class CurrentForecast extends Vue {
  @Prop({ required: true }) readonly currentForecast;
  @Prop({ required: true, type: String }) readonly cityName;
}
</script>

<style lang="scss" scoped>
.custom-card {
}

.current-temp-title {
  max-width: 220px;
  width: 100%;
  &--text-color {
    color: #4793ff;
  }
  &__day {
    &:first-letter {
      text-transform: uppercase;
    }
  }
}

.current-temp-body {
  &__time {
  }
}
</style>
