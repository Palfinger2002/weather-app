import { StyleSheet, Text, Image } from "react-native";
import { weatherImages } from "../../utils/weatherImages";

interface WeatherIconProps {
  weatherCode: number;
  isDay: number;
  size?: { width: number; height: number };
}

export const WeatherIcon = ({
  weatherCode,
  isDay,
  size = { width: 80, height: 78 },
}: WeatherIconProps) => {
  if (weatherCode === 0 && isDay === 1) {
    return (
      <Image
        source={weatherImages.clearDay}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  if (weatherCode === 0 && isDay === 0) {
    return (
      <Image
        source={weatherImages.clearNight}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  if (weatherCode >= 1 && weatherCode <= 3 && isDay === 1) {
    return (
      <Image
        source={weatherImages.partlyCloudyDay}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  if (weatherCode >= 1 && weatherCode <= 3 && isDay === 0) {
    return (
      <Image
        source={weatherImages.partlyCloudyNight}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  if (weatherCode >= 45 && weatherCode <= 48 && isDay === 1) {
    return (
      <Image
        source={weatherImages.cloudyDay}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  if (weatherCode >= 45 && weatherCode <= 48 && isDay === 0) {
    return (
      <Image source={weatherImages.cloudy} style={[styles.weatherIcon, size]} />
    );
  }

  if (
    ((weatherCode >= 51 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)) &&
    isDay === 1
  ) {
    return (
      <Image source={weatherImages.rain} style={[styles.weatherIcon, size]} />
    );
  }

  if (
    ((weatherCode >= 51 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)) &&
    isDay === 0
  ) {
    return (
      <Image
        source={weatherImages.rainNight}
        style={[styles.weatherIcon, size]}
      />
    );
  }

  // TODO: немає іконки для снігу в макеті, тимчасово показуємо cloudy
  if (
    ((weatherCode >= 71 && weatherCode <= 77) ||
      (weatherCode >= 85 && weatherCode <= 86)) &&
    isDay === 1
  ) {
    return (
      <Image source={weatherImages.cloudy} style={[styles.weatherIcon, size]} />
    );
  }

  if (
    ((weatherCode >= 71 && weatherCode <= 77) ||
      (weatherCode >= 85 && weatherCode <= 86)) &&
    isDay === 0
  ) {
    return (
      <Image source={weatherImages.cloudy} style={[styles.weatherIcon, size]} />
    );
  }

  if ((weatherCode >= 95 && weatherCode <= 96) || weatherCode === 99) {
    return (
      <Image
        source={weatherImages.thunderstorm}
        style={[styles.weatherIcon, size]}
      />
    );
  }
  return <Text>Unknown</Text>;
};

export const styles = StyleSheet.create({
  weatherIcon: {
    width: 80,
    height: 78,
  },
});
