import React, { useRef, useState } from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Switch } from "react-native-paper";

import { field } from "../../../redux/types/categories";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

interface propType {
  allFields: field[];
  index: number;
  onAddFieldText: (category: string) => void;
  menu: string[];
  title: string;
  item: any;
  onEditCard: (text: string) => void;
}

export default function PropertyCard(props: propType) {
  const { item, onEditCard } = props;
  const [text, setText] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isDate, setIDate] = React.useState(false);

  const inputref = useRef();
  const onToggleSwitch = (bool) => {
    onEditCard(bool);
    setIsSwitchOn(!isSwitchOn);
  };
  const { type, lable, value } = item;

  const onChange = (event, selectedDate) => {
    setIDate(false);
    onEditCard(selectedDate.toUTCString());
  };
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
        <>
          <Button
            onPress={() => setIDate(true)}
            mode="outlined"
            style={styles.bottonDate}
          >
            {value
              ? moment(value).format("DD-MM-YYYY")
              : moment(new Date()).format("DD-MM-YYYY")}
          </Button>
          {isDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value ? new Date(value) : new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
              minimumDate={new Date()}
              maximumDate={
                new Date(moment().add(6, "months").format("YYYY-MM-DD"))
              }
              style={styles.calendar}
              onTouchStart={() => inputref?.current?.blur()}
            />
          )}
        </>
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
          <Text>
            {"  "}
            {lable}
          </Text>
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
  calendar: {
    alignSelf: "flex-start",
    marginTop: 20,
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
  bottonDate: {
    borderRadius: 0,
    width: "100%",
    marginTop: 10,
    alignItems: "flex-start",
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
