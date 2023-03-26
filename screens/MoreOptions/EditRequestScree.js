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

import { auth, db } from "../../config/firebase";
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

import Colors from "../../utils/Colors";

const EditRequestScree = ({ route, navigation }) => {
  const {
    id,
    userId,
    image,
    userName,
    addressEdt,
    typeEdt,
    descriptionEdt,
    personEdt,
    createAt,
    contactEdt,
    latiEdt,
    longiEdt,
  } = route.params;

  const requestType = ["Food", "Medicine", "Transport", "Clothes"];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [catchLocation, setCatchLocation] = useState(false);

  const [description, setDescription] = useState(descriptionEdt);
  const [type, setType] = useState(typeEdt);
  const [person, setPerson] = useState(personEdt);
  const [contact, setContact] = useState(contactEdt);
  const [address, setAddress] = useState(addressEdt);

  const [isShow, setIsShow] = useState(false);
  const [isDangerous, setIsDangerous] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

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
    }, 2000);
  };

  //update request
  const updateRequest = async () => {
    if (!description || !type || !person || !contact) {
      setIsShow(true);
      setAlertMsg("Please provide all values");
      setIsDangerous(true);
      clear();
      return;
    }

    let requestToUpdate = {
      description: description,
      type: type,
      person: person,
      contact: contact,
    };

    console.log(requestToUpdate);

    const DocRef = doc(db, "request", id);

    await setDoc(DocRef, requestToUpdate, { merge: true });

    setIsShow(true);
    setAlertMsg("Request update successfully...");
    clear();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Update Your Request</Text>

        <TextInput
          style={styles.descriptionText}
          placeholder="What is your request from others"
          multiline={true}
          value={description}
          onChangeText={(description) => setDescription(description)}
        />

        <View style={styles.spacer} />

        <SelectDropdown
          buttonStyle={styles.typeText}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          data={requestType}
          defaultButtonText={type}
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
          value={person}
          onChangeText={(person) => setPerson(person)}
        />

        <View style={styles.spacer} />

        <TextInput
          style={styles.personText}
          placeholder="Your contact number"
          multiline={true}
          inputMode="tel"
          value={contact}
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
              Thank You! We Updated Your Location
            </Text>
          ) : (
            <Text style={styles.locationTxt}>
              Click And Update Your Location
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
          onPress={() => updateRequest()}
        >
          <Text style={styles.submitText}>Update Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditRequestScree;

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
