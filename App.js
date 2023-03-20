import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";

import useFonts from "./utils/useFonts";
import Provider from "./navigation";

function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return <Provider />;
}

export default App;
