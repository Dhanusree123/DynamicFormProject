import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Delete, DragIndicator, Edit } from "@mui/icons-material";
import { IFields } from "../types/form";
import { useState } from "react";

type Props = {
  fields: IFields;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEdit?: boolean;
};

const FieldComponent = ({ fields, onEdit, onDelete, isEdit }: Props) => {
  const { type, id } = fields;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setOpenDeleteDialog(false);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <>
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

          <IconButton onClick={handleDeleteClick}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Stack>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete this field?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FieldComponent;
