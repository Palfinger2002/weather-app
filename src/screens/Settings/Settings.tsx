import { useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/navigation";
import { View, Text } from "react-native";

type SettingsRouteProp = RouteProp<RootStackParamList, "Settings">;

export const Settings = () => {
  return (
    <View>
      <Text>Settings general</Text>
    </View>
  );
};
