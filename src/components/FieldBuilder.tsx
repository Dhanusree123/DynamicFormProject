import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FieldDialogForm from "./FieldDialogForm";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import FieldComponent from "./FieldComponent";
import { nanoid } from "nanoid";
import { FieldConfig, FieldType, IFields } from "../types/form";
import { Add } from "@mui/icons-material";

type Props = {
  fields: IFields[];
  handleFields: (field: IFields[]) => void;
  isEdit?: boolean;
};

const defaultFieldValues: Record<FieldType, FieldConfig> = {
  text: { label: "", minLength: 0, maxLength: 0, required: false },
  number: { label: "", min: 0, max: 0, required: false },
  email: { label: "", required: false },
  password: { label: "", minLength: 0, maxLength: 0, required: false },
  date: { label: "", required: false },
  switch: { label: "", required: false },
  chip: { label: "", required: false },
  checkbox: { label: "", option: [""], required: false },
  radiogroup: { label: "", option: [""], required: false },
  select: { label: "", option: [""], required: false },
};

const FieldBuilder = ({ fields, handleFields, isEdit }: Props) => {
  const [openTypeDialog, setOpenTypeDialog] = useState(false);
  const [openFieldDialog, setOpenFieldDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<FieldType | null>(null);
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [editFieldId, setEditFieldId] = useState<string | null>(null);

  const openAddDialog = () => {
    setSelectedType(null);
    setFieldConfig(null);
    setEditFieldId(null);
    setOpenTypeDialog(true);
  };

  const openEditDialog = (field: IFields) => {
    setSelectedType(field.type);
    setFieldConfig(field.fieldConfig);
    setEditFieldId(field.id);
    setOpenFieldDialog(true);
  };

  const handleSelectType = (type: FieldType) => {
    setSelectedType(type);
    setFieldConfig({ ...defaultFieldValues[type] });
    setOpenTypeDialog(false);
    setOpenFieldDialog(true);
  };

  const handleAddOption = () => {
    if (fieldConfig?.option) {
      setFieldConfig({
        ...fieldConfig,
        option: [...fieldConfig.option, ""],
      });
    }
  };

  const handleChangeOption = (index: number, value: string) => {
    if (fieldConfig?.option) {
      const newOptions = [...fieldConfig.option];
      newOptions[index] = value;
      setFieldConfig({ ...fieldConfig, option: newOptions });
    }
  };

  const handleAddField = () => {
    if (!selectedType || !fieldConfig) return;

    const newField: IFields = {
      id: nanoid(),
      type: selectedType,
      fieldConfig,
    };

    const updatedFields = [...fields, newField];

    handleFields(updatedFields);

    setOpenFieldDialog(false);
    setSelectedType(null);
    setFieldConfig(null);
  };

  const handleEditField = () => {
    if (!selectedType || !fieldConfig || !editFieldId) return;

    const updatedFields = fields.map((field) =>
      field.id === editFieldId
        ? { ...field, type: selectedType, fieldConfig }
        : field
    );
    handleFields(updatedFields);

    setOpenFieldDialog(false);
    setSelectedType(null);
    setFieldConfig(null);
    setEditFieldId(null);
  };

  const handleFieldSubmit = () => {
    if (isEdit) {
      handleEditField();
    } else {
      handleAddField();
    }
  };

  const handleDelete = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);
    handleFields(newFields);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);
      handleFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{ p: 2, border: "1px solid grey", borderRadius: 1, mt: 2 }}
    >
      {fields.length > 0 && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            <Stack spacing={2}>
              {fields.map((field) => (
                <FieldComponent
                  key={field.id}
                  fields={field}
                  isEdit={isEdit}
                  onEdit={() => openEditDialog(field)}
                  onDelete={() => handleDelete(field.id)}
                />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      )}

      <Button
        variant="outlined"
        fullWidth
        onClick={openAddDialog}
        startIcon={<Add />}
      >
        Add Field
      </Button>

      <Dialog open={openTypeDialog} onClose={() => setOpenTypeDialog(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Select Field Type</DialogTitle>
        <DialogContent>
          <Box>
            {Object.keys(defaultFieldValues).map((type) => (
              <Typography
                key={type}
                variant="body1"
                onClick={() => {
                  handleSelectType(type as FieldType);
                  setFieldConfig({ ...defaultFieldValues[type as FieldType] });
                  setOpenTypeDialog(false);
                  setOpenFieldDialog(true);
                }}
                sx={{
                  m: 2,
                  p: 1,
                  textTransform: "capitalize",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                {type}
              </Typography>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <FieldDialogForm
        open={openFieldDialog}
        selectedType={selectedType}
        config={fieldConfig}
        onClose={() => {
          setOpenFieldDialog(false);
          setSelectedType(null);
          setFieldConfig(null);
        }}
        setConfig={setFieldConfig}
        onSubmit={handleFieldSubmit}
        onAddOption={handleAddOption}
        onChangeOption={handleChangeOption}
      />
    </Stack>
  );
};

export default FieldBuilder;
