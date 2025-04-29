import { useEffect, useState } from "react";
import CustomContainer from "../components/CustomContainer";
import DynamicForm from "../components/DynamicForm";
import { IForm } from "../types/form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<IForm | null>(null);

  const handleFormSubmit = (updatedForm: IForm) => {
    if (!id) return;

    const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
    const updatedForms = {
      ...storedForms,
      [id]: updatedForm,
    };

    localStorage.setItem("forms", JSON.stringify(updatedForms));
    toast.success("Form updated successfully");
  };

  useEffect(() => {
    if (id) {
      const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
      const existingForm = storedForms[id];
      if (existingForm) {
        setForm(existingForm);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  return (
    <CustomContainer>
      <DynamicForm
        isEdit={true}
        form={form || undefined}
        handleFormSubmit={handleFormSubmit}
      />
    </CustomContainer>
  );
};

export default EditFormPage;
