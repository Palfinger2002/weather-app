import { View, Text } from "react-native";

interface City {
  id: number;
  name: string;
}

const cities: City[] = [
  { id: 1, name: "Kyiv" },
  { id: 2, name: "Lviv" },
  { id: 3, name: "Odesa" },
  { id: 4, name: "DDharkiv" },
];

export const EditCities = () => {
  return (
    <View>
      {cities.map((city) => (
        <Text key={city.id}>{city.name}</Text>
      ))}
    </View>
  );
};
