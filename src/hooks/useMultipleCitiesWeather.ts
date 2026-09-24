import { useEffect, useState } from "react";
import type { WeatherResponse } from "../types/weather";
import { City } from "../utils/savedCities";

export type CityWeather = {
  id: number;
  cityName: string;
  weather: WeatherResponse;
};

export function useMultipleCitiesWeather(savedCities: City[]) {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMultipleCitiesWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await Promise.allSettled(
          savedCities.map(async (city) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,surface_pressure,uv_index&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m,relative_humidity_2m,surface_pressure,uv_index&forecast_days=10`;

            const response = await fetch(url);
            // console.log(city.name, response.status);

            if (!response.ok) {
              throw new Error(`Failed to load weather for ${city.name}`);
            }

            const data: WeatherResponse = await response.json();

            return {
              id: city.id,
              cityName: city.name,
              weather: data,
            };
          }),
        );

        const succesfulCities = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        setCities(succesfulCities);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Happened unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMultipleCitiesWeather();
  }, [savedCities]);

  return { cities, error, isLoading };
}
