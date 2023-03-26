import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import AppStyles from "../styles/AppStyles";
import { FormButton, SocialButton, FormInput } from "../components";
import { Pressable } from "react-native";

export default function AddTipsModal(props) {
  const [tipsTitle, setTipsTitle] = useState("");
  const [tipsDescription, setTipsDescription] = useState("");

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.pageHeader}>Add Tips</Text>
      <FormInput
        placeholder="Tips Title"
        value={tipsTitle}
        onChangeText={setTipsTitle}
        iconType="edit"
      />
      <FormInput
        placeholder="Tips Description"
        value={tipsDescription}
        onChangeText={setTipsDescription}
        iconType="form"
        multiline={true}
      />
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAligned,
          AppStyles.rightMargin,
        ]}
      >
        <Pressable style={AppStyles.buttons} onPress={props.onClose}>
          <Text style={AppStyles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={AppStyles.buttons}
          onPress={() => {
            props.addTips(tipsTitle, tipsDescription);
            props.onClose();
          }}
        >
          <Text style={AppStyles.buttonText}>Ok</Text>
        </Pressable>
      </View>
    </View>
  );
}
