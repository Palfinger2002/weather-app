import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AirQualityResponse } from "../../types/airQuality";
import { getAqiCategory } from "../../utils/airQuality";
import { AirPollutionIcon } from "../AirPollutionIcon/AirPollutionIcon";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../Forecast/Forecast";
interface AirPollutionProps {
  airQuality: AirQualityResponse;
}

export const AirPollution = ({ airQuality }: AirPollutionProps) => {
  const category = getAqiCategory(airQuality.current.us_aqi);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Air Pollution</Text>
        <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate("RegistrationScreen");
        // }}
        >
          <Text style={styles.detailsLink}>Details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <AirPollutionIcon aqi={airQuality.current.us_aqi} />

        <View style={styles.textBlock}>
          <View style={styles.column}>
            <Text style={styles.aqiValue}>{airQuality.current.us_aqi}</Text>
            <Text style={styles.aqiCategory}>{category}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.pm25Label}>Micro Dust / PM2.5</Text>
            <Text style={styles.pm25Value}>{airQuality.current.pm2_5}</Text>
          </View>
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
  },

  detailsLink: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 26,
    color: "#617BE3",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    margin: 24,
  },

  textBlock: {
    marginLeft: 16,
    flexDirection: "row",
    gap: 20,
  },

  column: {
    justifyContent: "flex-start",
  },

  aqiValue: {
    color: "#F67280",
    fontWeight: 400,
    fontSize: 32,
    lineHeight: 44,
  },

  aqiCategory: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
  },

  pm25Label: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
    marginBottom: 10,
  },

  pm25Value: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 22,
    marginLeft: 30,
  },
});
