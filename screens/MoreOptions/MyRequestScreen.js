import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { RequestCard } from "../../components";
import Colors from "../../utils/Colors";

const data = [
  {
    id: 1,
    name: "kanaka",
    location: "polhene geddara kumarathunga mw ",
    type: "Food",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    person: 2,
    contact: "071-3332105",
    createAt: "2023-03-25",
    lati: 6.911903,
    longi: 79.9712009,
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OIHckcpNeno7oFx_pw0izU0o2hQs50p4jw&usqp=CAU",
  },
  {
    id: 2,
    name: "bhashitha",
    location: "Dickwella",
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
    id: 3,
    name: "bhashitha",
    location: "Dickwella",
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

const MyRequestScreen = ({ navigation }) => {
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
              image={item.userImg}
              userName={item.name}
              location={item.location}
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
