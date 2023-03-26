import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { auth, db } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";

import { RequestCard } from "../../components";
import Colors from "../../utils/Colors";

const MyRequestScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserSpecificRequest();
  }, [data]);

  //get user specific request data
  const getUserSpecificRequest = async () => {
    const result = query(
      collection(db, "request"),
      where("userId", "==", auth.currentUser.uid)
      // orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(result);

    let reqData = [];

    querySnapshot.forEach((doc) => {
      let result = doc.data();
      result.id = doc.id;
      reqData.push(result);
    });

    setData(reqData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>My All Requests</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <RequestCard
              id={item.id}
              userId={item.userId}
              image={item.userImg}
              userName={item.name}
              address={item.address}
              type={item.type}
              description={item.description}
              person={item.person}
              contact={item.contact}
              createAt={item.createAt}
              lati={item.lati}
              longi={item.longi}
              showEditPanel={true}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

export default MyRequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  titleText: {
    color: Colors.black,
    fontSize: 23,
    fontFamily: "LatoBold",
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    paddingVertical: 15,
  },
});
