import { useEffect, useState } from "react";
import type { WeatherResponse } from "../types/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=49.52&longitude=28.48&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&hourly=temperature_2m,weather_code&forecast_days=10";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { weather, error, isLoading };
}
