import axios from "axios";
const weatherID = "7ddbbac4414598a0582efd0c12096e75";
// celsius, m/s and etc
const typeUnits = "metric";

const apiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast?",
  withCredentials: false,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async getWeatherForecast(city) {
    return await apiClient.get(
      `q=${city}&units=${typeUnits}&lang=ru&appid=${weatherID}`
    );
  },
};
