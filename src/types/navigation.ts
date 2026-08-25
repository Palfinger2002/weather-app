import { WeatherResponse } from "./weather";

export type RootStackParamList = {
  Main: undefined;
  DayDetails: {
    day: "today" | "tomorrow" | "3-days" | "7-days";
    date: string;
    weather: WeatherResponse;
  };
  Settings: undefined;
};
