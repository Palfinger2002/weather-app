import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Ionicons name="notifications-outline" size={24} color="#000" />
      <Image
        source={{ uri: "https://picsum.photos/150" }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          marginLeft: 10,
        }}
      />
    </View>
  );
};
