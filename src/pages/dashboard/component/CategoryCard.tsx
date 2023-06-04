import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/reducer";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../redux/store";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { styles } from "./style";
export default function HomeScreen({ navigation }) {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");

  useEffect(() => {
    console.log("val", value);
  }, [value]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button onPress={navigation.openDrawer} title="Open navigation drawer" /> */}
      <Text>No Category found</Text>
      <Button
        style={styles.button}
        onPress={() => dispatch(increment())}
        mode="contained"
      >
        ADD A CATEGORY
      </Button>
      <TextInput
        label="Email"
        value={text}
        style={{ width: 300 }}
        onChangeText={(text) => setText(text)}
        mode="outlined"
      />
    </View>
  );
}
