import React, { FC, } from "react";

import {Menu} from "react-native-paper";
type menuProps = {
  anchor: FC;
  visible: boolean;
  closeMenu: () => void;
  onChooseMenu: (item: string, index:number)=> void;
};
export default function MenuItems(props: menuProps) {

  const menu = ["Date", "Text", "Checkbox", "Number"];

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

