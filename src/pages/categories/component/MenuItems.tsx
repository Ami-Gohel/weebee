import React, { FC, useState } from "react";
import { Card } from "react-native-paper";

import { StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native-paper";
import {
  IconButton,
  MD3Colors,
  Menu,
  Divider,
  Button,
} from "react-native-paper";
type menuProps = {
  anchor: FC;
  visible: boolean;
  closeMenu: () => void;
  onChooseMenu: (item: string, index:number)=> void;
};
export default function MenuItems(props: menuProps) {
  const [category, setCategory] = useState("New Category");
  // const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("Text");

  const menu = ["Date", "Text", "Checkbox", "Number"];

  // const onChooseMenu = (item: string) => {
  //   setType(item);
  //   closeMenu();
  // };
  const { visible, anchor, closeMenu, onChooseMenu } = props;
  return (
    <>
      <Menu style={ { maxWidth:100}} visible={visible} onDismiss={closeMenu} anchor={anchor}>
        {menu.map((item, index) => {
          return (
            <Menu.Item
              key={index?.toString()}
              onPress={() => onChooseMenu(item, index)}
              title={item}
            />
          );
        })}
      </Menu>
     
    </>
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
    // height: "100%",
  },
  main: {
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  input: { minWidth: "70%" },
});
