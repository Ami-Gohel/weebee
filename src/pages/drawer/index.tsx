import * as React from "react";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../dashboard";
import ManageCategoryScreen from "../categories";
import { useSelector } from "react-redux";
import AddAttributesScreen from "../addAttributes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, IconButton } from "react-native-paper";
import { Text } from "react-native";
import { CategoriesType } from "../../redux/types/categories";

type RootStackParamList = {
  Dashboard: undefined;
  ManageCategory: { category: string };
  NewCategory: { category: CategoriesType , index:number};
};
const Stack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="ManageCategory"
      //   screenOptions={{ headerShown: false }}
    >
      <Stack.Group
        screenOptions={({ navigation, route }) => ({
          headerLeft: () => (
            <IconButton icon={"menu"} onPress={() => navigation.openDrawer()} />
          ),
          headerTitle: () => <Text>{route.name || route.params.name}</Text>,
        })}
      >
        <Stack.Screen
          name="ManageCategory"
          component={ManageCategoryScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAttribute"
          component={AddAttributesScreen}
          // options={{ headerTitle: "AddAttribute" }}
          // options={{ headerShown: false }}
        //   options={({ navigation, route }) => ({
        //     headerTitle: () => <Text>{route.name || route.params.name}</Text>,
        //     headerLeft: () => (
        //       <IconButton
        //         icon={"menu"}
        //         onPress={() => navigation.openDrawer()}
        //       />
        //     ),
        //   })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { categories } = useSelector((state) => state.categories);
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      {categories?.map((item: CategoriesType) => {
        return (
          <DrawerItem
            label={item?.name}
            onPress={() =>
              props.navigation.navigate("AddAttribute", {
                item: item,
                name: item.name,
              })
            }
            
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function MyDrawer() {
      const { categories } = useSelector((state) => state.categories);

  return (
    <Drawer.Navigator
    >
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen
        name="ManageCategory"
        component={ManageCategoryScreen}
      />
      {categories?.map((item: CategoriesType, index: number) => {
        return (
          <Drawer.Screen
            name={item.name}
            component={AddAttributesScreen}
            initialParams={{ category: item, index:index }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
