import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, IconButton, MD3Colors } from "react-native-paper";
import { styles } from "./style";
import { ScrollView, Text } from "react-native";

import { addCategory, updateCategory } from "../../redux/reducers/categories";
import PropertyCard from "./component/PropertyCard";
import { CategoriesType, field, fieldType } from "../../redux/types/categories";

export default function AddAttributesScreen(
  {  route  },
  props: CategoriesType
) {
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [allFields, setAllFields] = useState(
    categories?.[route?.params?.index]?.fields || []
  );
 
  useEffect(() => {
    setAllFields(categories?.[route?.params?.index]?.fields);
  }, [categories?.[route?.params?.index]?.fields]);
  const onAddCategory = () => {
    let fieldsSet = [...categories?.[route?.params?.index]?.categoryItems];

    let a = [];
    allFields?.forEach((fieldVal: field) => {
      let obj = {};
      obj["value"] = "";
      obj["type"] = fieldVal?.type;
      obj["lable"] = fieldVal?.fieldName?.trim();

      a.push(obj);
    });

    let categoryObj = {
      ...categories?.[route?.params?.index],
      categoryItems: [...fieldsSet, a],
    };
    dispatch(updateCategory({ index: route.params.index, categoryObj }));
  };
  const onEditCard = (
    item: fieldType[],
    index: number,
    text: string,
    cardIndex: number
  ) => {
    let fields = [...categories?.[route?.params?.index]?.categoryItems];

    let itemNew = [...item];
    let obj = { ...item[cardIndex], value: text };
    itemNew[cardIndex] = obj;

    fields[index] = itemNew;
    let categoryObj = {
      ...categories?.[route?.params?.index],
      categoryItems: fields,
    };
    dispatch(updateCategory({ index: route.params.index, categoryObj }));
  };

  const onRemoveCard = (index: number) => {
    let fields = [...categories?.[route?.params?.index]?.categoryItems];

    fields.splice(index, 1);
    let categoryObj = {
      ...categories?.[route?.params?.index],
      categoryItems: fields,
    };
    dispatch(updateCategory({ index: route.params.index, categoryObj }));
  };
 
  return (
    <>
      <ScrollView style={styles.main}>
        {categories?.[route?.params?.index]?.categoryItems?.map(
          (item, index) => {
            const i = item.findIndex((kkk) => {
              return (
                categories?.[route?.params?.index]?.titleField == kkk.lable
              );
            });
            return (
              <Card style={styles.cardMain} key={index?.toString()}>
                <Card.Content>
                  <Text style={styles.title}>
                    {i >= 0 ? item[i]?.value : ""}
                  </Text>

                  {item?.map((card, cardIndex) => {
                    return (
                      <PropertyCard
                        key={index?.toString()}
                        allFields={allFields}
                        title={"card"}
                        item={card}
                        onEditCard={(text: string) => {
                          onEditCard(item, index, text, cardIndex);
                        }}
                      />
                    );
                  })}
                </Card.Content>
                <Button icon="delete" onPress={() => onRemoveCard(index)}>
                  Remove
                </Button>
              </Card>
            );
          }
        )}
      </ScrollView>
      <Button style={styles.button} onPress={onAddCategory} mode="contained">
        ADD NEW ITEM
      </Button>
    </>
  );
}
