import { Box, IconButton, SxProps, Theme } from "@mui/material";
import FoundationIcon from '@mui/icons-material/Foundation';
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Footer = () => {
  // const {  } = useContext(AppContext)

  return (
    <Box sx={rootSx}>
      <IconButton
        onClick={() => {}}
        size="small"
      >
        <FoundationIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;

const rootSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
