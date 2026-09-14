import { useEffect, useState } from "react";
import { City, savedCities } from "../utils/savedCities";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_CITY_ID = "savedCities";

export function useSavedCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addCity = (city: City) => {
    const newCities = [...cities, city];
    setCities(newCities);
    AsyncStorage.setItem(MY_CITY_ID, JSON.stringify(newCities));
  };

  const removeCity = (id: number) => {
    const deletedCity = cities.filter((city) => city.id !== id);
    setCities(deletedCity);
    AsyncStorage.setItem(MY_CITY_ID, JSON.stringify(deletedCity));
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const storedData = await AsyncStorage.getItem(MY_CITY_ID);

        if (storedData === null) {
          setCities(savedCities);
          AsyncStorage.setItem(MY_CITY_ID, JSON.stringify(savedCities));
        } else {
          setCities(JSON.parse(storedData));
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, isLoading, addCity, removeCity, error };
}
