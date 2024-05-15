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
  const { stage, remainingShots } = useContext(AppContext);
  const { isClear } = useContext(BoardContext);
  const [state, setState] = useState<StoryContextState>(() => {
    return JSON.parse(
      localStorage.getItem("story") ?? JSON.stringify(DEFAULT_STATE)
    );
  });
  const navigate = useNavigate();

  const toggleIsDialogue = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDialogue: !prev.isDialogue,
    }));
  }, []);

  const setSecurityLaw = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, isSecurityLaw: v }));
  }, []);

  const setIs23 = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, is23: v }));
  }, []);

  const isStarship = useMemo(() => {
    if (state.isSecurityLaw && [11, 13, 15].includes(stage)) {
      return true;
    }
    if (state.is23 && [19].includes(stage)) {
      return true;
    }
    return false;
  }, [stage, state]);

  const setEndingDialogues = useCallback((dialoguesUrl: string) => {
    fetch(dialoguesUrl)
      .then((r) => r.text())
      .then((r) => {
        setState((prev) => ({
          ...prev,
          isDialogue: true,
          dialogues: r
            .split("<--->")
            .map((content) => content.trim())
            .filter((v) => v),
        }));
      });
  }, []);

  useEffect(() => {
    let prefix = "";
    if (stage > 10) {
      if (state.isSecurityLaw && state.is23) {
        prefix = "secure/23/";
      } else if (state.isSecurityLaw) {
        prefix = "secure/";
      }
    }
    if (window.location.pathname === "/") {
      // not in ending
      fetch(
        `/assets/dialogues/${prefix}stage${`${stage + 1}`.padStart(2, "0")}.md`
      )
        .then((r) => r.text())
        .then((r) => {
          setState((prev) => {
            const _dialogues = r
              .split("<--->")
              .map((content) => content.trim())
              .filter((v) => v);
            return {
              ...prev,
              isDialogue:
                JSON.stringify(prev.dialogues) !== JSON.stringify(_dialogues) ||
                prev.isDialogue,
              dialogues: _dialogues,
            };
          });
        });
    }
  }, [stage, state.isSecurityLaw, state.is23]);

  useEffect(() => {
    if (
      stage === 10 &&
      state.isDialogue === false &&
      state.isSecurityLaw === null
    ) {
      confirm("Do you support the Earth Security Law?");
      setSecurityLaw(true);
    }
    if (
      stage === 17 &&
      state.isDialogue === false &&
      state.isSecurityLaw &&
      state.is23 === null
    ) {
      confirm(
        "Do you support the enforcement of New Security Law to all 23 states?"
      );
      setIs23(true);
    }
  }, [
    state.isSecurityLaw,
    stage,
    state.isDialogue,
    setSecurityLaw,
    setIs23,
    state.is23,
  ]);

  useEffect(() => {
    if (remainingShots === 0) {
      if (!isClear) {
        if (isStarship) {
          navigate("/ending/new-world");
          return;
        }
      } else {
        if (stage + 1 === stages.length) {
          // all clean
          if (state.isSecurityLaw) {
            navigate("/ending/loop");
            return;
          }
          navigate("/ending/good");
          return;
        }
      }
      navigate("/ending/destroy");
    }
  }, [
    remainingShots,
    isStarship,
    navigate,
    isClear,
    stage,
    state.isSecurityLaw,
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
  isDialogue: true,
  isSecurityLaw: null,
  is23: null,
  dialogues: [],
};

export const charactersMap: Record<string, string> = {
  "Saviour Me": "13",
  "President Cress": "03",
  "Commander Corbyn": "07",
  "Prime Minister of YiiBpun": "10",
  "Head of AngGritt": "11",
  "Chairman of Euthica": "02",
  "Solider of Euthica": "06",
  "SomChai the Rebel": "08",
  "Representative of Cress in Euthica": "17",
  "Spy to Euthica": "16",
  "Council Leader of the Earth": "12",
  "Mum the Explorer": "05",
  "White the Newborn": "09",
  "Lady the Wiser": "15",
  "Kid the Euthica": "00",
  "Helen the Barrister": "18",
  "Alexandra the Professor": "19",
  "Ino the Teen": "04",
  "Jack the Executor": "14",
  "Langley the Freeman": "21",
  "Child the Explorer": "20",
};
