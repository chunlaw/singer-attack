import { Fade } from "@mui/material";
import { Box } from "@mui/system";

interface StarshipProps {
  isVisible: boolean;
}

const Starship = ({ isVisible }: StarshipProps) => {
  return (
    <Fade in={isVisible}>
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundImage: `url(/assets/starship.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(45deg)",
        }}
      />
    </Fade>
  );
};

export default Starship;
