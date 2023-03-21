import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import Feather from "react-native-vector-icons/Feather";

import Colors from "../utils/Colors";

const HeaderLeft = () => {
  return (
    <View style={styles.headerLeft}>
      <Image
        style={styles.headerLeftImg}
        source={require("../assets/images/saviour-icon.png")}
      />

      <View style={{ marginLeft: 10 }}>
        <Text style={styles.headerText}>Savior</Text>
      </View>
    </View>
  );
};

const HeaderRight = () => {
  return (
    <View style={styles.headerRight}>
      <TouchableOpacity>
        <Feather
          name="search"
          style={styles.icon}
          size={30}
          color={Colors.white}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather
          name="more-vertical"
          style={styles.icon}
          size={30}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export { HeaderLeft, HeaderRight };

const styles = StyleSheet.create({
  headerLeft: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    flexDirection: "row",
    alignItems: "center",
  },

  headerLeftImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#cccccc",
    marginLeft: 15,
  },

  headerText: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Courgette",
    width: 100,
  },

  headerRight: {
    flexDirection: "row",
  },

  icon: {
    color: Colors.mediumGray,
    marginHorizontal: 3,
  },
});
