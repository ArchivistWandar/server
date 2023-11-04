import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
  Modal,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { themes } from "../../components/RecordTheme";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const HeaderRightText = styled.Text`
  color: ${colors.yellow};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  font-family: "JostSemiBold";
`;

const PreviewRecord = ({ navigation, route }) => {
  const [theme, setTheme] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const { assets } = route.params.result;

  console.log(theme);

  const HeaderRight = () => (
    <TouchableOpacity
    // onPress={() =>
    //   navigation.navigate("DecoRecord", {
    //     selectedPhotos: route.params.result,
    //   })
    // }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme ? theme.backgroundColor : colors.backgroundColor,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <BlurView
              style={{
                width: "100%",
                padding: 20,
                borderRadius: "10px",
              }}
              tint="dark"
              intensity={40}
            >
              <FlatList
                data={themes}
                renderItem={({ item: theme }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setTheme(theme);
                      setModalVisible(false);
                    }}
                    style={{
                      flex: 1,
                      margin: 10,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: theme.backgroundColor,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.textColor,
                        fontFamily: "JostMediumItalic",
                      }}
                    >
                      {theme.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(theme, index) => index.toString()}
                numColumns={3} // 열의 수를 3으로 설정
              />
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: theme ? theme.textColor : "white",
            fontFamily: "JostSemiBoldItalic",
            fontSize: 20,
            top: "-3%",
          }}
        >
          Wandar.
        </Text>
        <TouchableOpacity
          style={{
            top: "140%",
            flexDirection: "row",
            gap: "5px",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text
            style={{
              color: theme ? theme.textColor : "white",
              fontFamily: "JostMedium",
              fontSize: 15,
            }}
          >
            Choose a theme
          </Text>
          <Ionicons
            name="chevron-up"
            size={24}
            color={theme ? theme.textColor : "white"}
          />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: "25%", // 원의 위치. 선의 끝에 맞춰 조절하세요.
            left: "50%",
            marginLeft: -4, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
            width: 8, // 원의 크기
            height: 8, // 원의 크기
            borderRadius: 4, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "85%", // 원의 위치. 선의 끝에 맞춰 조절하세요.
            left: "50%",
            marginLeft: -4, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
            width: 8, // 원의 크기
            height: 8, // 원의 크기
            borderRadius: 4, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "25%",
            height: "60%",
            width: 1,
            backgroundColor: theme ? theme.textColor : "white",
          }}
        />
        <View style={styles.imageContainer}>
          {assets.map((image, index) => (
            <View
              key={index}
              style={[
                styles.imageWrapper,
                { alignItems: index % 2 === 0 ? "flex-start" : "flex-end" },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  top: "50%", // 가지가 이미지의 중앙에서 시작
                  width: "50%", // 가지의 길이. 적절히 조절하세요.
                  height: 1,
                  backgroundColor: theme ? theme.textColor : "white",
                }}
              />

              <Image source={{ uri: image.uri }} style={styles.image} />
              <View
                style={{
                  position: "absolute",
                  top: "48%", // 원의 위치. 선의 끝에 맞춰 조절하세요.
                  left: "50%",
                  marginLeft: -3, // 원의 반지름만큼 offset을 줘서 선 가운데에 위치시킵니다.
                  width: 6, // 원의 크기
                  height: 6, // 원의 크기
                  borderRadius: 6, // 원 모양을 만들기 위해 크기의 절반만큼 반지름을 줍니다.
                  backgroundColor: theme
                    ? theme.backgroundColor
                    : colors.backgroundColor,
                  borderColor: theme ? theme.textColor : "white",
                  borderWidth: 1,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50%",
    width: "100%",
  },
  imageWrapper: {
    width: "85%",
    top: "5%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

export default PreviewRecord;