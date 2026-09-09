import * as Location from "expo-location";

interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = async (): Promise<CurrentLocation> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  const location = await Location.getCurrentPositionAsync({});

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export const getCityName = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  const response = await fetch(url);

  const data = await response.json();

  const place = `${data.city}, ${data.countryName}`;

  return place;
};
