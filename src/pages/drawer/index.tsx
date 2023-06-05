import * as React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../dashboard";
import ManageCategoryScreen from "../categories";
import { useSelector } from "react-redux";
import AddAttributesScreen from "../addAttributes";

import { CategoriesType } from "../../redux/types/categories";

type RootStackParamList = {
  Dashboard: undefined;
  ManageCategory: { category: string };
  NewCategory: { category: CategoriesType , index:number};
};


const Drawer = createDrawerNavigator<RootStackParamList>();

export default function MyDrawer() {
      const { categories } = useSelector((state) => state.categories);

  return (
    <Drawer.Navigator>
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
