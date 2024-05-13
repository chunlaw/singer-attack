import { Box, SxProps, Theme } from "@mui/material";
import { useMemo } from "react";

const Background = () => {
  const random = useMemo(() => {
    return Math.floor(Math.random() * 439);
  }, []);

  return (
    <Box
      position="fixed"
      width="100vw"
      height="100vh"
      sx={{
        pointerEvents: "none",
        backgroundImage: `url(/assets/background/${`${(random % 31) + 1}`.padStart(2, "0")}.png)`,
        zIndex: -1,
      }}
    >
      <Box sx={{ ...spaceSx, ...star1Sx } as SxProps<Theme>} />
      <Box sx={{ ...spaceSx, ...star2Sx } as SxProps<Theme>} />
      <Box sx={{ ...spaceSx, ...star3Sx } as SxProps<Theme>} />
      <Box sx={earthContainerSx}>
        <Box sx={earthSx} />
      </Box>
    </Box>
  );
};

export default Background;

const spaceSx: SxProps<Theme> = {
  pointerEvents: "none",
  background: "rgba(32, 32, 32, 0.1) center / 200px 200px round",
  position: "absolute",
  top: "-100%",
  left: "-100%",
  right: "-100%",
  bottom: "-100%",
  "@keyframes space": {
    "40%": {
      opacity: 0.75,
    },
    "50%": {
      opacity: 0.25,
    },
    "60%": {
      opacity: 0.75,
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

const star1Sx: SxProps<Theme> = {
  animation: "space 120s ease-in-out infinite",
  backgroundImage:
    "radial-gradient(3px 3px at 25px 5px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 50px 25px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 125px 20px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2px 2px at 5px 25px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 50px 35px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2px 2px at 127px 22px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 45px 25px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2px 2px at 75px 30px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 105px 20px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2.5px 2.5px at 110px 80px, white, rgba(255, 255, 255, 0));",
};

const star2Sx: SxProps<Theme> = {
  animation: "space 180s ease-in-out infinite",
  backgroundImage:
    "radial-gradient(3px 3px at 75px 125px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(3px 3px at 100px 75px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(1.5px 1.5px at 199px 100px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2px 2px at 20px 50px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2.5px 2.5px at 100px 5px, white, rgba(255, 255, 255, 0));" +
    "radial-gradient(2.5px 2.5px at 5px 5px, white, rgba(255, 255, 255, 0));",
};

const star3Sx: SxProps<Theme> = {
  animation: "space 300s ease-in-out infinite",
  backgroundImage:
    "radial-gradient(3px 3px at 10px 10px, white, rgba(255, 255, 255, 0))" +
    "radial-gradient(3px 3px at 150px 150px, white, rgba(255, 255, 255, 0))" +
    "radial-gradient(1.5px 1.5px at 60px 170px, white, rgba(255, 255, 255, 0))" +
    "radial-gradient(1.5px 1.5px at 175px 180px, white, rgba(255, 255, 255, 0))" +
    "radial-gradient(2px 2px at 195px 95px, white, rgba(255, 255, 255, 0))" +
    "radial-gradient(2.5px 2.5px at 95px 145px, white, rgba(255, 255, 255, 0))",
};

const earthContainerSx: SxProps<Theme> = {
  position: "absolute",
  bottom: "-80%",
  left: 0,
  right: 0,
  width: "100%",
  height: "100%",
};

const earthSx: SxProps<Theme> = {
  height: "min(100vh, 100vw)",
  width: "min(100vh, 100vw)",
  backgroundPositionX: "50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundImage: "url(/assets/background/earth.png)",
  margin: "0 auto",
  animation: "earth-rotate 900s linear infinite",
  "@keyframes earth-rotate": {
    "100%": {
      transform: "rotate(-360deg)",
    },
  },
};
