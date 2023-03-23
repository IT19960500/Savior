import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FormButton, SocialButton, FormInput } from "../components/index";
import Colors from "../utils/Colors";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = React.useState('');

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage('Passwords do not match');
    } else {
      setValidationMessage('');
    }
    setValue(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          //navigation.navigate("ToDo", { user: userCredential.user});
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subLogoName}>Create an account</Text>
      <Text style={styles.errorText}>{validationMessage}</Text>
      <FormInput
        labelValue={email}
        value={email}
        onChangeText={setEmail}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        value={password}
        onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        value={confirmPassword}
        onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={signUp}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{" "}
        </Text>
        <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
          Privacy Policy
        </Text>
      </View>

      {Platform.OS === "android" ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
          // onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign UP with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
          // onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  errorText: {
    color: 'red',
  },
});
