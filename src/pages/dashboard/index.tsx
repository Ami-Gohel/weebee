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
import ManageCategoryScreen from "../categories";
export default function HomeScreen({ navigation }) {
  const { categories } = useSelector((state) => state.categories);


  const  onAddCategory = ()=>{
    navigation.navigate('ManageCategory')
  }
  if (categories?.length > 0){
    return <ManageCategoryScreen navigation={navigation} />;}

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No Category found</Text>
        <Button style={styles.button} onPress={onAddCategory} mode="contained">
          ADD A CATEGORY
        </Button>
      </View>
    );
  }

