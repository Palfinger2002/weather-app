import { Image, Text, StyleSheet } from "react-native";
import { airQualityImages } from "../../utils/airQualityImages";

interface AirPollutionIconProps {
  aqi: number;
  size?: { width: number; height: number };
}

export const AirPollutionIcon = ({
  aqi,
  size = { width: 40, height: 40 },
}: AirPollutionIconProps) => {
  if (aqi <= 50) {
    return <Image source={airQualityImages.good} style={[styles.icon, size]} />;
  }

  if (aqi <= 100) {
    return (
      <Image source={airQualityImages.moderate} style={[styles.icon, size]} />
    );
  }

  if (aqi <= 150) {
    return (
      <Image
        source={airQualityImages.unhealthyForSensitiveGroups}
        style={[styles.icon, size]}
      />
    );
  }

  if (aqi <= 200) {
    return (
      <Image source={airQualityImages.unhealthy} style={[styles.icon, size]} />
    );
  }

  if (aqi <= 300) {
    return (
      <Image
        source={airQualityImages.veryUnhealthy}
        style={[styles.icon, size]}
      />
    );
  }

  if (aqi <= 500) {
    return (
      <Image source={airQualityImages.hazardous} style={[styles.icon, size]} />
    );
  }

  return <Text>Unknown</Text>;
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});
