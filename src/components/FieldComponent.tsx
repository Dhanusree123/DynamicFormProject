import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Delete, DragIndicator, Edit } from "@mui/icons-material";
import { IFields } from "../types/form";
type Props = {
  fields: IFields;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEdit?: boolean;
};
const FieldComponent = ({ fields, onEdit, onDelete, isEdit }: Props) => {
  const { type, id } = fields;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      ref={setNodeRef}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px dashed black",
        borderRadius: 1,
        p: 2,
        position: "relative",
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pr: 1,
          cursor: "grab",
        }}
      >
        <DragIndicator fontSize="small" />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textTransform: "capitalize",
            mr: 2,
          }}
        >
          {type} Field
        </Typography>
      </Box>
      <Box>
        {isEdit && (
          <IconButton onClick={() => onEdit(id)}>
            <Edit fontSize="small" />
          </IconButton>
        )}

        <IconButton onClick={() => onDelete(id)}>
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default FieldComponent;
