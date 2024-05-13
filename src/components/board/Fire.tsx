import { Box, Fade, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import BoardContext from "../../context/BoardContext";

interface FireProps {
  x: number;
  y: number;
}

const Fire = ({ x, y }: FireProps) => {
  const { xFiring, yFiring } = useContext(BoardContext);

  return (
    <Box position="absolute" top={0} bottom={0} right={0} left={0}>
      <Fade in={xFiring === x}>
        <Box sx={xFireSx} />
      </Fade>
      <Fade in={yFiring === y}>
        <Box sx={yFireSx} />
      </Fade>
    </Box>
  );
};

export default Fire;

const xFireSx: SxProps<Theme> = {
  position: "absolute",
  height: "100%",
  width: "100%",
  animation: "xray 0.4s linear infinite",
  background: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "50%",
  backgroundPositionY: "50%",
  transform: "rotate(90deg)",
  "@keyframes xray": {
    "0%": {
      backgroundImage: "url(/assets/effect/ray0.png)",
    },
    "25%": {
      backgroundImage: "url(/assets/effect/ray1.png)",
    },
    "50%": {
      backgroundImage: "url(/assets/effect/ray2.png)",
    },
    "75%": {
      backgroundImage: "url(/assets/effect/ray3.png)",
    },
    "100%": {
      backgroundImage: "url(/assets/effect/ray0.png)",
    },
  },
};

const yFireSx: SxProps<Theme> = {
  position: "absolute",
  height: "100%",
  width: "100%",
  animation: "yray 0.4s linear infinite",
  background: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "50%",
  backgroundPositionY: "50%",
  "@keyframes yray": {
    "0%": {
      backgroundImage: "url(/assets/effect/ray0.png)",
    },
    "25%": {
      backgroundImage: "url(/assets/effect/ray1.png)",
    },
    "50%": {
      backgroundImage: "url(/assets/effect/ray2.png)",
    },
    "75%": {
      backgroundImage: "url(/assets/effect/ray3.png)",
    },
    "100%": {
      backgroundImage: "url(/assets/effect/ray0.png)",
    },
  },
};
