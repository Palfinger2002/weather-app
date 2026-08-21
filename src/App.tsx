import { MainScreen } from "./screens/MainScreen/MainScreen";
import { TodayDetailsScreen } from "./screens/TodayDetailsScreen/TodayDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
        <Stack.Screen
          name="TodayDetails"
          component={TodayDetailsScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
