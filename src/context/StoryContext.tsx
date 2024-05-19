import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AppContext from "./AppContext";
import BoardContext from "./BoardContext";
import { useNavigate } from "react-router-dom";
import stages from "../stages.json";

interface StoryContextState {
  isDialogue: boolean;
  isSecurityLaw: boolean | null;
  is23: boolean | null;
  dialogues: string[];
}

interface StoryContextValue extends StoryContextState {
  isStarship: boolean;
  toggleIsDialogue: () => void;
  setSecurityLaw: (v: boolean) => void;
  setIs23: (v: boolean) => void;
  setEndingDialogues: (dialoguesUrl: string) => void;
}

const StoryContext = React.createContext({} as StoryContextValue);

export const StoryContextProvider = ({ children }: { children: ReactNode }) => {
  const { stage, stageState, nextStageState, remainingShots, stageCount } =
    useContext(AppContext);
  const { isClear } = useContext(BoardContext);
  const [state, setState] = useState<StoryContextState>(() => {
    return JSON.parse(
      localStorage.getItem("story") ?? JSON.stringify(DEFAULT_STATE)
    );
  });
  const navigate = useNavigate();

  const toggleIsDialogue = useCallback(() => {
    if (state.isDialogue === true) {
      nextStageState();
    }
    setState((prev) => ({
      ...prev,
      isDialogue: !prev.isDialogue,
      dialogues: [],
    }));
  }, [state.isDialogue, nextStageState]);

  const setSecurityLaw = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, isSecurityLaw: v }));
  }, []);

  const setIs23 = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, is23: v }));
  }, []);

  const isStarship = useMemo(() => {
    return [11, 13, 15, 19].includes(stage);
  }, [stage]);

  const setEndingDialogues = useCallback(
    (dialoguesUrl: string) => {
      fetch(dialoguesUrl)
        .then((r) => r.text())
        .then((r) => {
          setState((prev) => ({
            ...prev,
            isDialogue: true,
            dialogues: r
              .split("<--->")
              .map((content) =>
                content.trim().replace(/%SHOT%/gm, `${remainingShots}`)
              )
              .map((content) => {
                const match = content.match(/### (.*)/);
                if (match && charactersMap[match[1]]) {
                  return (
                    content +
                    "\n\n" +
                    `<!-- AVATAR  /assets/characters/${charactersMap[match[1]]}.png -->`
                  );
                }
                return content;
              })
              .filter((v) => v),
          }));
        });
    },
    [remainingShots]
  );

  useEffect(() => {
    if (!window.location.href.includes("ending") && stageState === "story") {
      // not in ending
      fetch(`/assets/dialogues/stage${`${stage + 1}`.padStart(2, "0")}.md`)
        .then((r) => r.text())
        .then((r) => {
          setState((prev) => {
            const _dialogues = r
              .split("<--->")
              .map((content) =>
                content.trim().replace(/%SHOT%/gm, `${remainingShots}`)
              )
              .map((content) => {
                const match = content.match(/### (.*)/);
                if (match && charactersMap[match[1]]) {
                  return (
                    content +
                    "\n\n" +
                    `<!-- AVATAR  /assets/characters/${charactersMap[match[1]]}.png -->`
                  );
                }
                return content;
              })
              .filter((v) => v);
            return {
              ...prev,
              isDialogue: true,
              dialogues: _dialogues,
            };
          });
        });
    }
  }, [stage, stageState, state.isSecurityLaw, state.is23, remainingShots]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        remainingShots === 0 &&
        !window.location.pathname.includes("ending")
      ) {
        if (!isClear) {
          if (isStarship) {
            navigate("/ending/new-world");
            return;
          }
        } else {
          if (
            stageCount.reduce(
              (acc, cur, idx) => acc && cur === stages[idx].ans,
              true
            )
          ) {
            // all clean
            navigate("/ending/loop");
            return;
          }
        }
        navigate("/ending/destroy");
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [
    remainingShots,
    isStarship,
    navigate,
    isClear,
    stage,
    stageState,
    state.isSecurityLaw,
    stageCount,
  ]);

  useEffect(() => {
    localStorage.setItem("story", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo<StoryContextValue>(
    () => ({
      ...state,
      isStarship,
      toggleIsDialogue,
      setSecurityLaw,
      setIs23,
      setEndingDialogues,
    }),
    [
      state,
      isStarship,
      toggleIsDialogue,
      setSecurityLaw,
      setIs23,
      setEndingDialogues,
    ]
  );

  return (
    <StoryContext.Provider value={contextValue}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContext;

const DEFAULT_STATE: StoryContextState = {
  isDialogue: false,
  isSecurityLaw: null,
  is23: null,
  dialogues: [],
};

export const charactersMap: Record<string, string> = {
  "Saviour Me": "p13",
  "President Cress": "p03",
  "Commander Corbyn": "p07",
  "Prime Minister of YiiBpun": "p10",
  "Head of AngGritt": "p11",
  "Chairman of Euthica": "p02",
  "Solider of Euthica": "p06",
  "SomChai the Rebel": "p08",
  "Representative of Cress in Euthica": "p17",
  "Spy to Euthica": "p16",
  "Council Leader of the Earth": "p12",
  "Mum the Explorer": "p05",
  "White the Newborn": "p09",
  "Lady the Wiser": "p15",
  "Kid the Euthica": "p00",
  "Helen the Barrister": "p18",
  "Alexandra the Professor": "p19",
  "Ino the Teen": "p04",
  "Jack the Executor": "p14",
  "Langley the Freeman": "p21",
  "Child the Explorer": "p20",
};
