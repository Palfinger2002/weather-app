import { useEffect, useState } from "react";

import { getCityName, getCurrentLocation } from "../utils/location";

export function useCityName() {
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const location = await getCurrentLocation();

        const cityNameResult = await getCityName(
          location.latitude,
          location.longitude,
        );
        setCityName(cityNameResult);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityName();
  }, []);

  return { cityName, error, isLoading };
}
