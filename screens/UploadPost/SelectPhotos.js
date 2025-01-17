import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Container } from "../../components/Shared";
import { Text, View } from "react-native";

const SelectPhotos = ({ navigation }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 4,
      orderedSelection: true,
      exif: true,
    });

    if (result.canceled) {
      navigation.goBack();
    } else {
      navigation.navigate("AddMemo", { result: result });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      pickImage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "JostMedium",
          }}
        >
          Loading...
        </Text>
      </View>
    </Container>
  );
};

export default SelectPhotos;
