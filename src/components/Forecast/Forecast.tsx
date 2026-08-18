import { StyleSheet, Text, View } from "react-native";

export const Forecast = ({ weather }: { weather: any }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <View>
        <Text style={styles.metricValue}>
          {weather?.current?.relative_humidity_2m}%
        </Text>
        <Text>Humidity</Text>
      </View>
      <View>
        <Text style={styles.metricValue}>11</Text>
        <Text>UV Index</Text>
      </View>
      <View>
        <Text style={styles.metricValue}>
          E {weather?.current?.wind_speed_10m} kmh
        </Text>
        <Text>Wind</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  metricValue: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});
