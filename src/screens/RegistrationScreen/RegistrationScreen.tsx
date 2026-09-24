import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { User } from "../../utils/user";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../components/Forecast/Forecast";

export const RegistrationScreen = () => {
  const { user, isLoading, createUser } = useUser();
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    city: "",
    email: "",
  });
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      throw new Error("Please, try to write a correct name and email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error("Try to write a correct email-address");
    }

    const success = await createUser(formData);

    if (success) {
      navigation.replace("Main");
    } else {
      throw new Error("Failed to save data to storage.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View>
      <View style={styles.title}>
        <Text>Registration Form</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          style={styles.firstName}
        ></TextInput>

        <TextInput
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          style={styles.lastName}
        ></TextInput>

        <TextInput
          placeholder="Age"
          value={formData.age}
          onChangeText={(text) => setFormData({ ...formData, age: text })}
          keyboardType="numeric"
          style={styles.age}
        ></TextInput>

        <TextInput
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          style={styles.city}
        ></TextInput>

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.email}
        ></TextInput>
      </View>

      <View style={styles.sex}>
        <Pressable
          style={({ pressed }) => [styles.male, pressed && styles.maleActive]}
          onPress={() => setFormData({ ...formData, sex: "male" })}
        >
          <Text
            style={
              formData.sex === "male" ? styles.selected : styles.unselected
            }
          >
            Male
          </Text>
        </Pressable>

        <TouchableOpacity
          style={styles.female}
          onPress={() => setFormData({ ...formData, sex: "female" })}
        >
          <Text
            style={
              formData.sex === "female" ? styles.selected : styles.unselected
            }
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  title: { alignItems: "center", marginTop: 150 },

  container: { alignItems: "center", marginTop: 20 },

  firstName: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },

  lastName: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },

  age: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },

  city: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },

  email: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },

  sex: {
    flexDirection: "row",
    alignItems: "center",
  },

  male: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
    margin: 20,
  },

  maleActive: {
    backgroundColor: "green",
  },

  female: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
  },

  selected: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 26,
    letterSpacing: 0,
  },

  unselected: {
    color: "#898989",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: 0,
  },

  button: {
    alignItems: "center",
  },

  submitBtn: {
    backgroundColor: "#617BE3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: 150,
  },

  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
