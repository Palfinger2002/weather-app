export const getWeatherDescription = (code: number): string => {
  if (code === 0) {
    return "Clear sky";
  }

  if (code >= 1 && code <= 3) {
    return "Partly cloudy";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 81) {
    return "Rain showers";
  }

  if (code >= 95 && code <= 96) {
    return "Thunderstorm";
  }

  return "Unknown";
};
