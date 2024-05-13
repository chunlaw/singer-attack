import { useContext } from "react";
import AppContext from "../context/AppContext";
import { Box } from "@mui/material";

const Story = () => {
  const { stage } = useContext(AppContext);

  return (
    <Box>
      {stage >= 0 && (
        <Box>
          No time to talk, shoot down the meteorite first!! Click the{" "}
          <b>
            <i>CANNON</i>
          </b>{" "}
          to shoot it down!
        </Box>
      )}
    </Box>
  );
};

export default Story;
