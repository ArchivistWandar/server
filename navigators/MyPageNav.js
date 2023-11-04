import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../screens/MyPage/MyPage";
import MyInfoEdit from "../screens/MyPage/MyInfoEdit";
import MyProfileEdit from "../screens/MyPage/MyProfileEdit";
import { colors } from "../colors";

const Stack = createStackNavigator();

const MyPageNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: colors.backgroundColor,
        },
        headerTitleStyle: {
          fontFamily: "JostSemiBold",
          fontSize: 15,
        },
      }}
    >
      <Stack.Screen
        name="MyPage"
        options={{
          headerTitle: "My page",
        }}
        component={MyPage}
      />
      <Stack.Screen
        name="MyInfoEdit"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={MyInfoEdit}
      />
      <Stack.Screen
        name="MyProfileEdit"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={MyProfileEdit}
      />
    </Stack.Navigator>
  );
};

export default MyPageNav;