export  type CategoriesType = {
  name: string;
  fields: field[];
  titleField: string;
  categoryItems:[]
};

export type field = {
    fieldName: string;
    type: string

}
export interface UpdateCategoriesType {
  index: number;
  categoryObj: CategoriesType;
}