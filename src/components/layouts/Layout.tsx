import { Container, SxProps, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";

const Layout = () => {
  return (
    <Container fixed maxWidth="xl" sx={rootSx}>
      <Background />
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;

const rootSx: SxProps<Theme> = {
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
};
