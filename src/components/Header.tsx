import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/"
            sx={{ mr: 1 }}
            disableRipple
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Form Builder
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/create-form"
          sx={{ textTransform: "none" }}
          disableRipple
        >
          Create Form
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
