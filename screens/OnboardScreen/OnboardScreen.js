import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

import Colors from "../../utils/Colors";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? Colors.primary : Colors.mediumGray;

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 5,
      }}
    />
  );
};

const OnboardScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      titleStyles={{ color: Colors.primary, fontWeight: "600" }}
      subTitleStyles={{ color: Colors.mediumGray }}
      DotComponent={Dots}
      pages={[
        {
          backgroundColor: Colors.bgWhite,
          image: (
            <Image source={require("../../assets/images/obs-vector-1.png")} />
          ),
          title: "STAY INFORMED",
          subtitle:
            "Disasters cannot be totally prevented but their impact can be educed",
        },

        {
          backgroundColor: Colors.bgWhite,
          image: (
            <Image source={require("../../assets/images/obs-vector-2.png")} />
          ),
          title: "HAVE A PLANE  FOR EVACUATION",
          subtitle:
            "Disasters cannot be totally prevented but their impact can be educed",
        },

        {
          backgroundColor: Colors.bgWhite,
          image: (
            <Image source={require("../../assets/images/obs-vector-3.png")} />
          ),
          title: "KEEP EMERGENCY KITS ON HAND",
          subtitle:
            "Disasters cannot be totally prevented but their impact can be educed",
        },

        {
          backgroundColor: Colors.bgWhite,
          image: (
            <Image source={require("../../assets/images/obs-vector-4.png")} />
          ),
          title: "AVOID UNNECESSARY RISKS",
          subtitle:
            "Disasters cannot be totally prevented but their impact can be educed",
        },

        {
          backgroundColor: Colors.bgWhite,
          image: (
            <Image source={require("../../assets/images/obs-vector-5.png")} />
          ),
          title: "GO TO THE SAFEST AREA IN YOUR HOME",
          subtitle:
            "Disasters cannot be totally prevented but their impact can be educed",
        },
      ]}
    />
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
