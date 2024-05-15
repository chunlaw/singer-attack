import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme,
} from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import AppContext from "../context/AppContext";
import stages from "../stages.json";
import BoardContext from "../context/BoardContext";
import {
  StarBorder,
  Star,
  RestartAlt as RestartAltIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { useMatch } from "react-router-dom";

const WinDialog = () => {
  const { isClear } = useContext(BoardContext);
  const { isWinDialog, stage, stageCount, setWinDialog, goToStage } =
    useContext(AppContext);
  const match = useMatch("/ending/:ending");

  const rating = useMemo(() => {
    if (!isClear) return 0;
    const curBest = stageCount[stage];
    if (curBest === null) return 0;

    if (stages[stage].ans === curBest) {
      return 3;
    }
    if (stages[stage].ans === curBest + 1) {
      return 2;
    }
    if (stages[stage].ans >= curBest + 2) {
      return 1;
    }
    return 0;
  }, [stageCount, isClear, stage]);

  const handleReset = useCallback(() => {
    setWinDialog(false);
  }, [setWinDialog]);

  const handleNext = useCallback(() => {
    goToStage(stage + 1);
    setWinDialog(false);
  }, [goToStage, setWinDialog, stage]);

  return (
    <Dialog open={isWinDialog && match === null}>
      <DialogTitle sx={{ textAlign: "center" }} variant="h4">
        Wave {stage + 1}
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          color="yellow"
          alignItems="flex-end"
        >
          {rating >= 1 ? <Star sx={star1Sx} /> : <StarBorder sx={star1Sx} />}
          {rating >= 3 ? <Star sx={star3Sx} /> : <StarBorder sx={star3Sx} />}
          {rating >= 2 ? <Star sx={star2Sx} /> : <StarBorder sx={star2Sx} />}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={handleReset}
          startIcon={<RestartAltIcon />}
          variant="outlined"
          color="inherit"
        >
          Retry
        </Button>
        {stage + 1 < stages.length && (
          <Button
            onClick={handleNext}
            startIcon={<NextIcon />}
            color="success"
            variant="contained"
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default WinDialog;

const star1Sx: SxProps<Theme> = {
  fontSize: 64,
  transform: "rotate(-15deg)",
};

const star2Sx: SxProps<Theme> = {
  fontSize: 64,
  transform: "rotate(15deg)",
};

const star3Sx: SxProps<Theme> = {
  fontSize: 96,
};
