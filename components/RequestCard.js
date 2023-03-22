import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import {
  EvilIcons,
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MapView from "react-native-maps";

import Colors from "../utils/Colors";

const RequestCard = (props) => {
  const { image, userName, location, type, description, person, createAt } =
    props;
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeftView}>
          <Image style={styles.headerLeftImg} source={{ uri: image }} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{userName}</Text>
          <View style={styles.locationContainer}>
            <EvilIcons
              name="location"
              style={styles.icon}
              size={18}
              color="#64676B"
            />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.contentItem}>
          <MaterialIcons
            name="category"
            style={styles.cIcon}
            size={22}
            color="#64676B"
          />
          <Text style={styles.contentText}>{type}</Text>
        </View>
        <View style={styles.contentItem}>
          <Fontisto
            name="persons"
            style={styles.cIcon}
            size={21}
            color="#64676B"
          />
          <Text style={styles.contentText}>
            {person > 1 ? person + " Persons" : person + " Person"}
          </Text>
        </View>
        <View style={styles.contentItem}>
          <MaterialCommunityIcons
            name="update"
            style={styles.cIcon}
            size={22}
            color="#64676B"
          />
          <Text style={styles.contentText}>{createAt}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    elevation: 5,
    paddingVertical: 10,
    // backgroundColor: "#F7F8FA",
    backgroundColor: "#f2f2f2",
  },

  headerLeftImg: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    borderRadius: 50,
  },

  headerLeftView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    // flex: 2,
    padding: 15,
  },

  headerText: {
    color: Colors.black,
    fontSize: 17,
    fontFamily: "LatoBold",
    width: 100,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    fontSize: 13,
    color: "#64676B",
    fontFamily: "LatoRegular",
  },

  mapContainer: {
    paddingHorizontal: 20,
    height: 250,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  contentContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: "space-between",
  },

  contentItem: {
    flexDirection: "column",
    alignItems: "center",
  },

  cIcon: {
    paddingTop: 3,
  },

  contentText: {
    fontSize: 14,
    color: "#64676B",
    fontFamily: "LatoRegular",
    paddingTop: 5,
    fontWeight: "600",
  },

  descriptionContainer: {
    // backgroundColor: Colors.secondary,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  descriptionText: {
    textAlign: "justify",
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: Colors.mediumGray,
    fontWeight: "500",
  },
});
