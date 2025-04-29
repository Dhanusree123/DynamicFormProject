import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FieldBuilder from "./FieldBuilder";
import { nanoid } from "nanoid";
import { IFields, IForm } from "../types/form";

type Props = {
  isEdit?: boolean;
  form?: IForm;
  handleFormSubmit: (data: IForm) => void;
};

const DynamicForm = (props: Props) => {
  const { isEdit = false, form, handleFormSubmit } = props;

  const [fields, setFields] = useState<IFields[]>([]);
  const [formValues, setFormValues] = useState<IForm>({
    id: nanoid(),
    formtitle: "",
    path: "",
    fields: [],
  });

  const handleFields = (updatedFields: IFields[]) => {
    setFields(updatedFields);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedForm: IForm = {
      ...formValues,
      fields,
    };
    handleFormSubmit(updatedForm);
    console.log(updatedForm);
  };

  useEffect(() => {
    if (isEdit && form) {
      setFormValues({
        id: form.id,
        formtitle: form.formtitle,
        path: form.path,
        fields: form.fields,
      });
      setFields(form.fields);
    }
  }, [isEdit, form]);

  return (
    <Card
      sx={{
        p: 7,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" mb={5}>
        {isEdit ? "Edit Form" : "Create New Form"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Form Title"
            name="formtitle"
            fullWidth
            required
            value={formValues.formtitle}
            onChange={handleChange}
          />

          <TextField
            label="Path"
            name="path"
            fullWidth
            required
            value={formValues.path}
            onChange={handleChange}
          />

          <FieldBuilder
            fields={fields}
            handleFields={handleFields}
            isEdit={isEdit}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={fields.length == 0}
            sx={{ mt: 2 }}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default DynamicForm;
