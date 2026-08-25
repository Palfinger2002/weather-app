import { useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { View, Text, StyleSheet } from "react-native";
import { getWeatherDescription } from "../../utils/weather";
import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";

type DayDetailsRouteProp = RouteProp<RootStackParamList, "DayDetails">;

export const DayDetailsScreen = () => {
  const route = useRoute<DayDetailsRouteProp>();
  const { date, weather } = route.params;
  const dateObject = new Date(date);

  const formatted = dateObject.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  function getForecastForHour(hour: string, isDay: number) {
    const index = weather.hourly.time.findIndex(
      (time) => time.includes(date) && time.includes(hour),
    );

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
      <Text style={styles.day}>{formatted}</Text>

      <View style={styles.containerTimeDay}>
        <View style={styles.timelineRow}>
          <View style={styles.cardContent}>
            <WeatherIcon
              weatherCode={morning.code}
              isDay={morning.isDay}
              size={{ width: 30, height: 30 }}
            />
            <Text style={styles.periodLabel}>Morning</Text>
          </View>

          <View
            style={[styles.card, { backgroundColor: "#90D0FF", marginTop: 32 }]}
          >
            <Text style={styles.cardTemp}>{Math.round(morning.temp)}°</Text>
            <Text style={styles.cardDescription}>
              {getWeatherDescription(morning.code)}
            </Text>
          </View>
        </View>

        <View style={styles.timelineRow}>
          <View style={styles.cardContent}>
            <WeatherIcon
              weatherCode={afternoon.code}
              isDay={afternoon.isDay}
              size={{ width: 30, height: 30 }}
            />
            <Text style={styles.periodLabel}>Afternoon</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#FFE1B2" }]}>
            <Text style={styles.cardTemp}>{Math.round(afternoon.temp)}°</Text>
            <Text style={styles.cardDescription}>
              {getWeatherDescription(afternoon.code)}
            </Text>
          </View>
        </View>

        <View style={styles.timelineRow}>
          <View style={styles.cardContent}>
            <WeatherIcon
              weatherCode={evening.code}
              isDay={evening.isDay}
              size={{ width: 30, height: 30 }}
            />
            <Text style={styles.periodLabel}>Evening</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#FFBAC1" }]}>
            <Text style={styles.cardTemp}>{Math.round(evening.temp)}°</Text>
            <Text style={styles.cardDescription}>
              {getWeatherDescription(evening.code)}
            </Text>
          </View>
        </View>

        <View style={styles.timelineRow}>
          <View style={styles.cardContent}>
            <WeatherIcon
              weatherCode={night.code}
              isDay={night.isDay}
              size={{ width: 30, height: 30 }}
            />
            <Text style={styles.periodLabel}>Night</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#02A8A8" }]}>
            <Text style={styles.cardTemp}>{Math.round(night.temp)}°</Text>
            <Text style={styles.cardDescription}>
              {getWeatherDescription(night.code)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  day: {
    marginTop: 20,
    marginLeft: 24,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0,
  },

  containerTimeDay: {},

  timelineRow: {
    flexDirection: "row",
  },

  periodLabel: {},

  card: {
    marginLeft: 20,
    flex: 1,
    padding: 10,
    marginVertical: 16,
  },

  cardContent: {
    marginTop: 32,
    marginLeft: 67,
  },

  cardTemp: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 14,
  },

  cardDescription: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 14,
    marginTop: 4,
  },
});
