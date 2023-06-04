import React, { useEffect, useState } from "react";
import { Card, Menu } from "react-native-paper";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import { TextInput, Switch } from "react-native-paper";

import { CategoriesType, field } from "../../../redux/types/categories";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface propType {
  allFields: field[];
  index: number;
  onAddFieldText: (category: string) => void;
  menu: string[];
  title: string;
  item: any;
  onEditCard:(text:  string)=> void
}

export default function PropertyCard(props: propType) {
  const { item, onEditCard } = props;
  const [text, setText] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 
  const onToggleSwitch = (bool) =>{
     onEditCard(bool);
       setIsSwitchOn(!isSwitchOn);

  }
  const { type, lable, value } = item;

  return (
    <>
      {type == "Text" ? (
        <TextInput
          label={lable}
          style={styles.input}
          value={value}
          onSubmitEditing={() => onEditCard(text)}
          onChangeText={(text) => onEditCard(text)}
          mode="outlined"
        />
      ) : type === "Date" ? (
        <TextInput
          label={lable}
          style={styles.input}
          value={value}
          keyboardType="number-pad"
          onChangeText={(text) => onEditCard(text)}
          mode="outlined"
        />
      ) : type == "Number" ? (
        <TextInput
          label={lable}
          style={styles.input}
          value={value}
          keyboardType="number-pad"
          onChangeText={(text) => onEditCard(text)}
          mode="outlined"
        />
      ) : type == "Checkbox" ? (
        <View style={styles.addField}>
          <Switch
            value={value}
            onValueChange={(bool) => onToggleSwitch(bool)}
          />
          <Text>{lable}</Text>
        </View>
      ) : null}
    </>
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
  },
});
