import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FieldConfig } from "../types/form";
import { toast } from "sonner";

type FieldDialogProps = {
  open: boolean;
  selectedType: string | null;
  config: FieldConfig | null;
  onClose: () => void;
  setConfig: (config: FieldConfig) => void;
  onSubmit: () => void;
  onAddOption: () => void;
  onChangeOption: (index: number, value: string) => void;
};

const FieldDialogForm = ({
  open,
  selectedType,
  config,
  onClose,
  setConfig,
  onSubmit,
  onAddOption,
  onChangeOption,
}: FieldDialogProps) => {
  if (!selectedType || !config) return null;

  const handleSubmit = () => {
    if (!config?.label) {
      toast.warning("Label is required");
      return;
    }
    if (
      (selectedType === "checkbox" ||
        selectedType === "radiogroup" ||
        selectedType === "select") &&
      (!config.option || config.option.length < 2)
    ) {
      toast.warning("At least two options must be selected");
      return false;
    }
    onSubmit();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
        Customize {selectedType} Field
      </DialogTitle>
      <Box component="form">
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Label"
            required
            value={config?.label}
            onChange={(e) => setConfig({ ...config, label: e.target.value })}
            fullWidth
          />

          {"minLength" in config && (
            <TextField
              label="Min Length"
              type="number"
              value={config.minLength}
              onChange={(e) =>
                setConfig({ ...config, minLength: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"maxLength" in config && (
            <TextField
              label="Max Length"
              type="number"
              value={config.maxLength}
              onChange={(e) =>
                setConfig({ ...config, maxLength: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"min" in config && (
            <TextField
              label="Min"
              type="number"
              value={config.min}
              onChange={(e) =>
                setConfig({ ...config, min: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"max" in config && (
            <TextField
              label="Max"
              type="number"
              value={config.max}
              onChange={(e) =>
                setConfig({ ...config, max: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"option" in config && (
            <Box>
              {config?.option?.map((opt: string, i: number) => (
                <Box
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <TextField
                    type="text"
                    value={opt}
                    placeholder={`Option ${i + 1}`}
                    onChange={(e) => onChangeOption(i, e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={onAddOption}>
                Add Option
              </Button>
            </Box>
          )}

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={config.required ?? false}
                  onChange={(e) =>
                    setConfig({ ...config, required: e.target.checked })
                  }
                />
              }
              label="Required"
            />
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FieldDialogForm;
