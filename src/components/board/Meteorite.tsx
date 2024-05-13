import { Fade } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";

interface MeteoriteProps {
  isVisible: boolean;
}

const Meteorite = ({ isVisible }: MeteoriteProps) => {
  const state = useMemo(() => {
    const rand = Math.floor(Math.random() * 237);
    return {
      url: `/assets/meteorite${(rand % 3) + 1}.png`,
      dir: rand % 2 ? "clock" : "anti-clock",
      duration: 10 + (rand % 120),
    };
  }, []);

  return (
    <Fade in={isVisible}>
      <Box
        sx={{
          position: "absolute",
          height: "80%",
          width: "80%",
          backgroundImage: `url(${state.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          animation: `${state.dir} ${state.duration}s ease-in-out infinite`,
          "@keyframes clock": {
            "100%": {
              transform: "rotate(360deg)",
            },
          },
          "@keyframes anti-clock": {
            "100%": {
              transform: "rotate(-360deg)",
            },
          },
        }}
      />
    </Fade>
  );
};

export default Meteorite;
