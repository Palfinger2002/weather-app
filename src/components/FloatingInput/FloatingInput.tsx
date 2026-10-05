import { useState } from "react";
import { TextInput, View, Text, StyleSheet, Animated } from "react-native";

interface FloatingInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export const FloatingInput = ({
  value,
  placeholder,
  onChangeText,
}: FloatingInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={focused || value !== "" ? "" : placeholder}
        onChangeText={onChangeText}
        onFocus={() => {
          setFocused(true);

          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }}
        onBlur={() => {
          setFocused(false);

          Animated.timing(animatedValue, {
            toValue: value !== "" ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }}
        style={styles.firstName}
      />
      <Animated.Text
        style={[
          styles.text,
          {
            top: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 2],
            }),
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  text: {
    position: "absolute",
    left: 17,
    top: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 3,
  },

  firstName: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 10,
    margin: 10,
  },
});
