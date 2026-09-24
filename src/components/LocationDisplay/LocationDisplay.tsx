import { StyleSheet, Text, View } from "react-native";
import { useCityName } from "../../hooks/useLocationName";
import { useUser } from "../../hooks/useUser";

export const LocationDisplay = () => {
  const { cityName } = useCityName();
  const { user } = useUser();

  return (
    <View>
      <Text style={styles.userName}>Hello, {user?.firstName}</Text>
      <Text style={styles.locationText}>{cityName}</Text>
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
    marginTop: 6,
    marginBottom: 24,
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
