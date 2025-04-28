export type FieldConfig  = {
    label: string;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    option?: string[];
}
export type IFields = {
    id: string;
    type: FieldType;
    fieldConfig: FieldConfig;
    // label: string;
    // required: boolean;
    // minLength?: number;
    // maxLength?: number;
    // min?: number;
    // max?: number;
    // option?: string[];
};

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "switch"
  | "chip"
  | "checkbox"
  | "radiogroup"
  | "select"
  ;


export type IForm = {
    id: string;
    formtitle: string;
    path: string;
    fields: IFields[];
};
