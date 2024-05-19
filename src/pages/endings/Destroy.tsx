import { useContext, useEffect, useMemo } from "react";
import StoryContext from "../../context/StoryContext";
import { Box } from "@mui/material";
import AppContext from "../../context/AppContext";

const Destroy = () => {
  const { goToStage, stage } = useContext(AppContext);
  const { setEndingDialogues } = useContext(StoryContext);

  const meteorites = useMemo(() => {
    goToStage(stage);
    return Array(10)
      .fill(0)
      .map(() => Math.random() * 120 - 20);
  }, [goToStage, stage]);

  useEffect(() => {
    setEndingDialogues("/assets/dialogues/destroy.md");
  }, [setEndingDialogues]);

  return (
    <>
      {meteorites.map((y, idx) => (
        <Box
          key={`meteorite-${idx}`}
          sx={{
            position: "absolute",
            height: 50,
            width: 50,
            bottom: `110vh`,
            left: `${y}vw`,
            backgroundImage: `url(/assets/meteorite${(idx % 3) + 1}.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: `${idx % 2 ? "clock" : "anti-clock"} ${Math.random() * 20 + 10}s linear infinite 3s`,
            [`@keyframes clock`]: {
              "100%": {
                transform: "rotate(360deg)",
                bottom: 0,
              },
            },
            "@keyframes anti-clock": {
              "100%": {
                transform: "rotate(-360deg)",
                bottom: "-10vh",
              },
            },
          }}
        />
      ))}
    </>
  );
};

export default Destroy;
