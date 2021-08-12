import axios from "axios";
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
  async getWeatherCurrent(city, units = "metric") {
    return await apiClient.get(`weather?q=${city}&units=${units}&lang=ru`);
  },
  async oneCallForecast(lat, lon, units = "metric") {
    return await apiClient.get(
      `onecall?lat=${lat}&lon=${lon}&units=${units}&lang=ru&exclude=minutely,hourly,alerts,current`
    );
  },
};
