import { StyleSheet, Text, View } from "react-native";
import { useWeather } from "./hooks/useWeather";
import { Header } from "./components/Header/Header";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { WeatherMetrics } from "./components/WeatherMetrics/WeatherMetrics";
import { LocationDisplay } from "./components/LocationDisplay/LocationDisplay";
import { Forecast } from "./components/Forecast/Forecast";
import { AirPollution } from "./components/AirPolution/AirPolution";
import { useAirQuality } from "./hooks/useAirQuality";

export default function App() {
  const { weather, error, isLoading } = useWeather();
  const {
    airQuality,
    error: airQualityError,
    isLoading: airQualityLoading,
  } = useAirQuality();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!weather) {
    return <Text>No weather data</Text>;
  }

  if (!airQuality) {
    return <Text>No air quality data</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <CurrentWeather weather={weather} />
      <LocationDisplay weather={weather} />
      <WeatherMetrics weather={weather} />
      <Forecast weather={weather} />
      <AirPollution airQuality={airQuality} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 45,
    gap: 24,
    paddingRight: 12,
  },
});
