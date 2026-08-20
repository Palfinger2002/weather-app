export const getAqiCategory = (aqi: number): string => {
  if (aqi <= 50) {
    return "Good";
  }

  if (aqi <= 100) {
    return "Moderate";
  }

  if (aqi <= 150) {
    return "Unhealthy for Sensitive Groups";
  }

  if (aqi <= 200) {
    return "Unhealthy";
  }

  if (aqi <= 300) {
    return "Very unhealthy";
  }

  if (aqi <= 500) {
    return "Hazardous";
  }
  return "Unknown";
};
