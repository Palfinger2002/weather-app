import { StyleSheet, Text, View } from "react-native";
import { useCityName } from "../../hooks/useLocationName";

export const LocationDisplay = () => {
  const { cityName } = useCityName();

  return (
    <View>
      <Text style={styles.locationText}>{cityName} ▾</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  locationText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: 400,
    marginLeft: 24,
  },
});
