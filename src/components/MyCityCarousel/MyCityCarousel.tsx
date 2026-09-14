import { useSavedCities } from "../../hooks/useSavedCities";
import { useMultipleCitiesWeather } from "../../hooks/useMultipleCitiesWeather";
import { useMyCity } from "../../hooks/useMyCity";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyCityCarousel = () => {
  const { cities, error, isLoading } = useSavedCities();
  const {
    cities: citiesWeather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useMultipleCitiesWeather(cities);
  const { selectedCityId, selectCity } = useMyCity();
  const [isCityListOpen, setIsCityListOpen] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    AsyncStorage.clear();
  }, []);

  if (isLoading || weatherLoading) {
    return <Text>Loading...</Text>;
  }

  if (error || weatherError) {
    return <Text>{error || weatherError}</Text>;
  }

  const selectedCityWeather = citiesWeather.find(
    (cityWeather) => cityWeather.id === selectedCityId,
  );

  if (!selectedCityWeather) {
    return <Text style={styles.stateText}>City not selected</Text>;
  }

  const cityData = selectedCityWeather.weather;
  const todayDate = new Date().toISOString().split("T")[0];

  function getForecastForHour(hour: string, isDay: number) {
    const index = cityData.hourly.time.findIndex(
      (time) => time.startsWith(todayDate) && time.endsWith(hour),
    );

    const safeIndex = index !== -1 ? index : 0;

    return {
      temp: cityData.hourly.temperature_2m[index] ?? 0,
      code: cityData.hourly.weather_code[index] ?? 0,
      isDay,
    };
  }

  const dayParts = [
    {
      label: "Morning",
      ...getForecastForHour("09:00", 1),
    },
    {
      label: "Afternoon",
      ...getForecastForHour("15:00", 1),
    },
    {
      label: "Evening",
      ...getForecastForHour("18:00", 0),
    },
    {
      label: "Night",
      ...getForecastForHour("21:00", 0),
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainSection}>
        <Text style={styles.sectionTitle}>My City</Text>

        <TouchableOpacity onPress={() => setIsCityListOpen(!isCityListOpen)}>
          {!isCityListOpen && <Text style={styles.editLink}>Edit</Text>}
        </TouchableOpacity>
        {isCityListOpen && (
          <View style={styles.listCities}>
            <ScrollView style={{ maxHeight: 70 }}>
              {cities.map((city) => {
                return (
                  <TouchableOpacity
                    key={city.id}
                    onPress={() => {
                      (selectCity(city.id), setIsCityListOpen(false));
                    }}
                  >
                    <Text style={styles.citiesName}>{city.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("DayDetails", {
              day: "today",
              date: todayDate,
              weather: cityData,
            });
          }}
        >
          <WeatherIcon
            weatherCode={cityData.current.weather_code}
            isDay={cityData.current.is_day}
          />
          <Text style={styles.cityName}>{selectedCityWeather.cityName}</Text>
          <Text style={styles.currentTemp}>
            {Math.round(cityData.current.temperature_2m)}°
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.dayRartsRow}>
        {dayParts.map((part, index) => (
          <View key={index}>
            <View style={styles.containerImages}>
              <WeatherIcon
                weatherCode={part.code}
                isDay={part.isDay}
                size={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.containerTemp}>{Math.round(part.temp)}°</Text>
            <Text style={styles.containerTimeDay}>{part.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },

  mainSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 12,
  },

  sectionTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 26,
  },

  editLink: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 26,
    color: "#617BE3",
  },

  card: {
    marginHorizontal: 24,
    padding: 16,
    alignItems: "center",
  },

  cityName: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 4,
  },

  citiesName: {
    fontSize: 12,
    fontWeight: 500,
    marginTop: 4,
  },

  currentTemp: {
    fontSize: 12,
    fontWeight: "bold",
  },

  containerImages: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },

  containerTemp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    textAlign: "center",
  },

  listCities: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 5,
  },

  containerTimeDay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    marginTop: 5,
  },

  image: {
    width: 39,
    height: 38,
  },

  dayRartsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    paddingHorizontal: 12,
  },

  dayPartColumn: {
    alignItems: "center",
    gap: 4,
  },

  temp: {
    fontWeight: 600,
    fontSize: 12,
  },

  timeLabel: {
    fontSize: 12,
    color: "#898989",
  },

  stateText: {
    textAlign: "center",
    marginVertical: 20,
  },
});
