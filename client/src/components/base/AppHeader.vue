<template>
  <v-app-bar app color="blue accent-4">
    <div class="head-container d-flex justify-space-between align-center">
      <h1 class="white--text">
        <v-icon large color="white">mdi-weather-cloudy</v-icon>
        {{ $t("appHeader.title") }}
      </h1>

      <div class="d-flex align-center lang-selector white--text">
        <span
          @click="changeLocale(locale.code)"
          class="white--text lang-selector__selector"
          v-for="locale of locales"
          :key="locale.code"
          :class="{ active: locale.code === $i18n.locale }"
          >{{ locale.name }}</span
        >
        <span class="divider white--text">|</span>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "AppHeader",
})
export default class AppHeader extends Vue {
  locales = [
    { code: "ru", name: "RUS" },
    { code: "en", name: "ENG" },
  ];

  changeLocale(localeCode: string) {
    this.$i18n.locale = localeCode;
  }
}
</script>

<style lang="scss" scoped>
.head-container {
  width: 100%;
}
.active {
  text-decoration: underline;
  background: rgba(107, 144, 234, 0.5);

}
.lang-selector {
  padding: 5px;
  cursor: pointer;
  &__selector {
    border-radius: 5px;
    padding: 5px;
    transition: background 0.3s ease, text-decoration 0.3s ease;
    &:nth-child(2) {
      order: 2;
    }
  }
  .divider {
    order: 1;
  }
  span {

    &:not(:nth-child(2)) {
      margin-right: 5px;
    }
  }
}
</style>
