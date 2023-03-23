import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FormButton, SocialButton, FormInput } from "../components/index";
import Colors from "../utils/Colors";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

  if (auth.currentUser) {
    navigation.navigate("Home");
  }

  const [errorMessage, setErrorMessage] = React.useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Home", { user: userCredential.user });
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setErrorMessage('Please enter valid credentials')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/saviour-icon.png")}
        style={styles.logo}
      />

      <Text style={styles.logoName}>SAVIOR</Text>
      <Text style={styles.subLogoName}>Disaster Management Community </Text>
      <Text style={[styles.errorText]}>{errorMessage}</Text>

      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        value={password}
        onChangeText={setPassword}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={login}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === "android" ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
          // onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
          // onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.bgWhite,
  },

  logo: {
    height: 130,
    width: 130,
    resizeMode: "cover",
  },

  logoName: {
    fontFamily: "Courgette",
    fontSize: 28,
    marginBottom: 3,
    color: Colors.primary,
  },

  subLogoName: {
    fontFamily: "LatoBlackItalic",
    fontSize: 18,
    marginBottom: 50,
    color: Colors.secondary,
  },

  navButton: {
    marginTop: 15,
  },

  forgotButton: {
    marginVertical: 35,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "LatoRegular",
  },
  errorText: {
    color: 'red',
  },
});
