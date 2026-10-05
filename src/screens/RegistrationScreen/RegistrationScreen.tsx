import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { User } from "../../utils/user";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation";
import { FloatingInput } from "../../components/FloatingInput/FloatingInput";

export const RegistrationScreen = () => {
  const { isLoading, createUser } = useUser();

  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      Alert.alert("Error", "Please write a correct name and email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please write a valid email address");
      return;
    }

    const success = await createUser(formData);

    if (success) {
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Failed to save data to storage.");
    }
  };

  const fields: {
    name: keyof User;
    placeholder: string;
  }[] = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
    { name: "age", placeholder: "Age" },
    { name: "email", placeholder: "Email" },
  ];

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Registration Form</Text>
      </View>

      <View style={styles.container}>
        {fields.map((field) => (
          <FloatingInput
            key={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            onChangeText={(text) =>
              setFormData({ ...formData, [field.name]: text })
            }
          />
        ))}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    alignItems: "center",
    marginTop: 80,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
  },
  container: {
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },
  submitBtn: {
    backgroundColor: "#617BE3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    width: 220,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
