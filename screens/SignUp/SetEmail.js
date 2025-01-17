import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import { validateEmail, removeWhitespace } from "../../components/auth/Utils";
import {
  AuthButtonContainer,
  AuthErrorMessage,
  AuthTextBox,
  AuthTextInfo,
  AuthTextInput,
  AuthTitle,
} from "../../components/auth/AuthShared";
import { View } from "react-native";
import { Container } from "../../components/Shared";

const SetEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef();
  const goToPassword = () => {
    navigation.navigate("SetPassword", { email: email });
  };

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email"
    );
  };

  useEffect(() => {
    setDisabled(!(email && !errorMessage));
  }, [email, errorMessage]);

  return (
    <Container>
      <AuthTitle>What’s your email address?</AuthTitle>
      <AuthLayout>
        <AuthTextBox disabled={errorMessage}>
          <View>
            <AuthTextInfo>Email</AuthTextInfo>
            <AuthTextInput
              placeholder="me@email.com"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize={"none"}
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
              value={email}
              onChangeText={_handleEmailChange}
            />
          </View>
        </AuthTextBox>
        <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        <AuthButtonContainer>
          <AuthButton
            text="Continue"
            disabled={disabled}
            onPress={goToPassword}
            isYellow={false}
            loading={false}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default SetEmail;
