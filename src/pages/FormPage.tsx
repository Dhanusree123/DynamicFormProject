/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  FormControl,
  Button,
  Switch,
  Typography,
  Autocomplete,
  Card,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IFields, IForm } from "../types/form";
import CustomContainer from "../components/CustomContainer";
import { toast } from "sonner";

const FormPage = () => {
  const { path } = useParams();
  const [fields, setFields] = useState<IFields[]>([]);
  const [title, setTitle] = useState("");
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const today = dayjs();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
    const formsLists = Object.values(storedForms) as IForm[];
    const reqForm = formsLists.find((f) => f.path === path);
    if (reqForm) {
      setFields(reqForm.fields);
      setTitle(reqForm.formtitle);
    }
  }, [path]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: IFields) => {
    const { type, fieldConfig, id } = field;

    switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <Box key={id}>
            <Typography variant="body1" mt={2}>
              {fieldConfig.label}
            </Typography>
            <TextField
              label={fieldConfig.label}
              type={type}
              fullWidth
              margin="normal"
              slotProps={{
                htmlInput: {
                  minLength: fieldConfig.minLength,
                  maxLength: fieldConfig.maxLength,
                  min: fieldConfig.min,
                  max: fieldConfig.max,
                },
              }}
              value={formValues[id] || ""}
              onChange={(e) => handleFieldChange(id, e.target.value)}
            />
          </Box>
        );

      case "date":
        return (
          <LocalizationProvider key={id} dateAdapter={AdapterDayjs}>
            <Box margin="normal">
              <Typography variant="body1" mt={2} mb={1}>
                {fieldConfig.label}
              </Typography>
              <DatePicker
                sx={{ width: "100%" }}
                value={formValues[id] ? dayjs(formValues[id]) : today}
                onChange={(newValue) => {
                  const date = newValue ? newValue.toDate() : "";
                  handleFieldChange(id, date);
                }}
                disableFuture
                views={["year", "month", "day"]}
              />
            </Box>
          </LocalizationProvider>
        );

      case "switch":
        return (
          <Box key={id}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={formValues[id] || false}
                    onChange={(e) => handleFieldChange(id, e.target.checked)}
                  />
                }
                label={fieldConfig.label}
              />
            </FormGroup>
          </Box>
        );

      case "checkbox":
        return (
          <Box key={id} margin="normal">
            <Typography variant="body1" mt={2}>
              {fieldConfig.label}
            </Typography>
            <FormGroup sx={{ mt: 2 }}>
              {fieldConfig.option?.map((opt) => (
                <FormControlLabel
                  key={`${id}-${opt}`}
                  control={
                    <Checkbox
                      checked={formValues[`${id}-${opt}`] || false}
                      onChange={(e) =>
                        handleFieldChange(`${id}-${opt}`, e.target.checked)
                      }
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          </Box>
        );

      case "radiogroup":
        return (
          <Box key={id} margin="normal">
            <Typography variant="body1" mt={2}>
              {fieldConfig.label}
            </Typography>
            <FormControl key={id} sx={{ mt: 2 }}>
              <RadioGroup
                value={formValues[id] || ""}
                onChange={(e) => handleFieldChange(id, e.target.value)}
              >
                {fieldConfig.option?.map((opt, index) => (
                  <FormControlLabel
                    key={index}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case "select":
        return (
          <Box key={id}>
            <FormControl fullWidth margin="normal">
              <Typography variant="body1" mb={1}>
                {fieldConfig.label}
              </Typography>
              <Select
                label={fieldConfig.label}
                value={formValues[id] || ""}
                onChange={(e) => handleFieldChange(id, e.target.value)}
              >
                {fieldConfig.option?.map((opt, index) => (
                  <MenuItem key={index} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case "chip":
        return (
          <Autocomplete
            key={id}
            multiple
            freeSolo
            options={fieldConfig.option || []}
            value={formValues[id] || []}
            onChange={(_event, value) => handleFieldChange(id, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldConfig.label}
                placeholder="Enter values..."
                fullWidth
                margin="normal"
              />
            )}
          />
        );

      default:
        return null;
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFormValues: Record<string, any> = {};
    let hasError = false;

    fields.forEach((field) => {
      const { id, fieldConfig, type } = field;
      const label = fieldConfig.label;
      let value = formValues[id];

      if (fieldConfig.required) {
        if (
          (type === "text" ||
            type === "password" ||
            type === "number" ||
            type === "email" ||
            type === "switch" ||
            type === "radiogroup" ||
            type === "select" ||
            type === "date") &&
          value === undefined
        ) {
          hasError = true;
          toast.error(`The ${label} field is required`);
        }

        if (type === "number") {
          const min = fieldConfig?.min;
          const max = fieldConfig?.max;
          if (value !== undefined) {
            if (
              (min !== undefined && value < min) ||
              (max !== undefined && value > max)
            ) {
              hasError = true;
              toast.error(
                `The ${label} value must be between ${min} and ${max}`
              );
            }
          }
        }

        if (
          (type === "text" || type === "password" || type === "email") &&
          value !== undefined
        ) {
          const minLength = fieldConfig?.minLength;
          const maxLength = fieldConfig?.maxLength;

          if (minLength !== undefined && value.length < minLength) {
            hasError = true;
            toast.error(
              `The ${label} must be at least ${minLength} characters long`
            );
          }

          if (maxLength !== undefined && value.length > maxLength) {
            hasError = true;
            toast.error(`The ${label} cannot exceed ${maxLength} characters`);
          }
        }

        if (type === "checkbox") {
          const selectedOptions =
            fieldConfig.option?.filter((opt) => formValues[`${id}-${opt}`]) ||
            [];
          if (selectedOptions.length === 0) {
            hasError = true;
            toast.error(`At least one option for ${label} must be selected`);
          }
          value = selectedOptions;
        }

        if (type === "chip" && (value === undefined || value.length === 0)) {
          hasError = true;
          toast.error(`At least one option for ${label} must be selected`);
        }
      } else {
        if (
          (type === "text" ||
            type === "password" ||
            type === "number" ||
            type === "email") &&
          (value === undefined || value === null)
        ) {
          value = "";
        }
        if (type === "switch" && value === undefined) {
          value = false;
        }
        if (type === "checkbox") {
          value =
            fieldConfig.option
              ?.filter((opt) => formValues[`${id}-${opt}`])
              ?.map((opt) => opt) || [];
        }
        if (type === "chip") {
          value = formValues[id] || [];
        }
      }

      newFormValues[label] = value;
    });

    if (hasError) {
      return;
    }

    toast.success("Form submitted successfully");
    console.log(newFormValues);
  };

  return (
    <CustomContainer>
      <Card sx={{ p: 4, boxShadow: 2 }}>
        <Typography
          variant="h3"
          textAlign="center"
          textTransform="uppercase"
          mb={6}
        >
          {title}
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          {fields.map((field) => renderField(field))}

          {fields.length > 0 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          )}
        </form>
      </Card>
    </CustomContainer>
  );
};

export default FormPage;
