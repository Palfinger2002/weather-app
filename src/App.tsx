import { MainScreen } from "./screens/MainScreen/MainScreen";
import { DayDetailsScreen } from "./screens/DayDetailsScreen/DayDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types/navigation";
import { formatDayLabel } from "./utils/formatDayLabel";
import { EditCities } from "./components/EditCities/EditCities";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { useUser } from "./hooks/useUser";
import { ActivityIndicator, View } from "react-native";
import { UserProvider } from "./context/UserContext";
import { User } from "./utils/user";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />

            <Stack.Screen
              name="DayDetails"
              component={DayDetailsScreen}
              options={({ route }) => ({
                title: formatDayLabel(route.params.day),
              })}
            />

            <Stack.Screen name="EditCities" component={EditCities} />
          </>
        ) : (
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
