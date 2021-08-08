<template>
  <v-data-table
    class="text-xl-h6"
    :loading="isWeatherLoading"
    loading-text="Loading... Please wait"
    :items-per-page="10"
    :headers="getHeaders"
    :items="forecastsData"
    item-key="dt"
    show-expand
  >
    <template v-slot:item.wind_deg="{ item }">
      <p v-html="getSideArrows(item.wind_deg)"></p>
    </template>

    <template v-slot:top>
      <v-app-bar src="https://picsum.photos/1920/1080?random">
        <h2 class="white--text">
          {{ city.name }}
        </h2>
      </v-app-bar>
    </template>
    <template v-slot:expanded-item="{ items, item }">
      <td></td>
      <td>
        Утром:
        {{ getCorrectTempSign(item.temp.morn) }}
        <br />
        Днем:
        {{ getCorrectTempSign(item.temp.day) }}
      </td>
      <td>
        Вечером:
        {{ getCorrectTempSign(item.temp.eve) }}
        <br />
        Ночью:
        {{ getCorrectTempSign(item.temp.night) }}
      </td>
      <td>Ощущается:</td>
      <td v-for="(tmp, index) in item.feels_like" :key="index">
        {{ getFeelLikesTemperatureDuringTheDay(tmp, index) }}
      </td>
      <td>
        Максимальное значение УФ-индекса за день:
        {{ item.uvi }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "AppWeatherDataTable",
  data() {
    return {};
  },
  props: {
    isWeatherLoading: {
      type: Boolean,
      required: true,
    },
    forecastsData: {
      type: Array,
      required: true,
    },
    city: {
      type: Object,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },

  },
  computed: {
    getHeaders() {
      return [
        {
          text: "Дата",
          align: "start",
          sortable: false,
          value: "dt",
        },
        { text: "Погода", value: "weatherDesc" },
        { text: "Температура", value: "tempMinMax" },
        { text: "Скорость ветра, м/c", value: "wind_speed" },
        { text: "Направление ветра, м/c", value: "wind_deg" },
        { text: "Давление, мм рт. ст.", value: "pressure" },
        { text: "Влажность, %", value: "humidity" },
        { text: "Облачность, %", value: "clouds" },
        { text: "Вероятность выпадения осадков, %", value: "pop" },
        { text: "Объем осадков, мм", value: "rain" },
      ];
    },
  },
  methods: {
    getFeelLikesTemperatureDuringTheDay(temp, index) {
      const partsDay = {
        day: "Днём",
        night: "Ночью",
        morn: "Утром",
        eve: "Вечером",
      };
      return `${partsDay[index]} ${this.getCorrectTempSign(temp)}`;
    },
    getSideArrows(deg) {
      if ((deg >= 0 && deg <= 10) || deg >= 350) {
        return `${deg}&deg С &darr;`;
      } else if (deg > 10 && deg < 80) {
        return `${deg}&deg СВ &#x2199;`;
      } else if (deg >= 80 && deg <= 100) {
        return `${deg}&deg В &larr;`;
      } else if (deg > 100 && deg < 170) {
        return `${deg}&deg ЮВ &#x2196;`;
      } else if (deg >= 170 && deg <= 190) {
        return `${deg}&deg Ю &darr;`;
      } else if (deg > 190 && deg < 260) {
        return `${deg}&deg ЮЗ &#x2197;`;
      } else if (deg >= 260 && deg <= 280) {
        return `${deg}&deg З &rarr;`;
      } else if (deg > 280 && deg < 350) {
        return `${deg}&deg СЗ &#x2198;`;
      }
    },
    getCorrectTempSign(temp) {
      return temp > 0 ? `+${temp}` : `-${temp}`;
    },
  },
};
</script>

<style scoped></style>
