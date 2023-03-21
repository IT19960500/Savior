import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../utils/Colors";

const BottomNavigator = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton}>
        <FontAwesome5
          name="slideshare"
          style={styles.icon}
          size={30}
          color={Colors.white}
        />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome5 name="blog" size={30} color="#696969" />
          <Text style={styles.text}>Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome5 name="rss" size={30} color="#696969" />
          <Text style={styles.text}>Feeds</Text>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Text style={styles.helpMeButton}>Request Help</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome5 name="object-group" size={30} color="#696969" />
          <Text style={styles.text}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("MoreOption")}
        >
          <FontAwesome5 name="bars" size={30} color="#696969" />
          <Text style={styles.text}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bottomBar: {
    backgroundColor: "#f2f7fcff",
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#696969",
    marginTop: 3,
    position: "relative",
  },
  icon: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 5,
    marginLeft: -20,
  },

  floatingButton: {
    position: "absolute",
    bottom: 25,
    backgroundColor: "#f8f4f4",
    zIndex: 10,
    borderRadius: 25,
  },

  helpMeButton: {
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "LatoBold",
    color: Colors.primary,
  },

  text: {
    marginTop: 3,
    color: "#696969",
    fontFamily: "LatoBold",
  },
});
