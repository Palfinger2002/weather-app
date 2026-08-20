import { StyleSheet, Text, View } from "react-native";

export const LocationDisplay = ({ weather }: { weather: any }) => {
  return (
    <View>
      <Text style={styles.locationText}>South Jakarta, Indonesia ▾</Text>
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
