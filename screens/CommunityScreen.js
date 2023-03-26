import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
//import { View, Text } from "react-native";
import React, { useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../config/firebase";
import AppStyles from "../styles/AppStyles";
import { Card } from "react-native-elements";

export default function CommunityScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [donationList, setDonationList] = React.useState([]);

  let showContent = () => {
    return (
      <ScrollView>
        <Card>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              showDonationList()
            )}
          </View>
        </Card>
      </ScrollView>
    );
  };

  let loadDonationList = async () => {
    const q = query(collection(db, "my_donations"));

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
      <Text style={AppStyles.pageHeader1}>Donations</Text>
      {showContent()}
    </SafeAreaView>
  );
}
