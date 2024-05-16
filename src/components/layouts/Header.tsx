import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useMatch } from "react-router-dom";

const Header = () => {
  const { remainingShots } = useContext(AppContext);
  const match = useMatch("/ending/:ending");

  return (
    <Box display="flex" gap={1}>
      {match === null && <Typography variant="h4">{remainingShots}</Typography>}
    </Box>
  );
};

export default Header;
