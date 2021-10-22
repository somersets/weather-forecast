interface ILocale {
  code: string;
  locale: string;
}

interface IForecast {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IForecastFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: IForecastTemp;
  uvi: number;
  weather: Array<IForecastWeather>;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface IForecastFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

interface IForecastWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IForecastTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface ICurrentForecast {
  currentForecast: ICurrentForecastMain;
  forecastDetails: ICurrentForecastDetails;
}

interface ICurrentForecastMain {
  day: string;
  time: string;
  maxTemp: string;
  icon: string;
}
interface ICurrentForecastDetails {
  maxTemp: string;
  pressure: number;
  wind_deg: number;
  wind_speed: string;
  feels_like: string;
}

interface ILocales {
  code: string;
  locale: string;
}

export {
  ILocales,
  ILocale,
  IForecast,
  ICurrentForecast,
  ICurrentForecastMain,
  ICurrentForecastDetails,
};
