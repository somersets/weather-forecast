import axios from "axios";
import $i18n from "../i18n/i18n";
// const lang = window.navigator.language.slice(0, 2) || "en";
// небольшая прослойка для запросов

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  withCredentials: false,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (req) => {
    req.url += `&appid=${process.env.VUE_APP_API_KEY}`;
    return req;
  },
  () => {}
);

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  () => {}
);

export default {
  async getWeatherCurrent(city: string, units: string = "metric") {
    return await apiClient.get(`weather?q=${city}&units=${units}&lang=${$i18n.locale}`);
  },
  async oneCallForecast(
    lat: number,
    lon: number,
    units: string = "metric"
  ): Promise<any> {
    return await apiClient.get(
      `onecall?lat=${lat}&lon=${lon}&units=${units}&lang=${$i18n.locale}&exclude=minutely,hourly,alerts,current`
    );
  },
};
