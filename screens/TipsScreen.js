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
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import AppStyles from "../styles/AppStyles";
import { Card } from "react-native-elements";

export default function TipsScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [tips, setTips] = React.useState([]);

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showTipList()}
      </View>
    );
  };

  let loadTipsList = async () => {
    const q = query(collection(db, "tips_list"));

    const querySnapshot = await getDocs(q);
    let tips = [];
    querySnapshot.forEach((doc) => {
      let tip = doc.data();
      tip.id = doc.id;
      tips.push(tip);
    });

    setTips(tips);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadTipsList();
  }

  let renderTipItem = ({ item }) => {
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
              <Text style={AppStyles.renderText}>{item.tips_title}</Text>
              <Text>{item.tips_description}</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    );
  };

  let showTipList = () => {
    return (
      <FlatList
        data={tips}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadTipsList();
          setIsRefreshing(true);
        }}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
      />
    );
  };


  let deleteTips = async (tipId) => {
    await deleteDoc(doc(db, "tips_list", tipId));
    let updatedTips = [...tips].filter((item) => item.id != tipId);
    setTips(updatedTips);
  };

  return (
    <SafeAreaView>   
      <Text style={AppStyles.pageHeader1}>Tips</Text>
      {showContent()}
    </SafeAreaView>
  );
}

