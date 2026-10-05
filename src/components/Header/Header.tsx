import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../hooks/useUser";
import { User } from "../../utils/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = () => {
  const { user, createUser } = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Локальний стан для редагування полів
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  // Підтягуємо актуальні дані користувача при відкритті модалки або зміні user
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user, isModalVisible]);

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      Alert.alert("Error", "First Name and Email are required");
      return;
    }

    const success = await createUser(formData);

    if (success) {
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } else {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Failed to clear storage", error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons name="notifications-outline" size={24} color="#000" />

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Image
          source={{ uri: "https://picsum.photos/150" }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Модальне вікно профілю */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Кнопка закриття */}
            <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Profile" : "User Profile"}
            </Text>

            {!isEditing ? (
              /* РЕЖИМ ПЕРЕГЛЯДУ */
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name:</Text>
                  <Text style={styles.infoValue}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Age:</Text>
                  <Text style={styles.infoValue}>
                    {user?.age || "Not specified"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{user?.email}</Text>
                </View>

                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.btnText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* РЕЖИМ РЕДАГУВАННЯ */
              <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, firstName: text })
                  }
                />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, lastName: text })
                  }
                />

                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(formData.age)}
                  onChangeText={(text) =>
                    setFormData({ ...formData, age: text })
                  }
                />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                />

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.primaryBtn, styles.saveBtn]}
                    onPress={handleSave}
                  >
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.primaryBtn, styles.cancelBtn]}
                    onPress={() => setIsEditing(false)}
                  >
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  infoContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  infoLabel: {
    fontWeight: "500",
    color: "#666",
  },
  infoValue: {
    fontWeight: "600",
    color: "#000",
  },
  formContainer: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  primaryBtn: {
    backgroundColor: "#617BE3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  saveBtn: {
    flex: 1,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#898989",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
