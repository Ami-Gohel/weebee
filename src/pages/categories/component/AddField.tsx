import React, { useState } from "react";
import { Card } from "react-native-paper";

import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { TextInput } from "react-native-paper";
import {
  IconButton,
  MD3Colors,
  Menu,
  Divider,
  Button,
} from "react-native-paper";
import MenuItems from "./MenuItems";
import { CategoriesType, field } from "../../../redux/types/categories";
import { updateCategory } from "../../../redux/reducers/categories";
interface propsType {
  categoryItem: CategoriesType;
  index: number;
  fieldEl: field;
  onDeleteMenu: () => void;
  onEditField: (category: string, type: string) => void;
}

export default function AddField(props: propsType) {
  const { onDeleteMenu, categoryItem, index, fieldEl, onEditField } = props;

  const [category, setCategory] = useState(fieldEl?.fieldName || "Text");
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("Text");
  const [visibleMenu, setEditMenuVisible] = React.useState(false);
  const dispatch = useDispatch();
  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };
  const onChooseEditMenu = (item: string) => {
    setType(item);
    onEditField(category, item);

    closeEditMenu();
  };
  const openEditMenu = () => {
    setEditMenuVisible(true);
  };

  const closeEditMenu = () => setEditMenuVisible(false);

  return (
    <View style={styles.main}>
      <TextInput
        label={"TEXT"}
        style={styles.input}
        value={category}
        onChangeText={(text) => {
          setCategory(text);
          onEditField(text, "");
        }}
        mode="outlined"
        onEndEditing={() => onEditField(category, "")}
      />

      <MenuItems
        visible={visibleMenu}
        closeMenu={closeEditMenu}
        onChooseMenu={(item: string) => onChooseEditMenu(item)}
        onDismiss={closeEditMenu}
        openMenu={openEditMenu}
        anchor={
          <Button style={styles.menuButton} onPress={openEditMenu} mode="text">
            {fieldEl?.type?.toUpperCase()}
          </Button>
        }
      />

      <IconButton
        icon="delete"
        iconColor={MD3Colors.primary50}
        size={20}
        onPress={onDeleteMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  label: {
    borderColor: MD3Colors.primary50,
    borderWidth: 0.6,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  menuButton: { width: 70 },
  main: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: { minWidth: "70%" },
  addButton: {
    alignSelf: "center",
    width: "50%",
    borderRadius: 0,
  },
  addMenu: {
    alignSelf: "center",
    borderRadius: 0,
  },
  addField: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
