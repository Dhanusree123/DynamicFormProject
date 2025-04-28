/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import CustomContainer from "../components/CustomContainer";
import DynamicForm from "../components/DynamicForm";
import { IForm } from "../types/form";
import { nanoid } from "nanoid";

const CreateFormPage = () => {
  const [forms, setForms] = useState<IForm[]>([]);

  const handleFormSubmit = (formData: IForm) => {
    const id = nanoid();
    const newForm = { ...formData, id };

    const existingForms = JSON.parse(localStorage.getItem("forms") || "{}");
    const updatedForms = { ...existingForms, [id]: newForm };
    localStorage.setItem("forms", JSON.stringify(updatedForms));

    setForms(Object.values(updatedForms));
  };

  return (
    <CustomContainer>
      <DynamicForm handleFormSubmit={handleFormSubmit} />
    </CustomContainer>
  );
};

export default CreateFormPage;
