import { StyleSheet, Text, View } from "react-native";
import { useWeather } from "./hooks/useWeather";

export default function App() {
  const { weather, error } = useWeather();

  return (
    <View style={styles.container}>
      {/* <Text>
        {weather === null ? (
          <Text>{error !== null ? error : "Loading..."}</Text>
        ) : (
          <>
            <Text>Температура: {weather?.current?.temperature_2m}°C</Text>
            <Text>
              Відносна вологість: {weather?.current?.relative_humidity_2m}
            </Text>
            <Text>Швидкість вітру: {weather?.current?.wind_speed_10m}</Text>
          </>
        )}
      </Text> */}

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.bigTemp}>{weather?.current?.temperature_2m}°</Text>
        <Text style={styles.locationText}> Party Cloudy</Text>
      </View>
      <View>
        <Text style={styles.locationText}>South Jakarta, Indonesia ▾</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View>
          <Text>{weather?.current?.relative_humidity_2m}%</Text>
          <Text>Humidity</Text>
        </View>
        <View>
          <Text>11</Text>
          <Text>UV Index</Text>
        </View>
        <View>
          <Text>E {weather?.current?.wind_speed_10m} kmh</Text>
          <Text>Wind</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },

  bigTemp: {
    fontSize: 42,
    lineHeight: 44,
    letterSpacing: 0,
    fontWeight: 400,
  },

  locationText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: 400,
  },
});
