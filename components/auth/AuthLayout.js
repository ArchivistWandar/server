import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Container } from "../Shared";

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }} // Ensure the view takes up the whole screen
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <Container>{children}</Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
