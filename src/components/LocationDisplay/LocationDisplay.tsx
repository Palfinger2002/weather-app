import { StyleSheet, Text, View } from "react-native";
import { useCityName } from "../../hooks/useLocationName";

export const LocationDisplay = () => {
  const { cityName } = useCityName();

  return (
    <View>
      <Text style={styles.userName}>Hello, user</Text>
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
  userName: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0,
    fontWeight: 600,
    marginLeft: 24,
    marginBottom: 6,
  },
});
