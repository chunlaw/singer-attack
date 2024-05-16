import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { Close as CloseIcon } from "@mui/icons-material";
import StageList from "./gameDialog/StageList";
import Settings from "./Settings";

const StageDialog = () => {
  const { isDialog, toggleDialog } = useContext(AppContext);
  const [tab, setTab] = useState<"stage" | "settings">("stage");

  return (
    <Dialog open={isDialog} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Singer Attack</Typography>
          <IconButton onClick={toggleDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", overflow: "clip" }}>
        <Box flex={1}>
          <ToggleButtonGroup
            orientation="vertical"
            value={tab}
            exclusive
            onChange={(_, v) => {
              if (v) setTab(v);
            }}
          >
            <ToggleButton value="stage">Stage</ToggleButton>
            <ToggleButton value="settings">Settings</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box flex={2} overflow="scroll">
          {tab === "stage" && <StageList />}
          {tab === "settings" && <Settings />}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StageDialog;
