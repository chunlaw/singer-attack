import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import AppContext from "../../context/AppContext";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import stages from "../../stages.json";

const StageList = () => {
  const { stageCount, toggleDialog, goToStage } = useContext(AppContext);

  const ratings = useMemo(() => {
    return stageCount
      .filter(
        (v, idx, self) => v !== null || idx === 0 || self[idx - 1] !== null
      )
      .map((v, idx) => {
        if (v === null) return 0;
        if (v === stages[idx].ans) {
          return 3;
        } else if (v === stages[idx].ans + 1) {
          return 2;
        } else if (v === stages[idx].ans + 2) {
          return 1;
        }
        return 0;
      })
      .map((rating, idx) => [idx, rating])
      .reverse();
  }, [stageCount]);

  const handleRowClick = useCallback(
    (id: number) => () => {
      goToStage(id);
      toggleDialog();
    },
    [goToStage, toggleDialog]
  );

  return (
    <Box display="flex" width="100%" flexDirection="column" gap={2}>
      {ratings.map(([id, rating]) => (
        <Box key={id} sx={stageRowSx} onClick={handleRowClick(id)}>
          <Typography variant="h6">Wave {id + 1}</Typography>
          <Box display="flex" gap={1} color="yellow">
            {rating >= 1 ? <StarIcon /> : <StarBorderIcon />}
            {rating >= 2 ? <StarIcon /> : <StarBorderIcon />}
            {rating === 3 ? <StarIcon /> : <StarBorderIcon />}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StageList;

const stageRowSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};
