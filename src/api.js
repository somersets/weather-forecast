import axios from "axios";
const weatherID = "7ddbbac4414598a0582efd0c12096e75";

// небольшая прослойка для запросов

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  withCredentials: false,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getWeatherCurrent(city, units = "metric") {
    return await apiClient.get(
      `weather?q=${city}&units=${units}&lang=ru&appid=${weatherID}`
    );
  },
  async oneCallForecast(lat, lon, units = "metric") {
    return await apiClient.get(
      `onecall?lat=${lat}&lon=${lon}&units=${units}&lang=ru&exclude=minutely,hourly,alerts,current&appid=${weatherID}`
    );
  },
};
