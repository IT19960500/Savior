import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Entypo } from "@expo/vector-icons";

import Colors from "../utils/Colors";

const MoreOptionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.textStyle}>My Profile</Text>
            <FontAwesome5 name="user-alt" size={25} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("MyRequest")}
        >
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.textStyle}>My Request</Text>
            <FontAwesome5
              name="slideshare"
              size={25}
              color={Colors.mediumGray}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("MyTips")}
        >
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.textStyle}>My Tips</Text>
            <FontAwesome5 name="blog" size={25} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.listItem}
          onPress={() => navigation.navigate("MyDonations")}
        >
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.textStyle}>My Donations</Text>
            <FontAwesome5 name="donate" size={25} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.textStyle}>Logout</Text>
            <Entypo name="log-out" size={25} color={Colors.mediumGray} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoreOptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.bgWhite,
  },

  listItem: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  listItemInnerContentView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 16,
    color: Colors.mediumGray,
    fontFamily: "LatoBold",
    fontWeight: 400,
  },

  spacer: {
    height: 15,
  },
});
