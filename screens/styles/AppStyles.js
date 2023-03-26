import { StyleSheet } from 'react-native';
import Colors from '../utils/Colors';
export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  noPadding: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  fillSpace: {
    flex: 1,
  },
  rightAligned: {
    justifyContent: "flex-end",
  },
  topMargin: {
    marginTop: 16,
  },
  bottomMargin: {
    marginBottom: 16,
  },
  rightMargin: {
    marginRight: 16,
  },
  leftMargin: {
    marginLeft: 16,
  },
  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 30,
    opacity: 0.7,
  },
  lightText: {
    color: "white",
    fontSize: 16,
  },
  header: {
    fontSize: 30,
    alignSelf: "center",
  },
  pageHeader: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "LatoBold",
    marginBottom: 50,
    color: Colors.primary,
    marginTop: -200,
  },
  pageHeader1: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "LatoBold",
    marginBottom: 50,
    color: Colors.primary,
    marginTop: 10,
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8,
  },
  lightTextInput: {
    borderBottomColor: "white",
  },
  darkTextInput: {
    borderBottomColor: "#000000",
  },
  inlineTextButton: {
    color: "#ADD8E6",
    fontSize: 20,
  },
  pressedInlineTextButton: {
    color: "#0000FF",
    opacity: 0.5,
  },
  errorText: {
    color: "red",
  },
  buttons: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.primary,
  },
  buttons1: {
    marginBottom: 10,
    alignItems: "center",
    marginHorizontal: 95,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
  buttons2: {
    //margin: 50,
    alignItems: "center",
    marginHorizontal: 95,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.primary,
  },
  buttons3: {
    marginRight:-20,
    marginBottom:-200,
    alignItems: "center",
    marginHorizontal: 95,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 50,
    
    
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    fontFamily: "LatoRegular",
  },
  renderText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "LatoRegular",
  },
});