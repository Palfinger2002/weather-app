import { useState, useEffect } from "react";
import { savedCities } from "../utils/savedCities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_CITY_ID = "myCity";

export function useMyCity() {
  const [selectedCityId, setSelectedCityId] = useState(savedCities[0].id);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyCity = async () => {
      try {
        const savedData = await AsyncStorage.getItem(MY_CITY_ID);

        if (savedData === null) {
          AsyncStorage.setItem(MY_CITY_ID, JSON.stringify(savedCities[0].id));
        } else {
          setSelectedCityId(Number(savedData));
          AsyncStorage.setItem(MY_CITY_ID, String(selectedCityId));
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCity();
  }, []);

  const selectCity = (cityId: number) => {
    setSelectedCityId(cityId);
  };

  return {
    selectedCityId,
    selectCity,
  };
}
