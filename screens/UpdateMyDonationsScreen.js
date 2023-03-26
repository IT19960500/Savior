import React, { useState } from "react";

import { Text, TextInput, View, StyleSheet } from "react-native";
import AppStyles from "../styles/AppStyles";
import { Pressable } from "react-native";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FormInput } from "../components";

const UpdateMyDonationsScreen = ({ route, navigation }) => {
  const {
    id,
    donation_Type,
    donatorName,
    contactNumber,
    description,
    quantity,
  } = route.params;

  console.log(id);

  console.log(donatorName);

  const [donationType, setDonationType] = useState("");

  const [donationName, setDonationName] = useState("");

  const [donationContact, setDonationContact] = useState("");

  const [donationDescription, setDonationDescription] = useState("");

  const [donationQuantity, setDonationQuantity] = useState("");

  let updateList = () => {
    const donationRef = doc(db, "my_donations", id);
    setDoc(donationRef, { donation_type: donationType }, { merge: true });
    setDoc(donationRef, { name: donationName }, { merge: true });
    setDoc(donationRef, { contact_number: donationContact }, { merge: true });
    setDoc(
      donationRef,
      { donation_description: donationDescription },
      { merge: true }
    );
    setDoc(donationRef, { quantity: donationQuantity }, { merge: true });
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
                value={donatorName}
            />
            <Text>asd</Text> */}

      <FormInput
        placeholder="type"
        value={donation_Type}
        onChangeText={setDonationType}
      />
      <FormInput
        placeholder="name"
        value={donatorName}
        onChangeText={setDonationName}
      />
      <FormInput
        placeholder="tel"
        value={contactNumber}
        onChangeText={setDonationContact}
      />
      <FormInput
        placeholder="description"
        multiline={true}
        value={description}
        onChangeText={setDonationDescription}
      />
      <FormInput
        placeholder="quantity"
        multiline={true}
        value={quantity}
        onChangeText={setDonationQuantity}
      />

      <Pressable style={AppStyles.buttons2} onPress={() => updateList(id)}>
        <Text style={AppStyles.buttonText}>Update</Text>
      </Pressable>
    </View>
  );
};

export default UpdateMyDonationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
