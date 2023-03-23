import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { auth, db } from "../config/firebase";
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

import { BottomNavigator, RequestCard } from "../components/index";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllRequest();
  }, [data]);

  //get all request
  const getAllRequest = async () => {
    const result = query(
      collection(db, "request"),
      orderBy("timestamp", "desc")
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <RequestCard
                  id={item.id}
                  userId={item.userId}
                  image={item.userImg}
                  userName={item.userName}
                  address={item.address}
                  type={item.type}
                  description={item.description}
                  person={item.person}
                  contact={item.contact}
                  createAt={item.createAt}
                  lati={item.lati}
                  longi={item.longi}
                  showEditPanel={false}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      </ScrollView>

      <BottomNavigator navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    wuserIdth: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#F7F8FA",
  },
});
