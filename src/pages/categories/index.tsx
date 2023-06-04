import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import CategoryCard from "./component/CategoryCard";
import { styles } from "./style";
import { ScrollView, View } from "react-native";
import { CategoriesType } from "../../redux/types/categories";

import { addCategory, updateCategory } from "../../redux/reducers/categories";

export default function ManageCategoryScreen({ navigation }) {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [titleField, setTitleField] = useState("");

  const [menuList, setMenuList] = useState([]);
  
  const onAddCategory = () => {
    dispatch(
      addCategory({
        name: "New Category" + categories?.length?.toString(),
        fields: [{ fieldName: "Text", type: "Text" }],
        titleField: titleField?.toUpperCase(),
        categoryItems: [],
      })
    );
  };
  
  const onChangeTitleField = (
    index: number,
    item: CategoriesType,
    text: string
  ) => {

    let categoryObj = { ...item, titleField: text };
    dispatch(updateCategory({ index, categoryObj }));
   
  };
  const onAddFieldText = (
    index: number,
    item: CategoriesType,
    name: string
  ) => {
    let categoryObj = { ...item, name };
    dispatch(updateCategory({ index, categoryObj }));
    
  };

  return (
    <>
      <ScrollView style={styles.main}>
        {categories?.map((item: CategoriesType, index: number) => {
          return (
            <CategoryCard
              onAddFieldText={(category: string) =>
                onAddFieldText(index, item, category)
              }
              menu={menuList}
              item={item}
              index={index}
              setTitleField={(text: string) =>
                onChangeTitleField(index, item, text)
              }
            />
          );
        })}
      </ScrollView>
      <Button style={styles.button} onPress={onAddCategory} mode="contained">
        ADD A CATEGORY
      </Button>
    </>
  );
}
