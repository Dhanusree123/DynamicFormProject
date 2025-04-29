import { useState } from "react";
import CustomContainer from "../components/CustomContainer";
import DynamicForm from "../components/DynamicForm";
import { IForm } from "../types/form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

const CreateFormPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<IForm[]>([]);

  const handleFormSubmit = (formData: IForm) => {
    const id = nanoid();
    const newForm = { ...formData, id };

    const existingForms = JSON.parse(
      localStorage.getItem("forms") || "{}"
    ) as IForm[];

    const isDuplicate = Object.values(existingForms).find(
      (form) =>
        form.formtitle === newForm.formtitle || form.path === newForm.path
    );

    if (isDuplicate) {
      toast.error(
        "Form title or path already exists. Please choose a unique title or path."
      );
      return;
    }
    const updatedForms = { ...existingForms, [id]: newForm } as IForm[];
    localStorage.setItem("forms", JSON.stringify(updatedForms));

    setForms(Object.values(updatedForms));
    toast.success("Form Created Successfully");
    navigate("/");
  };

  console.log(forms);

  return (
    <CustomContainer>
      <DynamicForm handleFormSubmit={handleFormSubmit} />
    </CustomContainer>
  );
};

export default CreateFormPage;
