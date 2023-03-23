import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { BottomNavigator, RequestCard } from "../components/index";

const data = [
  {
    userId: 1,
    name: "kanaka",
    address: "polhene geddara kumarathunga mw ",
    type: "Food",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incuserIdunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    person: 2,
    contact: "071-3332105",
    createAt: "2023-03-25",
    lati: 6.911903,
    longi: 79.9712009,
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OIHckcpNeno7oFx_pw0izU0o2hQs50p4jw&usqp=CAU",
  },
  {
    userId: 2,
    name: "bhashitha",
    address: "Dickwella",
    type: "Medicine",
    description: "this is a description",
    person: 1,
    contact: "071-3332105",
    createAt: "2023-03-20",
    lati: 37.78825,
    longi: -122.4324,
    userImg:
      "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },

  {
    userId: 3,
    name: "bhashitha",
    address: "Dickwella",
    type: "Transport",
    description: "this is a description",
    person: 2,
    contact: "071-3332105",
    createAt: "2023-03-22",
    lati: 6.911903,
    longi: 79.9712009,
    userImg:
      "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => {
              return (
                <RequestCard
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
