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
    <template v-slot:item.weather="{ item }" class="weather-desc">
      <div class="weather-desc">
        <img
          width="50px"
          height="50px"
          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
          alt="weather-icon"
        />
        <div>{{ item.weather[0].description }}</div>
      </div>
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
import ITableData from "@/types/types";
import sideArrows from "@/enums";
@Component({})
export default class AppWeatherDataTable extends Vue {
  @Prop({ required: true }) readonly isWeatherLoading!: boolean;
  @Prop({ required: true, default: [] }) readonly forecastsData!: Array<object>;
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

  getFeelLikesTemperatureDuringTheDay(temp: number, index: number): string {
    const partsDay: { [index: string]: string } = {
      day: "Днём",
      night: "Ночью",
      morn: "Утром",
      eve: "Вечером",
    };
    return `${partsDay[index]} ${this.getCorrectTempSign(temp.toFixed(0))}`;
  }

  getSideArrows(deg: number): string {
    return `${deg}${sideArrows[(deg / 45) | 0]}`;
  }

  getCorrectTempSign(temp: number | string): string {
    return temp > 0 ? `+${temp}` : `-${temp}`;
  }

  get getOptionsDate(): object {
    return {
      weekday: "short",
      month: "short",
      day: "2-digit",
    };
  }
  get getTableHeaders(): Array<ITableData> {
    return [
      {
        text: "Дата",
        align: "start",
        sortable: false,
        value: "dt",
      },
      { text: "Погода", value: "weather", sortable: false, align: "center" },
      {
        text: "Температура",
        value: "tempMinMax",
        sortable: false,
        align: "center",
      },
      {
        text: "Скорость ветра, м/c",
        value: "wind_speed",
        sortable: false,
        align: "center",
      },
      {
        text: "Направление ветра, м/c",
        value: "wind_deg",
        sortable: false,
        align: "center",
      },
      {
        text: "Давление, мм рт. ст.",
        value: "pressure",
        sortable: false,
        align: "center",
      },
      {
        text: "Влажность, %",
        value: "humidity",
        sortable: false,
        align: "center",
      },
      {
        text: "Облачность, %",
        value: "clouds",
        sortable: false,
        align: "center",
      },
      {
        text: "Вероятность выпадения осадков, %",
        value: "pop",
        align: "center",
        sortable: false,
      },
      {
        text: "Объем осадков, мм",
        value: "rain",
        sortable: false,

        align: "center",
      },
    ];
  }
}
</script>

<style scoped></style>
