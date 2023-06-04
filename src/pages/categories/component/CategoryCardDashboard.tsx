import React, { useEffect, useState } from "react";
import { Card, Menu } from "react-native-paper";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "react-native-paper";
import AddField from "./AddField";
import MenuItems from "./MenuItems";
import { CategoriesType, field } from "../../../redux/types/categories";
import {
  deleteCategory,
  updateCategory,
} from "../../../redux/reducers/categories";
interface propType {
  item: CategoriesType;
  index: number;
  onAddFieldText: (category: string) => void;
  menu: string[];
  setTitleField: (text: string) => void;
}

export default function CategoryCard(props: propType) {
  const { item, onAddFieldText, index, menu, setTitleField } = props;

  const [category, setCategory] = useState(item?.name);
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("Text");
  // const [titleField, setTitleField] = useState('');

  const [visibleMenu, setTitleMenuVisible] = React.useState(false);
  const dispatch = useDispatch();
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };
  const openTitleMenu = () => {
    setTitleMenuVisible(true);
  };

  const closeTitleMenu = () => {
    setTitleMenuVisible(false);
  };

  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    const menu = item?.fields?.map((el: field) => {
      return el?.fieldName;
    });
    setMenuList(menu);
  }, [item]);
  const onChooseMenu = (text: string) => {
    setType(text);
    let fieldArr = [...item?.fields] || [];
    let field = { fieldName: "Text", type: text };
    fieldArr = [...fieldArr, field];
    let categoryObj = { ...item, fields: fieldArr, name: category };
    dispatch(updateCategory({ index, categoryObj }));
    closeMenu();
  };
  const onChooseTitleMenu = (text: string) => {
    setTitleField(text);
    closeTitleMenu();
  };
  const onDeleteMenu = (i: number) => {
    let fieldArr = [...item?.fields] || [];

    fieldArr.splice(i, 1);
    let categoryObj = { ...item, fields: fieldArr };

    dispatch(updateCategory({ index, categoryObj }));
    closeMenu();
  };
  const onEditField = (i: number, text: string, type = "") => {
    let fieldArr = [...item?.fields] || [];
    const t = type?.length > 0 ? type : fieldArr?.[i]?.type;
    fieldArr[i] = {
      ...fieldArr?.[i],
      fieldName: text,
      type: type?.length > 0 ? type : fieldArr?.[i]?.type,
    };

    let categoryObj = { ...item, fields: fieldArr };

    dispatch(updateCategory({ index, categoryObj }));
    closeMenu();
  };
  const delCategory = () => {
    dispatch(deleteCategory(index));
  };
  return (
    <Card style={styles.main}>
      <Card.Content>
        <Text style={styles.title}>{item?.name}</Text>
        <TextInput
          label="Category Name"
          style={styles.input}
          onEndEditing={() => onAddFieldText(category)}
          value={category}
          onChangeText={(text) => setCategory(text)}
          mode="outlined"
        />
        {item?.fields?.map((fieldEl, i) => {
          return (
            <AddField
              categoryItem={item}
              fieldEl={fieldEl}
              index={index}
              onDeleteMenu={() => onDeleteMenu(i)}
              onEditField={(text: string, type: string) =>
                onEditField(i, text, type)
              }
            />
          );
        })}
        <Menu
          visible={visibleMenu}
          onDismiss={closeTitleMenu}
          anchor={
            <Button
              style={styles.button}
              onPress={openTitleMenu}
              mode="contained"
            >
              ADD NEW TITLE{" "}
              {item.titleField.toUpperCase()}
            </Button>
          }
        >
          {menuList.map((item, index) => {
            return (
              <Menu.Item
                key={index?.toString()}
                onPress={() => onChooseTitleMenu(item)}
                title={item}
              />
            );
          })}
        </Menu>

        <View style={styles.addField}>
          <MenuItems
            visible={visible}
            closeMenu={closeMenu}
            onChooseMenu={(text: string) => onChooseMenu(text)}
            onDismiss={closeMenu}
            openMenu={openMenu}
            anchor={
              <Button style={styles.addMenu} onPress={openMenu} mode="outlined">
                ADD NEW FIELD
              </Button>
            }
          />
          <Button
            onPress={delCategory}
            icon={"delete"}
            style={{ width: "40%", marginRight: 0 }}
            mode="text"
          >
            Remove
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",

    marginBottom: 10,
  },

  main: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
  },
  button: {
    alignSelf: "center",

    marginTop: 28,
    width: "80%",
  },
  addButton: {
    alignSelf: "center",
    width: "50%",
    borderRadius: 0,
  },
  addMenu: {
    alignSelf: "center",
    borderRadius: 0,
  },
  input: { width: "100%" },
  addField: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
