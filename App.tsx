import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MyDrawer from "./src/pages/drawer";
import "react-native-gesture-handler";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#603fef",
    accent: "white",
  },
};



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <MyDrawer />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
