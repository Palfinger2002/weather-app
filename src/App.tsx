import { MainScreen } from "./screens/MainScreen/MainScreen";
import { DayDetailsScreen } from "./screens/DayDetailsScreen/DayDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Settings } from "./screens/Settings/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types/navigation";
import { formatDayLabel } from "./utils/formatDayLabel";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
        <Stack.Screen
          name="DayDetails"
          component={DayDetailsScreen}
          options={({ route }) => ({ title: formatDayLabel(route.params.day) })}
        ></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
