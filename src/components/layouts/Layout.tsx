import { Container, SxProps, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Background from "./Background";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import StoryContext from "../../context/StoryContext";
import GameDialogue from "react-game-dialog";

const Layout = () => {
  const {
    bgIframe,
    soundIframe,
    soundConfig: { isBgMusic, isSoundEffect },
  } = useContext(AppContext);
  const { isDialogue, toggleIsDialogue, dialogues } = useContext(StoryContext);

  return (
    <Container fixed maxWidth="xl" sx={rootSx}>
      <Background />
      <Header />
      <Outlet />
      <Footer />
      <GameDialogue
        open={isDialogue}
        onClose={toggleIsDialogue}
        dialogues={dialogues}
      />
      {isSoundEffect && (
        <iframe
          id="sound-effect"
          ref={soundIframe}
          src="/assets/Star-wars-blaster-2.mp3"
          style={{ display: "none" }}
        />
      )}
      {isBgMusic && (
        <iframe
          id="bg-music"
          ref={bgIframe}
          src="/assets/alex-productions-ambient-music-nature.mp3"
          allow="autoplay"
          style={{ display: "none" }}
        />
      )}
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
