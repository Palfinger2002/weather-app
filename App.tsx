import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface WeatherResponse {
  current: {
    temperature_2m: number;
  };
}

export default function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current=temperature_2m";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        {weather === null
          ? "Loading..."
          : `Температура: ${weather?.current?.temperature_2m}C`}
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
