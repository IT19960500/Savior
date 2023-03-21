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
  TipsScreen,
  FeedsScreen,
  CommunityScreen,
  RequestHelpScreen,
} from "../screens/index";

import {
  MyProfileScreen,
  MyRequestScreen,
  MyTipsScreen,
  MyDonationsScreen,
} from "../screens/MoreOptions/index";

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

        <Stack.Screen
          name="Tips"
          component={TipsScreen}
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

        <Stack.Screen
          name="Feeds"
          component={FeedsScreen}
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

        <Stack.Screen
          name="Community"
          component={CommunityScreen}
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

        <Stack.Screen
          name="RequestHelp"
          component={RequestHelpScreen}
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

        {/* more option stack */}

        <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
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

        <Stack.Screen
          name="MyRequest"
          component={MyRequestScreen}
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

        <Stack.Screen
          name="MyTips"
          component={MyTipsScreen}
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

        <Stack.Screen
          name="MyDonations"
          component={MyDonationsScreen}
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
