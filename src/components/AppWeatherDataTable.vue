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
    getCorrectTempSign(temp) {
      return temp > 0 ? `+${temp}` : `-${temp}`;
    },
  },
};
</script>

<style scoped></style>
