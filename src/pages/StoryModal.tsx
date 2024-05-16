import {
  Box,
  Collapse,
  Container,
  Modal,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";
import throttle from "lodash.throttle";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import StoryContext, { charactersMap } from "../context/StoryContext";
import rehypeRaw from "rehype-raw";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import AppContext from "../context/AppContext";

const StoryModal = () => {
  const [page, setPage] = useState<number>(0);
  const { isDialogue, toggleIsDialogue, dialogues } = useContext(StoryContext);
  const { remainingShots } = useContext(AppContext);
  const variables = useRef<Record<string, boolean>>({});

  const nextPage = useMemo(
    () =>
      throttle((dialogues: string[]) => {
        setPage((prev) => {
          let ret = prev + 1;
          console.log(ret, dialogues.length);
          while (ret < dialogues.length) {
            const condition = dialogues[ret].match(
              /<!-- CONDITION (.*?) (TRUE|FALSE) -->/
            );
            if (condition === null) return ret;
            console.log(variables.current);
            if (variables.current[condition[1]] && condition[2] === "TRUE") {
              return ret;
            }
            if (!variables.current[condition[1]] && condition[2] === "FALSE") {
              return ret;
            }
            ++ret;
          }
          return ret;
        });
      }, 500),
    []
  );

  const characters = useMemo(
    () =>
      dialogues.map((v) => {
        const character = v.split("\n")[0].replace(/#/g, "").trim();
        const align = v.match(/__ALIGN_RIGHT__/g) ? "flex-end" : "flex-start";
        return {
          character,
          align,
        };
      }),
    [dialogues]
  );

  useEffect(() => {
    // reset when the dialogue is done
    if (page && page >= dialogues.length) {
      toggleIsDialogue();
      variables.current = JSON.parse(JSON.stringify({}));
      setPage(0);
    } else if (dialogues.length) {
      const prompt = dialogues[page].match(/<!-- PROMPT (.*?): (.*) -->/);
      if (prompt !== null) {
        const timer = setTimeout(() => {
          if (variables.current[prompt[0]] === undefined) {
            variables.current[prompt[1]] = window.confirm(prompt[2]);
          }
        }, 200);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [page, toggleIsDialogue, dialogues]);

  return (
    <>
      {dialogues.map((dialogue, idx) => (
        <Modal
          key={`dialogue-00-${idx}`}
          open={page >= idx && isDialogue}
          onClose={() => nextPage(dialogues)}
        >
          <Container
            sx={rootSx}
            fixed
            maxWidth="md"
            onClick={() => nextPage(dialogues)}
          >
            <Box
              sx={{
                backgroundImage: `url(/assets/characters/p${charactersMap[characters[idx].character ?? "00"]}.png)`,
                backgroundSize: "contain",
                height: "min(45dvh, 45dvw)",
                width: "min(45dvh, 45dvw)",
                alignSelf: characters[idx].align,
              }}
            />
            <Paper square={false} elevation={16} sx={dialogSx}>
              <Collapse in={true}>
                <Box display="flex" flexDirection="column">
                  <Markdown rehypePlugins={[rehypeRaw]}>
                    {(dialogue as string).replace(
                      "%SHOT%",
                      `${remainingShots}`
                    )}
                  </Markdown>
                  <Box sx={blinkingIconSx}>
                    <ArrowDropDownIcon />
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Container>
        </Modal>
      ))}
    </>
  );
};

export default StoryModal;

const rootSx: SxProps<Theme> = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  bottom: 0,
  left: 0,
  right: 0,
  mb: 2,
};

const dialogSx: SxProps<Theme> = {
  px: 3,
  minHeight: 150,
};

const blinkingIconSx: SxProps<Theme> = {
  alignSelf: "flex-end",
  animation: "blinking-animation 1s ease-in-out infinite",
  "@keyframes blinking-animation": {
    "50%": {
      opacity: 0,
    },
  },
};
