import {
  View,
  Text,
  Button,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  Pressable
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import { db} from "../../config/firebase";
import { auth } from "../../config/firebase";
import React, {useState} from "react";
import AddTipsModal from "../../components/AddTipsModal";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { Card } from "react-native-elements/dist/card/Card";
import { FAB } from "react-native-elements";
import { FormButton } from "../../components";


export default function MyTipsScreen({ navigation, route }) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [tips, setTips] = React.useState([]);
  const [tipsTitle, setTipsTitle] = useState("");
  const [tipsDescription, setTipsDescription] = useState("");
  const [img, setImg] = useState("");

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showTipList()}
        <FAB
          style={AppStyles.buttons3}
          title="+"
          color="red"
          placement="right"
          size="large"
          onPress={() => setModalVisible(true)}
        />

      </View>
    );
  };

  let loadTipsList = async () => {
    const q = query(
      collection(db, "tips_list"),
      where("userId", "==", auth.currentUser.uid)
    );

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

          <FormButton
            style={AppStyles.buttons1}
            buttonTitle="Update"
            onPress={() =>
              navigation.navigate("UpdateTips", {
                id: item.id,
                tips_title: item.tips_title,
                tips_description: item.tips_description,
              })
            }
          >
            <Text style={AppStyles.buttonText}>Update</Text>
          </FormButton>
          <FormButton
            style={AppStyles.buttons2}
            onPress={() => deleteTips(item.id)}
            buttonTitle="Delete"
          >
          </FormButton>
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

  let addTips = async (tipsTitle,tipsDescription) => {
    let tipsSave = {
      tips_title: tipsTitle,
      tips_description: tipsDescription,
      
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "tips_list"), tipsSave);

    tipsSave.id = docRef.id;

    let updatedTips = [...tips];
    updatedTips.push(tipsSave);

    setTips(updatedTips);
  };

  let deleteTips = async (tipId) => {
    await deleteDoc(doc(db, "tips_list", tipId));
    let updatedTips = [...tips].filter((item) => item.id != tipId);
    setTips(updatedTips);
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
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddTipsModal
          onClose={() => setModalVisible(false)}
          addTips={addTips}
        />
      </Modal>
      <Text style={AppStyles.pageHeader1}>My Tips</Text>
      {showContent()}
    </SafeAreaView>
  );
}