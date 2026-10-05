import { WeatherResponse } from "./weather";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  DayDetails: {
    day: "today" | "tomorrow" | "3-days" | "7-days";
    date: string;
    weather: WeatherResponse;
  };
  RegistrationScreen: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
