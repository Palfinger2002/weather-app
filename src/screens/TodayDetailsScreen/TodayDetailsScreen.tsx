import { useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { View, Text } from "react-native";

type TodayDetailsRouteProp = RouteProp<RootStackParamList, "TodayDetails">;

export const TodayDetailsScreen = () => {
  const route = useRoute<TodayDetailsRouteProp>();
  const { day } = route.params;

  return (
    <View>
      <Text>Details for: {day}</Text>
    </View>
  );
};
