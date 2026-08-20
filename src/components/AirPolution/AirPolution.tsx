import { View, Text, StyleSheet } from "react-native";
import { AirQualityResponse } from "../../types/airQuality";
import { getAqiCategory } from "../../utils/airQuality";
import { AirPollutionIcon } from "../AirPollutionIcon/AirPollutionIcon";

interface AirPollutionProps {
  airQuality: AirQualityResponse;
}

export const AirPollution = ({ airQuality }: AirPollutionProps) => {
  const category = getAqiCategory(airQuality.current.us_aqi);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Air Pollution</Text>
        <Text style={styles.detailsLink}>Details</Text>
      </View>
      <View style={styles.content}>
        <AirPollutionIcon
          aqi={airQuality.current.us_aqi}
          size={{ width: 1, height: 1 }}
        />

        <View style={styles.aqiBlock}>
          <Text style={styles.aqiValue}>{airQuality.current.us_aqi}</Text>

          <Text style={styles.aqiCategory}>{category}</Text>
        </View>
        <View style={styles.pm25Block}>
          <Text style={styles.pm25Label}>Micro Dust / PM2.5</Text>

          <Text style={styles.pm25Value}>{airQuality.current.pm2_5}</Text>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 24,
  },

  sectionTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
  },

  detailsLink: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
    color: "#617BE3",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    margin: 24,
  },

  aqiBlock: {
    marginHorizontal: 24,
  },

  aqiValue: {
    color: "#F67280",
    fontWeight: 400,
    fontSize: 32,
    lineHeight: 44,
    letterSpacing: 0,
    marginHorizontal: 14,
  },

  aqiCategory: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },

  pm25Block: {
    marginLeft: 20,
  },

  pm25Label: {
    fontSize: 12,
    lineHeight: 18,
  },

  pm25Value: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 22,
  },
});
