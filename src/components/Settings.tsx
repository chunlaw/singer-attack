import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Slider,
  Typography,
} from "@mui/material";
import {
  MusicNote as MusicNoteIcon,
  MusicOff as MusicOffIcon,
  DeleteOutline as DeleteOutlineIcon,
  SecurityUpdate as SecurityUpdateIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
} from "@mui/icons-material";
import { useCallback, useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const {
    setBgVolume,
    toggleBgMusic,
    toggleSoundEffect,
    setSoundEffectVolume,
    soundConfig: { isBgMusic, bgVolume, isSoundEffect, soundEffectVolume },
  } = useContext(AppContext);

  const navigate = useNavigate();

  const clean = useCallback(() => {
    if (window.confirm("Clean up?")) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  }, [navigate]);

  const updateGame = useCallback(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          // registration worked
          registration.update();
          window.location.reload();
        })
        .catch(() => {
          // registration failed
          console.error(`Not registrated`);
        });
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={1} pr={2} alignItems="center">
        <IconButton onClick={toggleBgMusic}>
          {isBgMusic ? <MusicNoteIcon /> : <MusicOffIcon />}
        </IconButton>
        <Slider
          value={bgVolume}
          onChange={(_, v) => setBgVolume(v as number)}
          max={1}
          min={0}
          step={0.05}
        />
      </Box>
      <Box display="flex" gap={1} pr={2} alignItems="center">
        <IconButton onClick={toggleSoundEffect}>
          {isSoundEffect ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
        <Slider
          value={soundEffectVolume}
          onChange={(_, v) => setSoundEffectVolume(v as number)}
          max={1}
          min={0}
          step={0.05}
        />
      </Box>
      <Button
        startIcon={<DeleteOutlineIcon />}
        variant="contained"
        color="error"
        onClick={clean}
      >
        Clean Up Game Savings
      </Button>
      <Button
        startIcon={<SecurityUpdateIcon />}
        variant="outlined"
        color="info"
        onClick={updateGame}
      >
        Manually Update Game
      </Button>
      <Divider />
      <Box>
        <Typography variant="h6" color="GrayText">
          Attribution
        </Typography>
        <Typography variant="caption" color="GrayText">
          Ambient Nature Music | Nature by Alex-Productions |
          https://onsound.eu/ Music promoted by
          https://www.chosic.com/free-music/all/ Creative Commons CC BY 3.0
          https://creativecommons.org/licenses/by/3.0/
        </Typography>
        <br />
        <Typography variant="caption" color="GrayText">
          Character Artwork by &nbsp;
          <Link
            href="https://linktr.ee/coraxdigitalart"
            target="_blank"
            rel="noreferrer"
          >
            Corax Digital Art
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
