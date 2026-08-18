import { StyleSheet, Text, View } from "react-native";
import { useWeather } from "./hooks/useWeather";
import { Header } from "./components/Header/Header";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { Forecast } from "./components/Forecast/Forecast";
import { WeatherMetrics } from "./components/WeatherMetrics/WeatherMetrics";

export default function App() {
  const { weather, error, isLoading } = useWeather();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!weather) {
    return <Text>No weather data</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <CurrentWeather weather={weather} />
      <WeatherMetrics weather={weather} />
      <Forecast weather={weather} />
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
