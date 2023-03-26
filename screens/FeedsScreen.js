import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FormButton, SocialButton, FormInput } from "../components";
import Colors from "../utils/Colors";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import DropDownPicker from "react-native-dropdown-picker";

const FeedsScreen = ({ navigation }) => {
  const [donorName, setDonorName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [donationList, setDonationList] = useState([]);

  // const [type,setType]=useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Food", value: "food" },
    { label: "Clothes", value: "clothes" },
    { label: "Medical", value: "medical" },
    { label: "Transport", value: "transport" },
  ]);

  let addDonation = async (donation) => {
    let donationSave = {
      name: donorName,
      contact_number: contactNumber,
      quantity: qty,
      donation_description: description,
      donation_type: value,

      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "my_donations"), donationSave);

    donationSave.id = docRef.id;

    let updatedDonations = [...donationList];
    updatedDonations.push(donationSave);

    setDonationList(updatedDonations);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subLogoName}>Your Donations</Text>
      <DropDownPicker
        style={{ marginBottom: open ? 175 : 15 }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <FormInput
        labelValue={donorName}
        onChangeText={(donorName) => setDonorName(donorName)}
        placeholderText="Name"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={contactNumber}
        onChangeText={(contactNumber) => setContactNumber(contactNumber)}
        placeholderText="Contact Number"
        iconType="phone"
        inputMode="tel"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={qty}
        onChangeText={(qty) => setQty(qty)}
        placeholderText="Quantity"
        iconType="calculator"
        inputMode="numeric"
      />

      <FormInput
        labelValue={description}
        onChangeText={(description) => setDescription(description)}
        placeholderText="Description"
        iconType="edit"
        multiline={true}
      />

      <FormButton
        buttonTitle="Add Donation"
        // onPress={() => alert("thada kora")}
        // onPress={() => login(email, password)}
        onPress={addDonation}
      />
    </ScrollView>
  );
};

export default FeedsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: -200,
  },

  subLogoName: {
    fontFamily: "LatoBold",
    fontSize: 28,
    marginBottom: 50,
    color: Colors.primary,
  },

  navButton: {
    marginTop: 15,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "LatoRegular",
  },

  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "LatoRegular",
    color: "grey",
  },
});
