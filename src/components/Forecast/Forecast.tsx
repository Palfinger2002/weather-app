import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import type { WeatherResponse } from "../../types/weather";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";

interface ForecastProps {
  weather: WeatherResponse;
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Forecast = ({ weather }: ForecastProps) => {
  const [activeTab, setActiveTab] = useState<
    "today" | "tomorrow" | "3-days" | "7-days"
  >("today");
  const navigation = useNavigation<NavigationProp>();
  const date = new Date();

  if (activeTab === "tomorrow") {
    date.setDate(date.getDate() + 1);
  }

  if (activeTab === "3-days") {
    date.setDate(date.getDate() + 3);
  }

  if (activeTab === "7-days") {
    date.setDate(date.getDate() + 7);
  }

  const dateString = date.toISOString().split("T")[0];

  function getForecastForHour(
    hour: string,
    isDay: number,
    day: "today" | "tomorrow" | "3-days" | "7-days",
  ) {
    const index = weather.hourly.time.findIndex(
      (time) => time.includes(dateString) && time.includes(hour),
    );

    return {
      temp: weather.hourly.temperature_2m[index],
      code: weather.hourly.weather_code[index],
      isDay,
    };
  }

  const morning = getForecastForHour("09:00", 1, activeTab);
  const afternoon = getForecastForHour("15:00", 1, activeTab);
  const evening = getForecastForHour("18:00", 0, activeTab);
  const night = getForecastForHour("21:00", 0, activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable onPress={() => setActiveTab("today")}>
            <Text
              style={
                activeTab === "today" ? styles.tabActive : styles.tabInactive
              }
            >
              Today
            </Text>
          </Pressable>

          <Pressable onPress={() => setActiveTab("tomorrow")}>
            <Text
              style={
                activeTab === "tomorrow" ? styles.tabActive : styles.tabInactive
              }
            >
              Tomorrow
            </Text>
          </Pressable>

          <Pressable onPress={() => setActiveTab("3-days")}>
            <Text
              style={
                activeTab === "3-days" ? styles.tabActive : styles.tabInactive
              }
            >
              3-days
            </Text>
          </Pressable>

          <Pressable onPress={() => setActiveTab("7-days")}>
            <Text
              style={
                activeTab === "7-days" ? styles.tabActive : styles.tabInactive
              }
            >
              7-days
            </Text>
          </Pressable>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DayDetails", {
                day: activeTab,
                date: dateString,
                weather,
              });
            }}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerImages}>
        <WeatherIcon
          weatherCode={morning.code}
          isDay={morning.isDay}
          size={{ width: 50, height: 50 }}
        />
        <WeatherIcon
          weatherCode={afternoon.code}
          isDay={afternoon.isDay}
          size={{ width: 50, height: 50 }}
        />
        <WeatherIcon
          weatherCode={evening.code}
          isDay={evening.isDay}
          size={{ width: 50, height: 50 }}
        />
        <WeatherIcon
          weatherCode={night.code}
          isDay={night.isDay}
          size={{ width: 50, height: 50 }}
        />
      </View>

      <View style={styles.containerTemp}>
        <Text style={styles.temp}>{Math.round(morning.temp)}°</Text>
        <Text style={styles.temp}>{Math.round(afternoon.temp)}°</Text>
        <Text style={styles.temp}>{Math.round(evening.temp)}°</Text>
        <Text style={styles.temp}>{Math.round(night.temp)}°</Text>
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
  container: {
    margin: 25,
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  seeAll: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 26,
    letterSpacing: 0,
    color: "#617BE3",
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

  temp: {
    fontWeight: 600,
    lineHeight: 14,
    letterSpacing: 0,
    fontSize: 12,
  },

  tabActive: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 26,
    letterSpacing: 0,
  },

  tabInactive: {
    color: "#898989",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: 0,
  },
});
