import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function fetchWeather(city, days = 3) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: city,
      days,
    },
    timeout: 5000,
  });
  return response.data;
}
