import { useEffect, useState } from "react";
import type { WeatherResponse } from "../types/weather";
import { getCurrentLocation } from "../utils/location";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = await getCurrentLocation();

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,surface_pressure,uv_index&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m,relative_humidity_2m,surface_pressure,uv_index&forecast_days=10`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, error, isLoading };
}
