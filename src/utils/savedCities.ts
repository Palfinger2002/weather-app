export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const savedCities: City[] = [
  { id: 1, name: "Kyiv", latitude: 50.27, longitude: 30.3 },
  { id: 2, name: "Vinnytsia", latitude: 49.14, longitude: 28.29 },
  { id: 3, name: "Dnipro", latitude: 48.27, longitude: 35.02 },
  { id: 4, name: "Donetsk", latitude: 48.0, longitude: 37.48 },
  { id: 5, name: "Zhytomyr", latitude: 50.15, longitude: 28.4 },
  { id: 6, name: "Zaporizhzhia", latitude: 47.5, longitude: 35.1 },
  { id: 7, name: "Ivano-Frankivsk", latitude: 48.55, longitude: 24.42 },
  { id: 8, name: "Kropyvnytskyi", latitude: 48.31, longitude: 32.16 },
  { id: 9, name: "Luhansk", latitude: 48.34, longitude: 39.2 },
  { id: 10, name: "Lutsk", latitude: 50.44, longitude: 25.2 },
  { id: 11, name: "Lviv", latitude: 49.5, longitude: 24.01 },
  { id: 12, name: "Mykolaiv", latitude: 46.58, longitude: 31.59 },
  { id: 13, name: "Odesa", latitude: 46.29, longitude: 30.44 },
  { id: 14, name: "Poltava", latitude: 49.35, longitude: 34.33 },
  { id: 15, name: "Rivne", latitude: 50.37, longitude: 26.15 },
  { id: 16, name: "Sumy", latitude: 50.54, longitude: 34.48 },
  { id: 17, name: "Ternopil", latitude: 49.33, longitude: 25.35 },
  { id: 19, name: "Uzhhorod", latitude: 48.37, longitude: 22.17 },
  { id: 20, name: "Kharkiv", latitude: 50.0, longitude: 36.14 },
  { id: 21, name: "Kherson", latitude: 46.38, longitude: 32.37 },
  { id: 22, name: "Khmelnytskyi", latitude: 49.25, longitude: 27.0 },
  { id: 23, name: "Cherkasy", latitude: 49.26, longitude: 32.03 },
  { id: 24, name: "Chernihiv", latitude: 51.3, longitude: 31.18 },
  { id: 25, name: "Chernivtsi", latitude: 48.17, longitude: 25.56 },
  { id: 26, name: "Sevastopol", latitude: 44.36, longitude: 33.32 },
  { id: 27, name: "Simferopol", latitude: 44.57, longitude: 34.06 },
];
