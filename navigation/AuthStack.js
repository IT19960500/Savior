import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import OnboardScreen from "../screens/OnboardScreen/OnboardScreen";
import {
  LoginScreen,
  SignupScreen,
  HomeScreen,
  MoreOptionScreen,
} from "../screens/index";
import { HeaderLeft, HeaderRight } from "../components/TopNavigation";

import Colors from "../utils/Colors";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstTimeLaunch, setIsFirstTimeLaunch] = useState(null);
  let routeName;

  //set values for first time launching app
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunch").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunch", "true");
        setIsFirstTimeLaunch(true);
      } else {
        setIsFirstTimeLaunch(false);
      }
    });
  }, []);

  //when the first time launch display Onboarding screen
  if (isFirstTimeLaunch === null) {
    return null;
  } else if (isFirstTimeLaunch === true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={({ navigation }) => ({
            title: "",
            headerStyle: {
              backgroundColor: Colors.bgWhite,
              shadowColor: Colors.bgWhite,
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <FontAwesome.Button
                  name="long-arrow-left"
                  size={25}
                  backgroundColor={Colors.bgWhite}
                  color={Colors.black}
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#FFF",
            },

            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          }}
        />

        <Stack.Screen
          name="MoreOption"
          component={MoreOptionScreen}
          options={({ navigation }) => ({
            title: "",
            headerStyle: {
              backgroundColor: Colors.bgWhite,
              shadowColor: Colors.bgWhite,
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <FontAwesome.Button
                  name="long-arrow-left"
                  size={25}
                  backgroundColor={Colors.bgWhite}
                  color={Colors.black}
                  onPress={() => navigation.navigate("Home")}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
