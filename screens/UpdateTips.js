import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import AppStyles from "../styles/AppStyles";
import { Pressable } from "react-native";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FormInput } from "../components";

const UpdateTips = ({ route, navigation }) => {
  const {
    id,
    tips_title,
    tips_description,
  } = route.params;

  console.log(id);

  console.log(tips_title);

  const [tipsTitle, setTipsTitile] = useState("");

  const [tipsDescription, setTipsDescription] = useState("");

  let updateList = () => {
    const tipsRef = doc(db, "tips_list", id);
    setDoc(tipsRef, { tips_title: tipsTitle }, { merge: true });
    setDoc(tipsRef, { tips_description: tipsDescription }, { merge: true });
  };

  const updateTips = async () => {
    if (!tipsTitle || !tipsDescription) {
      setIsShow(true);
      setAlertMsg("Please provide all values");
      setIsDangerous(true);
      clear();
      return;
    }

    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Title"
          value={tipsTitle}
          onChangeText={setTipsTitile}
          iconType="edit"
        />
        <FormInput
          placeholder="Description"
          value={tipsDescription}
          onChangeText={setTipsDescription}
          iconType="form"
        />
        <Pressable
          style={AppStyles.buttons2}
          onPress={() => {
            updateList(id);
            updateTips()
          }}>
          <Text style={AppStyles.buttonText}>Update</Text>
        </Pressable>
      </View>
    );
  };

  export default UpdateTips;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
