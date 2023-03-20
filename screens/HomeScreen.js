import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { BottomNavigator } from "../components/index";
import Colors from "../utils/Colors";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BottomNavigator />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#F7F8FA",
  },
});
