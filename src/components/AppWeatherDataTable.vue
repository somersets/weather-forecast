<template>
  <v-data-table
    class="text-xl-h6"
    :loading="isWeatherLoading"
    loading-text="Loading... Please wait"
    :items-per-page="10"
    :headers="getTableHeaders"
    :items="forecastsData"
    item-key="dt"
    show-expand
  >
    <template v-slot:item.dt="{ item }">
      {{ normalizeDateFormat(item.dt) }}
    </template>
    <template v-slot:item.weather="{ item }">
      {{ item.weather[0].description }}
    </template>
    <template v-slot:item.tempMinMax="{ item }">
      {{ normalizeMinMaxTemp(item.temp.min, item.temp.max) }}
    </template>
    <template v-slot:item.wind_deg="{ item }">
      <span v-html="getSideArrows(item.wind_deg)"></span>
    </template>
    <template v-slot:item.pop="{ item }">
      {{ normalizeProbability(item.pop) }}
    </template>
    <template v-slot:item.rain="{ item }">
      {{ item.rain || "-" }}
    </template>
    <template v-slot:top>
      <v-app-bar src="https://picsum.photos/1920/1080?random">
        <h2 class="white--text">
          {{ city }}
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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class AppWeatherDataTable extends Vue {
  @Prop({ required: true }) readonly isWeatherLoading!: boolean;
  @Prop({ required: true, default: [] }) readonly forecastsData!: Array<Object>;
  @Prop({ required: true, default: "" }) readonly city!: string;
  @Prop() readonly background!: String;

  normalizeMinMaxTemp(min: number, max: number): string {
    // добавление знака плюс и минус в зависимости от температуры
    // меньше или больше 0 и т.д.
    if (min > 0 && max > 0) {
      return `+${min.toFixed(0)}...+${max.toFixed(0)}`;
    } else if (min < 0 && max > 0) {
      return `-${min.toFixed(0)}...+${max.toFixed(0)}`;
    } else {
      return `-${min.toFixed(0)}...-${max.toFixed(0)}`;
    }
  }

  normalizeDateFormat(timestamp: number): string {
    // перевод из UNIX в читабельный формат
    return new Date(timestamp * 1000).toLocaleTimeString(
      "ru-ru",
      this.getOptionsDate
    );
  }

  normalizeProbability(pop: number): string {
    // преобразовывает десятичный коэффициент вероятности исхода в проценты
    return (pop * 100).toFixed(0);
  }

  getFeelLikesTemperatureDuringTheDay(temp: number, index: number): any {
    const partsDay: { [index: string]: string } = {
      day: "Днём",
      night: "Ночью",
      morn: "Утром",
      eve: "Вечером",
    };
    return `${partsDay[index]} ${this.getCorrectTempSign(temp.toFixed(0))}`;
  }

  getSideArrows(deg: number): string {
    if ((deg >= 0 && deg <= 10) || deg >= 350) {
      return `${deg}&deg С &darr;`;
    } else if (deg > 10 && deg < 80) {
      return `${deg}&deg СВ &#x2199;`;
    } else if (deg >= 80 && deg <= 100) {
      return `${deg}&deg В &larr;`;
    } else if (deg > 100 && deg < 170) {
      return `${deg}&deg ЮВ &#x2196;`;
    } else if (deg >= 170 && deg <= 190) {
      return `${deg}&deg Ю &uarr;`;
    } else if (deg > 190 && deg < 260) {
      return `${deg}&deg ЮЗ &#x2197;`;
    } else if (deg >= 260 && deg <= 280) {
      return `${deg}&deg З &rarr;`;
    } else if (deg > 280 && deg < 350) {
      return `${deg}&deg СЗ &#x2198;`;
    } else {
      return "";
    }
  }

  getCorrectTempSign(temp: number | string): string {
    return temp > 0 ? `+${temp}` : `-${temp}`;
  }

  get getOptionsDate(): Object {
    return {
      weekday: "short",
      month: "short",
      day: "2-digit",
    };
  }
  get getTableHeaders(): Array<Object> {
    return [
      {
        text: "Дата",
        align: "start",
        sortable: false,
        value: "dt",
      },
      { text: "Погода", value: "weather" },
      { text: "Температура", value: "tempMinMax" },
      { text: "Скорость ветра, м/c", value: "wind_speed" },
      { text: "Направление ветра, м/c", value: "wind_deg" },
      { text: "Давление, мм рт. ст.", value: "pressure" },
      { text: "Влажность, %", value: "humidity" },
      { text: "Облачность, %", value: "clouds" },
      { text: "Вероятность выпадения осадков, %", value: "pop" },
      { text: "Объем осадков, мм", value: "rain" },
    ];
  }
}
</script>

<style scoped></style>
