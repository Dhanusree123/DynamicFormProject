import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  DialogTitle,
  Dialog,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../components/CustomContainer";
import { Delete, Edit } from "@mui/icons-material";
import { IForm } from "../types/form";
import { toast } from "sonner";

const HomePage = () => {
  const [forms, setForms] = useState<IForm[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleOpenDeleteDialog = (id: string) => {
    setFormId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (formId) {
      const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
      delete storedForms[formId];
      localStorage.setItem("forms", JSON.stringify(storedForms));
      setForms(Object.values(storedForms));
      setOpenDeleteDialog(false);
      setFormId(null);
      toast.success("Form deleted successfully");
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setFormId(null);
  };

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
    setForms(Object.values(storedForms) as IForm[]);
  }, []);

  return (
    <CustomContainer>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={3} fontWeight="bold">
          Saved Forms
        </Typography>

        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Form Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Path</strong>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {forms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No forms found.
                  </TableCell>
                </TableRow>
              ) : (
                forms.map((form, index) => (
                  <TableRow key={form.path}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{form.formtitle}</TableCell>
                    <TableCell
                      sx={{
                        "&:hover": {
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/${form.path}`)}
                    >
                      {form.path}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => navigate(`/form/${form.id}/edit`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(form.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this form ?</Typography>
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
    </CustomContainer>
  );
};

export default HomePage;
