import { StyleSheet, Text, View } from "react-native";
import { useWeather } from "./hooks/useWeather";

export default function App() {
  const { weather, error } = useWeather();

  return (
    <View style={styles.container}>
      <Text>
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
      </Text>
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
});
