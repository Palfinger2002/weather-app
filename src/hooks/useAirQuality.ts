import { useEffect, useState } from "react";
import { AirQualityResponse } from "../types/airQuality";

export function useAirQuality() {
  const [airQuality, setAirQuality] = useState<AirQualityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const url =
    "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=49.52&longitude=28.48&current=pm2_5,us_aqi";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Air Quality");
        }

        return response.json();
      })
      .then((data) => setAirQuality(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { airQuality, error, isLoading };
}
