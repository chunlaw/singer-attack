import { useCallback, useContext } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import Meteorite from "../components/board/Meteorite";
import Fire from "../components/board/Fire";
import BoardContext from "../context/BoardContext";
import AppContext from "../context/AppContext";
import Starship from "../components/board/Starship";
import StoryContext from "../context/StoryContext";

const GameBoard = () => {
  const { board, toggleBoard } = useContext(BoardContext);
  const { fireCannon } = useContext(AppContext);
  const { isStarship } = useContext(StoryContext);

  const handleClick = useCallback(
    (x: number, y: number) => () => {
      toggleBoard(x, y);
    },
    [toggleBoard]
  );

  return (
    <Box sx={boardSx}>
      {board.map((row, i) => (
        <Box display="flex" key={`row-${i}`}>
          <Box
            key={`weapon-y-${i}`}
            sx={hCannonSx}
            onClick={() => fireCannon(i, "x")}
          />
          {row.map((cell, j) => (
            <Box sx={cellSx} key={`cell-${i}-${j}`} onClick={handleClick(i, j)}>
              <Meteorite isVisible={!isStarship && cell} />
              <Starship isVisible={isStarship && cell} />
              <Fire x={i} y={j} />
            </Box>
          ))}
        </Box>
      ))}
      <Box display="flex" alignItems="flex-end" flex={1}>
        {board[0].map((_, idx) => (
          <Box
            key={`weapon-x-${idx}`}
            sx={cannonSx}
            onClick={() => fireCannon(idx, "y")}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GameBoard;

const boardSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "& > *": {
    userSelect: "none !important",
  },
  alignItems: "flex-end",
  transform: "rotate(-45deg)",
};

const cellSx: SxProps<Theme> = {
  width: 40,
  height: 40,
  borderWidth: 0.25,
  borderColor: "rgba(0, 0, 0, 1)",
  borderStyle: "dashed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(255, 255, 255, 0.4)",
  position: "relative",
  "@media (width <= 420px)": {
    width: 25,
    height: 25,
  },
};

const cannonSx: SxProps<Theme> = {
  backgroundImage: "url(/assets/weapon.png)",
  backgroundSize: "contain",
  width: 40,
  height: 40,
  "@media (width <= 420px)": {
    width: 25,
    height: 25,
  },
  cursor: "pointer",
};

const hCannonSx: SxProps<Theme> = {
  backgroundImage: "url(/assets/weapon.png)",
  backgroundSize: "contain",
  width: 40,
  height: 40,
  "@media (width <= 420px)": {
    width: 25,
    height: 25,
  },
  transform: "rotate(90deg)",
  cursor: "pointer",
};
