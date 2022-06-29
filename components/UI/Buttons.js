import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const Buttons = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    color: Colors.primary100,
    fontSize: 16,
  },
});
