import { useContext, useEffect } from "react";
import StoryContext from "../../context/StoryContext";
import { Box, SxProps, Theme } from "@mui/material";
import AppContext from "../../context/AppContext";

const Loop = () => {
  const { goToStage, stage } = useContext(AppContext);
  const { setEndingDialogues } = useContext(StoryContext);

  useEffect(() => {
    goToStage(stage);
    setEndingDialogues("/assets/dialogues/loop.md");
  }, [setEndingDialogues, goToStage, stage]);

  return (
    <Box sx={rootSx}>
      <Box sx={{ animationDelay: "900ms", width: "13em", height: "13em" }} />
      <Box sx={{ animationDelay: "750ms", width: "11em", height: "11em" }} />
      <Box sx={{ animationDelay: "600ms", width: "9em", height: "9em" }} />
      <Box sx={{ animationDelay: "450ms", width: "7em", height: "7em" }} />
      <Box sx={{ animationDelay: "300ms", width: "5em", height: "5em" }} />
      <Box sx={{ animationDelay: "150ms", width: "3em", height: "3em" }} />
      <Box sx={{ animationDelay: "0s", width: "1em", height: "1em" }} />
    </Box>
  );
};

export default Loop;

const size = 150;
const circleColor = "#FFFFCC";

const rootSx: SxProps<Theme> = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: size,
  height: size,
  bottom: "0%",
  transform: "rotate(-45deg) translate(-100px)",

  "& div": {
    boxSizing: "border-box",
    display: "block",
    // width: "100%",
    // height: "100%",
    fontSize: size / 7,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderColor: circleColor,
    borderStyle: "solid",
    borderWidth: "1em 1em 0 0",
    borderRadius: "0 100% 0 0",
    opacity: 0,
    animationDuration: "3500ms",
    animationName: "wifianimation",
    animationIterationCount: "infinite",
  },

  "@keyframes wifianimation": {
    "0%": {
      opacity: 0.4,
    },
    "5%": {
      opacity: 1,
    },
    "6%": {
      opacity: 0.1,
    },
    "100%": {
      opacity: 0.1,
    },
  },
};
