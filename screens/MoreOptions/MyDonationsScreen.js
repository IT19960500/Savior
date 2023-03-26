import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import AppStyles from "../../styles/AppStyles";
import { Card } from "react-native-elements";
import { Pressable } from "react-native";
import { FAB } from "react-native-elements";

export default function MyDonationsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [donationList, setDonationList] = useState([]);

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showDonationList()}
        {/* <Pressable
          style={AppStyles.buttons}
          onPress={() => navigation.navigate("Feeds")}
        >
          <Text style={AppStyles.buttonText}>Add Donations</Text>
        </Pressable> */}
        <FAB
          style={AppStyles.buttons3}
          title="+"
          color="red"
          placement="right"
          size="large"
          onPress={() => navigation.navigate("Feeds")}
        />

        {/* <Button
            //style={AppStyles.buttons}
            title="Add ToDo"
            onPress={() => setModalVisible(true)}
            color="green"
          /> */}
      </View>
    );
  };

  let loadDonationList = async () => {
    const q = query(
      collection(db, "my_donations"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let donationList = [];
    querySnapshot.forEach((doc) => {
      let donation = doc.data();
      donation.id = doc.id;
      donationList.push(donation);
    });

    setDonationList(donationList);
    setIsLoading(false);
    setIsRefreshing(false);
    console.log(donationList);
  };

  if (isLoading) {
    loadDonationList();
  }

  let renderDonationItem = ({ item }) => {
    return (
      <ScrollView>
        <Card>
          <View
            style={[
              AppStyles.rowContainer,
              AppStyles.rightMargin,
              AppStyles.leftMargin,
            ]}
          >
            <View style={AppStyles.fillSpace}>
              <Text style={AppStyles.renderText}>Donation Type:</Text>
              <Text>{item.donation_type}</Text>
              <Text style={AppStyles.renderText}>Donor Name:</Text>
              <Text>{item.name}</Text>
              <Text style={AppStyles.renderText}>Contact Number:</Text>
              <Text>{item.contact_number}</Text>
              <Text style={AppStyles.renderText}>Description:</Text>
              <Text>{item.donation_description}</Text>
              <Text style={AppStyles.renderText}>Quantity:</Text>
              <Text>{item.quantity}</Text>
            </View>
          </View>

          <Pressable
            style={AppStyles.buttons1}
            onPress={() =>
              navigation.navigate("UpdateMyDonationsScreen", {
                id: item.id,
                donation_Type: item.donation_type,
                donatorName: item.name,
                contactNumber: item.contact_number,
                description: item.donation_description,
                quantity: item.quantity,
              })
            }
          >
            <Text style={AppStyles.buttonText}>Update</Text>
          </Pressable>

          <Pressable
            style={AppStyles.buttons2}
            onPress={() => deleteDonations(item.id)}
          >
            <Text style={AppStyles.buttonText}>Delete</Text>
          </Pressable>
        </Card>
      </ScrollView>
    );
  };

  let showDonationList = () => {
    return (
      <FlatList
        data={donationList}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadDonationList();
          setIsRefreshing(true);
        }}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  let deleteDonations = async (donationId) => {
    await deleteDoc(doc(db, "my_donations", donationId));
    let updatedDonations = [...donationList].filter(
      (item) => item.id != donationId
    );
    setDonationList(updatedDonations);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAligned,
          AppStyles.rightMargin,
          AppStyles.topMargin,
        ]}
      ></View>
      <Text style={AppStyles.pageHeader1}>My Donations</Text>
      {showContent()}
    </SafeAreaView>
  );
}

// export default MyDonationsScreen;
