import { Image, Text } from "react-native";
import { airQualityImages } from "../../utils/airQualityImages";

interface AirPollutionIconProps {
  aqi: number;
  size?: { width: number; height: number };
}

export const AirPollutionIcon = ({ aqi }: AirPollutionIconProps) => {
  if (aqi <= 50) {
    return <Image source={airQualityImages.good} />;
  }

  if (aqi <= 100) {
    return <Image source={airQualityImages.moderate} />;
  }

  if (aqi <= 150) {
    return <Image source={airQualityImages.unhealthyForSensitiveGroups} />;
  }

  if (aqi <= 200) {
    return <Image source={airQualityImages.unhealthy} />;
  }

  if (aqi <= 300) {
    return <Image source={airQualityImages.veryUnhealthy} />;
  }

  if (aqi <= 500) {
    return <Image source={airQualityImages.hazardous} />;
  }

  return <Text>Unknown</Text>;
};
