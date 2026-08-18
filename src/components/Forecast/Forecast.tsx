import { View, Text, StyleSheet } from "react-native";
import type { WeatherResponse } from "../../types/weather";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";

interface ForecastProps {
  weather: WeatherResponse;
}

export const Forecast = ({ weather }: ForecastProps) => {
  function getForecastForHour(hour: string, isDay: number) {
    const index = weather.hourly.time.findIndex((time) => time.includes(hour));

    return {
      temp: weather.hourly.temperature_2m[index],
      code: weather.hourly.weather_code[index],
      isDay,
    };
  }

  const morning = getForecastForHour("09:00", 1);
  const afternoon = getForecastForHour("15:00", 1);
  const evening = getForecastForHour("18:00", 0);
  const night = getForecastForHour("21:00", 0);

  return (
    <View>
      <View style={styles.containerImages}>
        <WeatherIcon weatherCode={morning.code} isDay={morning.isDay} />
        <WeatherIcon weatherCode={afternoon.code} isDay={afternoon.isDay} />
        <WeatherIcon weatherCode={evening.code} isDay={evening.isDay} />
        <WeatherIcon weatherCode={night.code} isDay={night.isDay} />
      </View>

      <View style={styles.containerTemp}>
        <Text style={styles.temp}>{morning.temp}°</Text>
        <Text style={styles.temp}>{afternoon.temp}°</Text>
        <Text style={styles.temp}>{evening.temp}°</Text>
        <Text style={styles.temp}>{night.temp}°</Text>
      </View>

      <View style={styles.containerTimeDay}>
        <Text>Morning</Text>
        <Text>Afternoon</Text>
        <Text>Evening</Text>
        <Text>Night</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  containerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerTemp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerTimeDay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },

  image: {
    width: 39,
    height: 38,
  },

  temp: {
    fontWeight: 600,
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: 12,
  },
});
