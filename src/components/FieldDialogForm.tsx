/* eslint-disable @typescript-eslint/no-explicit-any */
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

type FieldDialogProps = {
  open: boolean;
  selectedType: string | null;
  config: any;
  onClose: () => void;
  onConfigChange: (config: any) => void;
  onSubmit: () => void;
  onAddOption: () => void;
  onChangeOption: (index: number, value: string) => void;
};

const FieldConfigDialog = ({
  open,
  selectedType,
  config,
  onClose,
  onConfigChange,
  onSubmit,
  onAddOption,
  onChangeOption,
}: FieldDialogProps) => {
  if (!selectedType) return null;

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
            value={config.label}
            onChange={(e) =>
              onConfigChange({ ...config, label: e.target.value })
            }
            fullWidth
          />

          {"minLength" in config && (
            <TextField
              label="Min Length"
              type="number"
              required
              value={config.minLength}
              onChange={(e) =>
                onConfigChange({ ...config, minLength: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"maxLength" in config && (
            <TextField
              label="Max Length"
              type="number"
              required
              value={config.maxLength}
              onChange={(e) =>
                onConfigChange({ ...config, maxLength: Number(e.target.value) })
              }
              fullWidth
            />
          )}

          {"option" in config && (
            <Box>
              {config.option.map((opt: string, i: number) => (
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
              control={<Switch checked={config.checked} />}
              label="Required"
            ></FormControlLabel>
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default FieldConfigDialog;
