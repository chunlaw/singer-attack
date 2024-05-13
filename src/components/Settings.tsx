import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCallback } from "react";

const Settings = () => {
  const clean = useCallback(() => {
    if (window.confirm("Clean up?")) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  return (
    <Button
      startIcon={<DeleteOutlineIcon />}
      variant="contained"
      color="error"
      onClick={clean}
    >
      Clean Up Game Savings
    </Button>
  );
};

export default Settings;
