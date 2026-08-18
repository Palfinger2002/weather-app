import { StyleSheet, View, Text } from "react-native";
import type { WeatherResponse } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weather";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherResponse;
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.weatherInfo}>
        <Text style={styles.bigTemp}>{weather.current.temperature_2m}°</Text>
        <Text style={styles.locationText}>
          {getWeatherDescription(weather.current.weather_code)}
        </Text>
      </View>

      <WeatherIcon
        weatherCode={weather.current.weather_code}
        isDay={weather.current.is_day}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bigTemp: {
    fontSize: 42,
    lineHeight: 44,
    letterSpacing: 0,
    fontWeight: "400",
  },

  locationText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: "400",
  },

  weatherInfo: {},
});
