import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Header = () => {
  const { remainingShots } = useContext(AppContext);

  return (
    <Box>
      <Typography variant="h4">{remainingShots}</Typography>
    </Box>
  );
};

export default Header;
