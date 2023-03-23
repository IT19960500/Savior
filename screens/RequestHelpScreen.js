import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { auth, db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import Colors from "../utils/Colors";

const RequestHelpScreen = ({}) => {
  const requestType = ["Food", "Medicine", "Transport", "Clothes"];

  const [description, setDescription] = useState(null);
  const [type, setType] = useState(null);
  const [person, setPerson] = useState(null);
  const [contact, setContact] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [catchLocation, setCatchLocation] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isDangerous, setIsDangerous] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const d = new Date();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    setLocation(location);
    setAddress(address);
    setCatchLocation(true);
  };

  //clear alert and text
  const clear = () => {
    setTimeout(() => {
      setIsShow(false);
      setIsDangerous(false);
      setDescription(null);
      setType(null);
      setPerson(null);
      setContact(null);
      setAddress(null);
    }, 2000);
  };

  //create request
  const addRequest = async () => {
    if (!description || !type || !person || !contact || !address) {
      setIsShow(true);
      setAlertMsg("Please provide all values");
      setIsDangerous(true);
      clear();
      return;
    }
    let requestToSave = {
      description: description,
      type: type,
      person: person,
      contact: contact,
      userId: auth.currentUser.uid,
      userName: "Kanaka",
      address: address[0].city + ", " + address[0].country,
      createAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
      lati: location.coords.latitude,
      longi: location.coords.longitude,
      timestamp: Date.now(),
      userImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OIHckcpNeno7oFx_pw0izU0o2hQs50p4jw&usqp=CAU",
    };

    console.log(requestToSave);

    await addDoc(collection(db, "request"), requestToSave);

    setIsShow(true);
    setAlertMsg("Your request submit successfully...");
    clear();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Create Your Request</Text>

        <TextInput
          onChangeText={(description) => setDescription(description)}
          style={styles.descriptionText}
          placeholder="What is your request from others"
          multiline={true}
        />

        <View style={styles.spacer} />

        <SelectDropdown
          buttonStyle={styles.typeText}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          data={requestType}
          defaultButtonText="Select Request Type"
          renderDropdownIcon={(isOpened) => {
            return isOpened ? (
              <MaterialIcons name="arrow-drop-up" size={24} color="black" />
            ) : (
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            );
          }}
          onSelect={(selectedItem, index) => {
            setType(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        <View style={styles.spacer} />

        <TextInput
          style={styles.personText}
          placeholder="Number of persons"
          multiline={true}
          inputMode="numeric"
          onChangeText={(person) => setPerson(person)}
        />

        <View style={styles.spacer} />

        <TextInput
          style={styles.personText}
          placeholder="Your contact number"
          inputMode="tel"
          onChangeText={(contact) => setContact(contact)}
        />

        <View style={styles.spacer} />

        <TouchableOpacity
          style={
            catchLocation ? styles.locationBtnAfter : styles.locationBtnBefore
          }
          onPress={() => getLocation()}
        >
          <MaterialIcons
            name="add-location-alt"
            size={30}
            color={Colors.white}
          />
          {catchLocation ? (
            <Text style={styles.locationTxt}>
              Thank You! We Got Your Location
            </Text>
          ) : (
            <Text style={styles.locationTxt}>
              Click This Button For Get Your Location
            </Text>
          )}
        </TouchableOpacity>

        {isShow && (
          <View
            style={
              isDangerous
                ? [
                    styles.alertContainer,
                    {
                      backgroundColor: Colors.primary,
                      borderColor: Colors.secondary,
                    },
                  ]
                : [
                    styles.alertContainer,
                    { backgroundColor: "#3fc36f", borderColor: "#41b26a" },
                  ]
            }
          >
            <Text style={styles.alertText}>{alertMsg}</Text>
          </View>
        )}

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => addRequest()}
        >
          <Text style={styles.submitText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RequestHelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    width: "100%",
    paddingHorizontal: 20,
  },

  titleText: {
    color: Colors.black,
    fontSize: 23,
    fontFamily: "LatoBold",
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    paddingTop: 15,
  },

  descriptionText: {
    backgroundColor: Colors.white,
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: "top",
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: "LatoRegular",
    borderColor: "#cccccc",
    fontSize: 15,
    color: Colors.black,
    marginTop: 30,
  },

  spacer: {
    height: 20,
  },

  typeText: {
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    color: Colors.black,
  },

  buttonTextStyle: {
    fontSize: 15,
    fontFamily: "LatoRegular",
    color: "#999999",
  },

  dropdownStyle: {
    fontSize: 15,
    fontFamily: "LatoRegular",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    color: Colors.black,
  },

  personText: {
    fontSize: 15,
    fontFamily: "LatoRegular",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    color: Colors.black,
    backgroundColor: Colors.white,
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  locationBtnBefore: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  locationBtnAfter: {
    flexDirection: "row",
    backgroundColor: "#3fc36f",
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#41b26a",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  locationTxt: {
    fontSize: 15,
    fontFamily: "LatoRegular",
    color: Colors.bgWhite,
    fontWeight: "700",
  },

  submitButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    fontSize: 17,
    fontFamily: "LatoRegular",
    color: Colors.bgWhite,
    fontWeight: "700",
  },

  alertContainer: {
    flexDirection: "row",
    // backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  alertText: {
    fontSize: 17,
    fontFamily: "LatoRegular",
    color: Colors.bgWhite,
    fontWeight: "700",
  },
});
