"use client";

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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../components/CustomContainer";
import { Edit } from "@mui/icons-material";
import { IForm } from "../types/form";

const HomePage = () => {
  const [forms, setForms] = useState<IForm[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "{}");
    const formArray = Object.values(storedForms) as IForm[];
    setForms(formArray);
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
                <TableCell>
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
                    <TableCell onClick={() => navigate(`/${form.path}`)}>
                      {form.path}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigate(`/form/${form.id}/edit`)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </CustomContainer>
  );
};

export default HomePage;
