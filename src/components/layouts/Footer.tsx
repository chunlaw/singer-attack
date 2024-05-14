import { Box, IconButton, SxProps, Theme } from "@mui/material";
import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import WinDialog from "../WinDialog";
import StageDialog from "../StageDialog";

const Footer = () => {
  const { toggleDialog } = useContext(AppContext);

  return (
    <Box sx={rootSx}>
      <IconButton onClick={toggleDialog} size="large">
        <AccountBalanceIcon sx={{ fontSize: 48 }} />
      </IconButton>
      <StageDialog />
      <WinDialog />
    </Box>
  );
};

export default Footer;

const rootSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
