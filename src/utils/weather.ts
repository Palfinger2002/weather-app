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

export function getConditionPhrase(
  code: number,
  precipitation: number,
  windSpeed: number,
): string {
  if (precipitation >= 90) {
    return `Chance of Heavy Rain ${Math.round(precipitation)}%`;
  }

  if (precipitation >= 50) {
    return `Winds light and chance of rain ${Math.round(precipitation)}`;
  }

  if (windSpeed > 20) {
    return "Turning cloudy and windy";
  }

  if (code === 0) {
    return "Clear skies all day";
  }

  if (code >= 1 && code <= 3) {
    return "Partly cloudy conditions";
  }

  if (code >= 45 && code <= 48) {
    return "Foggy conditions expected";
  }

  return getWeatherDescription(code);
}
