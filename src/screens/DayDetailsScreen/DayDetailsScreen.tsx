import { useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { View, Text, StyleSheet, Image } from "react-native";
import { getConditionPhrase } from "../../utils/weather";
import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";
import { dayDetailsImages } from "../../utils/dayDetailsImages";
import { ellipseImages } from "../../utils/ellipseImages";

type DayDetailsRouteProp = RouteProp<RootStackParamList, "DayDetails">;

interface ImageProps {
  size?: { width: number; height: number };
}

export const DayDetailsScreen = ({
  size = { width: 32, height: 32 },
}: ImageProps) => {
  const route = useRoute<DayDetailsRouteProp>();
  const { date, weather, day } = route.params;
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
      precipitation: weather.hourly.precipitation_probability[index],
      windSpeed: weather.hourly.wind_speed_10m[index],
      isDay,
    };
  }

  const morning = getForecastForHour("09:00", 1);
  const afternoon = getForecastForHour("15:00", 1);
  const evening = getForecastForHour("18:00", 0);
  const night = getForecastForHour("21:00", 0);

  const dayDetailsTitles = {
    today: "Today Details",
    tomorrow: "Tomorrow Details",
    "3-days": "3-days Details",
    "7-days": "7-days Details",
  };

  const periods = { morning, afternoon, evening, night };
  const warmestPeriod = Object.keys(periods).reduce((warmest, key) =>
    periods[key as keyof typeof periods].temp >
    periods[warmest as keyof typeof periods].temp
      ? key
      : warmest,
  );

  function getDayDetailsForHour(hour: string) {
    const index = weather.hourly.time.findIndex(
      (time) => time.includes(date) && time.includes(hour),
    );

    return {
      windSpeed: weather.hourly.wind_speed_10m[index],
      relativeHumidity: weather.hourly.relative_humidity_2m[index],
      uvIndex: weather.hourly.uv_index[index],
      surfacePressure: weather.hourly.surface_pressure[index],
    };
  }

  const dayDetails = getDayDetailsForHour("12:00");

  return (
    <View>
      <Text style={styles.day}>{formatted}</Text>

      <View style={styles.containerTimeDay}>
        <View style={styles.timelineLine}>
          <Image source={ellipseImages.ellipse} style={styles.ellipse1}></Image>
          <Image source={ellipseImages.ellipse} style={styles.ellipse2}></Image>
          <Image source={ellipseImages.ellipse} style={styles.ellipse3}></Image>
          <Image source={ellipseImages.ellipse} style={styles.ellipse4}></Image>
        </View>

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
              {warmestPeriod === "morning"
                ? "Warmest part of the day"
                : getConditionPhrase(
                    morning.code,
                    morning.precipitation,
                    morning.windSpeed,
                  )}
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
              {warmestPeriod === "afternoon"
                ? "Warmest part of the day"
                : getConditionPhrase(
                    afternoon.code,
                    afternoon.precipitation,
                    afternoon.windSpeed,
                  )}
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
              {warmestPeriod === "evening"
                ? "Warmest part of the day"
                : getConditionPhrase(
                    evening.code,
                    evening.precipitation,
                    evening.windSpeed,
                  )}
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
              {warmestPeriod === "night"
                ? "Warmest part of the day"
                : getConditionPhrase(
                    night.code,
                    night.precipitation,
                    night.windSpeed,
                  )}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsGrid}>
        <Text style={styles.dayDetails}>{dayDetailsTitles[day]}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailsItem}>
            <Image
              source={dayDetailsImages.wind}
              style={size}
              resizeMode="contain"
            />
            <View style={styles.detailsText}>
              <Text style={styles.detailValue}>
                E {Math.round(dayDetails.windSpeed)} kmh
              </Text>
              <Text style={styles.detailLabel}>Wind</Text>
            </View>
          </View>

          <View style={styles.detailsItem}>
            <Image
              source={dayDetailsImages.humidity}
              style={size}
              resizeMode="contain"
            />
            <View style={styles.detailsText}>
              <Text style={styles.detailValue}>
                {dayDetails.relativeHumidity} %
              </Text>
              <Text style={styles.detailLabel}>Humidity</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailsItem}>
            <Image
              source={dayDetailsImages.uvIndex}
              style={size}
              resizeMode="contain"
            />
            <View style={styles.detailsText}>
              <Text style={styles.detailValue}>
                {Math.round(dayDetails.uvIndex)}
              </Text>
              <Text style={styles.detailLabel}>UV Index</Text>
            </View>
          </View>

          <View style={styles.detailsItem}>
            <Image
              source={dayDetailsImages.pressure}
              style={size}
              resizeMode="contain"
            />
            <View style={styles.detailsText}>
              <Text style={styles.detailValue}>
                {Math.round(dayDetails.surfacePressure)} hPa
              </Text>
              <Text style={styles.detailLabel}>Pressure</Text>
            </View>
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

  containerTimeDay: {
    position: "relative",
  },

  timelineLine: {
    position: "absolute",
    top: 20,
    left: 30,
    bottom: 20,
    width: 2,
    borderLeftWidth: 2,
    borderStyle: "dashed",
    borderColor: "#617BE3",
    marginTop: 30,
  },

  timelineRow: {
    flexDirection: "row",
  },

  ellipse1: {
    width: 17,
    height: 17,
    position: "absolute",
    right: -7.5,
  },

  ellipse2: {
    width: 17,
    height: 17,
    position: "absolute",
    right: -7.5,
    bottom: 180,
  },

  ellipse3: {
    width: 17,
    height: 17,
    position: "absolute",
    right: -7.5,
    bottom: 90,
  },

  ellipse4: {
    width: 17,
    height: 17,
    position: "absolute",
    right: -7.5,
    bottom: 0,
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
    width: 65,
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

  detailsGrid: {
    marginHorizontal: 24,
    marginVertical: 42,
  },

  dayDetails: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 26,
    marginBottom: 20,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  detailsItem: {
    flexDirection: "row",
  },

  detailsText: {
    marginLeft: 10,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 18,
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 14,
  },
});
