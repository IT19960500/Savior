import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
    LatoBlackItalic: require("../assets/fonts/Lato-BlackItalic.ttf"),
    LatoItalic: require("../assets/fonts/Lato-Italic.ttf"),
    Courgette: require("../assets/fonts/Courgette-Regular.ttf"),
  });
